# Sentinel Vault

I built Sentinel Vault as a way to learn about cybersecurity and how to handle user data safely. It is a secure space to store personal secrets using Node.js and SQLite. Instead of trying to build my own password system, which felt risky for a beginner, I chose to use GitHub OAuth2. This way, I do not have to worry about managing a local password database or the security issues that come with it.

## Security Features

One of my main goals was to understand security telemetry, so I implemented an audit logging system. It tracks things like IP addresses, User Agents, and specific event types. I classified these logs into three categories to help monitor activity:

* **INFO**: Standard events like successful logins or viewing the vault.
* **WARN**: Unusual activities that might need a closer look.
* **ALERT**: Serious events like `UNAUTHORIZED_ACCESS` attempts.

By tracking the IP and User Agent for every request, I can start to see patterns and understand who is interacting with the application.

## Tech Stack

* **Backend**: Express
* **Authentication**: Passport.js with GitHub Strategy
* **Database**: better-sqlite3 for local persistence
* **Styling**: Tailwind CSS
* **Templating**: EJS

## Setup

To run this project locally, you will need to set up your environment variables. 

### Critical Security Note

The `.env` file contains sensitive information like your `GITHUB_CLIENT_SECRET` and `SESSION_SECRET`. You should never commit this file to version control. Use the `.gitignore` provided in the project to prevent accidental exposure of your credentials.

### Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=3000
SESSION_SECRET=your_session_secret_here
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Once your environment is set up, you can install the dependencies and start the server:

```bash
npm install
npm start
```

I am still learning a lot about web security, so I am excited to keep improving this vault as I discover more about protecting data.

<!-- Sentinel Vault - Secure and Transparent -->
