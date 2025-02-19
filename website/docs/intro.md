---
sidebar_position: 1
slug: /
---

# Project Essence: Sentinel Vault

Sentinel Vault is a project I started to learn more about web security and how to keep user data safe. It is a simple personal data vault where users can store a single secret piece of information. The goal was not just to build a vault: but to understand the telemetry of security. I wanted to see exactly what happens when someone tries to log in: where they are coming from: and what they are doing on the server.

### Why GitHub OAuth2?
I decided to use GitHub for authentication because: as a beginner: I do not want to be responsible for storing and hashing raw passwords. Handling passwords correctly is difficult and risky. By using Passport.js and the GitHub strategy: I can let a trusted service handle the identity verification while I focus on the security of the application itself. It also means I do not have to worry about password resets or email verification.

### Why SQLite?
I chose SQLite (specifically the better-sqlite3 library) because it is simple and self-contained. It does not require a separate database server to be running: which makes it perfect for a learning project. The entire database is just a file in the project folder. This makes it very easy to inspect the tables and see how the audit logs are being stored in real-time.

### General Features
- **Secure Authentication:** Powered by Passport.js and GitHub.
- **Personal Secret Vault:** A dedicated space for one piece of sensitive data.
- **Robust Audit Logging:** Every login: logout: and unauthorized access attempt is tracked.
- **Security Telemetry:** Real-time logging of IP addresses: User Agents: and device information.
- **Clean Interface:** Simple EJS templates that focus on the data.
