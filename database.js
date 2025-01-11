const UAParser = require('ua-parser-js');
const Database = require('better-sqlite3');
const path = require('path');


const db = new Database(path.join(__dirname, 'sentinel.db'), { verbose: console.log });

// Create tables
function initializeDatabase() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL,
      avatar_url TEXT,
      secret TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL,
      user_id TEXT,
      username TEXT,
      ip_address TEXT,
      user_agent TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      details TEXT,
      method TEXT,
      status_code INTEGER,
      browser TEXT,
      os TEXT
    )
  `);

  console.log('Database initialized successfully');
}


function logSecurityEvent(eventType, req, userId = null, username = null, details = null) {
  const ip = req.ip || req.connection.remoteAddress; 
  const userAgent = req.get('user-agent') || 'Unknown'; 
  
  const ua = new UAParser(userAgent).getResult();
  
  const stmt = db.prepare(`
    INSERT INTO audit_logs (
      event_type, user_id, username, ip_address, user_agent, 
      details, method, status_code, browser, os
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const statusCode = (eventType.includes('FAILURE') || eventType.includes('UNAUTHORIZED')) ? 403 : 200;

  stmt.run(
    eventType, userId, username, ip, userAgent, 
    details, req.method, statusCode, ua.browser.name, ua.os.name
  );
}

function getAuditLogs(limit = 50) {
  const stmt = db.prepare(`
    SELECT * FROM audit_logs 
    ORDER BY timestamp DESC 
    LIMIT ?
  `);
  return stmt.all(limit);
}


function findOrCreateUser(profile) {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(profile.id);
  
  if (user) {
    return user;
  }

  const stmt = db.prepare(`
    INSERT INTO users (id, username, avatar_url)
    VALUES (?, ?, ?)
  `);
  
  stmt.run(profile.id, profile.username, profile.photos?.[0]?.value || null);
  return db.prepare('SELECT * FROM users WHERE id = ?').get(profile.id);
}

function getUserById(id) {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
}

function updateUserSecret(userId, secret) {
  const stmt = db.prepare('UPDATE users SET secret = ? WHERE id = ?');
  stmt.run(secret, userId);
}


initializeDatabase();

module.exports = {
  db,
  logSecurityEvent,
  getAuditLogs,
  findOrCreateUser,
  getUserById,
  updateUserSecret
};