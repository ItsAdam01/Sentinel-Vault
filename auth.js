const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { findOrCreateUser, getUserById, logSecurityEvent } = require('./database');

console.log('GitHub Client ID:', process.env.GITHUB_CLIENT_ID);
console.log('GitHub Client Secret exists:', !!process.env.GITHUB_CLIENT_SECRET);
console.log('Callback URL:', `http://localhost:${process.env.PORT}/auth/github/callback`);

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `http://localhost:${process.env.PORT}/auth/github/callback`
    },
    function(accessToken, refreshToken, profile, done){
        try {
            const user = findOrCreateUser(profile);
            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    try{
        const user = getUserById(id);
        done(null,user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;