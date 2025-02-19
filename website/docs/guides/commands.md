---
sidebar_position: 1
---

# Command Reference

I use several commands to manage the development and testing of Sentinel Vault. This page serves as a quick reference for those commands.

### Development Commands

- **npm start:** Launches the server using nodemon. This is my primary way of running the application during development.
- **npm install:** Installs all the required Node.js packages for the project.

### Git Management

I have implemented a strict commit policy for this project. To ensure the timeline of my learning is accurate: I use a special helper function to commit changes with a specific timestamp.

To use this: you can add the following function to your `.bashrc` or `.zshrc` file:

```bash
git-commit-as() { # Usage: git-commit-as "2025-02-15T14:30:00-05:00" "commit message"
  GIT_AUTHOR_DATE="$1" \
  GIT_COMMITTER_DATE="$1" \
  git commit -m "$2"
}
```

This helper ensures that every commit in the project history reflects the actual time I was working on that feature. It helps me maintain a clear timeline of my progress from January to February 2025.

### Database Inspection

Since Sentinel Vault uses SQLite: you can use standard CLI tools to inspect the database file.

- **Check tables:**
  ```bash
  sqlite3 sentinel.db ".tables"
  ```
- **View latest audit logs:**
  ```bash
  sqlite3 sentinel.db "SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 5;"
  ```
- **Clear audit logs (for testing):**
  ```bash
  sqlite3 sentinel.db "DELETE FROM audit_logs;"
  ```
