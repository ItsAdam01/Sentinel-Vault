---
sidebar_position: 1
---

# Isolated Lab Testing

Testing is a core part of my learning process with Sentinel Vault. I am trying to follow a strict Test-Driven Development (TDD) methodology to ensure every feature is working as intended before it is added to the codebase.

### TDD Methodology

I have decided that every feature must have corresponding test files and must pass before the task is complete. This helps me avoid introducing regressions and makes me think about how the code should work before I even start writing it.

### Isolated Lab Environment

When testing security features like login and unauthorized access: I run the server in an isolated local environment.

- **Mocking GitHub OAuth:** Since I cannot easily automate GitHub's login page: I sometimes use a mock authentication strategy during local testing to verify the redirect logic and session handling.
- **Audit Log Verification:** A key part of testing is checking the `sentinel.db` file after an action to ensure the correct audit log entry was created. I use a simple script to count the number of logs before and after an operation.

### Challenges with Testing

As a beginner: setting up automated tests for Passport.js has been difficult. I am currently exploring how to use Go-based test runners to verify my Node.js application: which is why I have set a goal to eventually have `*_test.go` files for my core security logic. This is an ongoing part of my learning journey: as I want to learn more about cross-language testing tools.
