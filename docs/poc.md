---
sidebar_position: 1
---

# Demonstration & Proof of Concept

This page is a quick demonstration of the core features in Sentinel Vault. I have built it as a Proof of Concept (PoC) to show how simple it can be to implement security telemetry in a web application.

### The Vault in Action

1. **GitHub Login:**
   The user clicks the "Sign in with GitHub" button. This redirects them to GitHub's authorization page. After they approve the request: GitHub sends them back to my application with a secure token.

2. **Accessing the Vault:**
   Once authenticated: the user can access the `/vault` route. Here: they can store their secret piece of information. This is currently limited to one secret per user: as I want to keep the logic focused and easy to maintain.

3. **Updating the Secret:**
   The user can change their secret at any time. Every time they update it: an entry is added to the audit logs.

### Security Monitoring

The most important part of this PoC is the Audit Dashboard. You can see it by logging in and navigating to the `/audit` page.

- **Real-time Monitoring:** Every action is recorded instantly.
- **Visual Severity:** Logs are color-coded:
  - **Green (INFO):** Regular activity (logins: vault access).
  - **Yellow (WARN):** Failed attempts or logouts.
  - **Red (ALERT):** Unauthorized access attempts to protected pages.

### Example Log Entry
Here is what a typical log entry looks like in the database:
- **Event:** UN_AUTHORIZED_ACCESS
- **IP:** 192.168.1.1
- **Browser:** Chrome 122
- **OS:** Windows 11
- **Details:** Attempted to access /vault without session

By seeing this: I can immediately identify if someone is trying to probe my server for weaknesses.
