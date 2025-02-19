---
sidebar_position: 1
---

# Technical Specifications

Sentinel Vault is designed around a simple but effective audit logging system. The primary goal is to provide deep visibility into every security-related event on the server.

### Audit Logging Schema

The `audit_logs` table in the SQLite database stores detailed information about every session event. Here is the schema I have defined in `database.js`:

| Field | Type | Description |
|---|---|---|
| **id** | INTEGER | Unique ID for each log entry: auto-incremented. |
| **event_type** | TEXT | The type of event (e.g., LOGIN_SUCCESS: AUTH_ATTEMPT). |
| **user_id** | TEXT | The GitHub ID of the user (if logged in). |
| **username** | TEXT | The GitHub username of the user (if logged in). |
| **ip_address** | TEXT | The IP address from which the request originated. |
| **user_agent** | TEXT | The full User Agent string from the browser. |
| **timestamp** | DATETIME | The date and time the event was recorded. |
| **details** | TEXT | Additional context about the event (e.g., the URL accessed). |
| **method** | TEXT | The HTTP method used (GET or POST). |
| **status_code** | INTEGER | The HTTP response code (200 for success: 403 for failure). |
| **browser** | TEXT | The extracted browser name from the User Agent string. |
| **os** | TEXT | The extracted operating system from the User Agent string. |

### Event Types
I have classified security events into several categories to help with monitoring:
- **AUTH_ATTEMPT:** When a user initiates the GitHub login process.
- **LOGIN_SUCCESS:** When a user successfully authenticates and enters the vault.
- **LOGIN_FAILURE:** When the authentication process fails.
- **LOGOUT:** When a user ends their session.
- **UNAUTHORIZED_ACCESS:** When someone tries to access a protected route without being logged in.
- **VAULT_ACCESS:** Every time a user views their secret data.
- **SECRET_UPDATED:** When a user modifies their stored information.

### Technology Stack
- **Web Server:** Node.js with Express.
- **Session Management:** express-session.
- **Authentication:** Passport.js with the GitHub strategy.
- **Database:** better-sqlite3 for persistence.
- **Frontend:** EJS (Embedded JavaScript) templates.
- **User Agent Parsing:** ua-parser-js to convert raw strings into readable device names.
