---
sidebar_position: 1
---

# Implementation Story

This is where I document my journey while building Sentinel Vault. It has been a rewarding but challenging process: from my first attempts at setting up a Node.js server to my latest audit logging implementation.

### January 15: Starting the Vault
I began by creating a simple Express server and thinking about how to store user secrets. I knew from the start I wanted a database: and SQLite was the perfect choice because it is easy to set up and manage.

### January 22: The Hurdles with Passport.js
This was probably my biggest challenge. Trying to get GitHub OAuth2 working with Passport.js was very confusing at first. I struggled with understanding how sessions work and how to properly configure the callback URL. I spent hours debugging an error that turned out to be a missing `.env` variable. When I finally saw the "Welcome" message after logging in with my GitHub account: it felt like a huge success.

### February 5: First Audit Log Success
Building the audit logging system was my next milestone. I wanted more than just a simple "user logged in" message. I wanted to see the details: the IP address: the browser they used: and the exact time it happened.

I spent an evening learning how to use the `ua-parser-js` library to break down raw User Agent strings into readable information. I remember the moment I checked the `audit_logs` table and saw my first entry:
- **Event:** LOGIN_SUCCESS
- **Browser:** Firefox
- **OS:** Linux
It was incredible to see that level of detail stored in my own database.

### February 20: Polishing the Vault
I spent the last few weeks cleaning up the code and improving the way audit logs are displayed on the dashboard. I added severity levels (INFO: WARN: ALERT) and icons to make the logs easier to scan.

Building Sentinel Vault has taught me that security is not just about keeping people out: it is about knowing exactly who is coming in and what they are doing.
