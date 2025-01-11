require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./auth');
const { logSecurityEvent, getAuditLogs, updateUserSecret, getUserById } = require('./database');
const UAParser = require('ua-parser-js');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    console.log(`📍 ${req.method} ${req.path} | IP: ${req.ip}`);
    next();
});

// ROUTES

// Home Page
app.get('/', (req,res) => {
    res.render('index', { user: req.user });
});

app.get('/auth/github',
    (req,res,next) => {
        req.session.state = require('crypto').randomBytes(16).toString('hex');
        next();
    },
    passport.authenticate('github', {
        scope: ['user:email'],
        state: true
    })
);

app.get('/auth/github/callback',
    (req, res, next) => {
        logSecurityEvent('AUTH_ATTEMPT', req, null, null, 'Github OAuth callback');
        next();
    },
    passport.authenticate('github', { failureRedirect: '/login-failed' } ),
    (req, res) => {
        logSecurityEvent('LOGIN_SUCCESS', req, req.user.id, req.user.username, 'GitHub OAuth success');
        res.redirect('/vault');
    }
);

app.get('/login-failed', (req,res) => {
    logSecurityEvent('LOGIN_FAILURE', req, null, null, 'Github OAuth failed');
    res.render('login-failed');
});

app.get('/logout', (req, res, next)=> {
    const username = req.user?.username || 'Unknown';
    logSecurityEvent('LOGOUT', req, req.user?.id, username, 'User logged out');

    req.logout((err) => {
        if (err) { return next(err); }
        req.session.destroy(() => {
            res.redirect('/');
        });
    });
});

// PROTECTED ROUTES
function requireAuth(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }

    logSecurityEvent('UNAUTHORIZED_ACCESS', req, null, null, `Attempted to access ${req.path}`);
    res.redirect('/');
}

app.get('/vault', requireAuth, (req,res) => {
    logSecurityEvent('VAULT_ACCESS', req, req.user.id, req.user.username, 'Accessed vault');
    res.render('vault', { user: req.user });
});

// Save secret
app.post('/vault/save', requireAuth, (req, res) => {
    const { secret } = req.body;
    updateUserSecret(req.user.id,secret);
    logSecurityEvent('SECRET_UPDATED', req, req.user.id, req.user.username, 'User updated their secret');

    const updatedUser = getUserById(req.user.id);
    req.user = updatedUser;
    res.render('vault', { user: updatedUser, message: 'Secret saved successfully' });
});

// Audit logs
app.get('/audit', requireAuth, (req, res) => {
    const logs = getAuditLogs(100); 

    const classifiedLogs = logs.map(log => {
        let severity = 'INFO'; 
        let icon = '🟢'; 
        
        if (log.event_type.includes('FAILURE') || log.event_type.includes('UNAUTHORIZED')) { 
            severity = log.event_type.includes('UNAUTHORIZED') ? 'ALERT' : 'WARN'; 
            icon = log.event_type.includes('UNAUTHORIZED') ? '🔴' : '🟡'; 
        }
  
        return { 
            ...log, 
            severity, 
            icon,
            deviceInfo: `${log.browser || 'Unknown'} on ${log.os || 'Unknown OS'}`
        };
    });

    res.render('audit', { logs: classifiedLogs, user: req.user }); 
});
app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════╗
  ║     🛡️  SENTINEL VAULT INITIALIZED       ║
  ╚═══════════════════════════════════════════╝
  
  📍 Server running on http://localhost:${PORT}
  🔒 Security monitoring active
  📊 Audit logging enabled
  
  Ready to authenticate...
  `);
});

