---
sidebar_position: 1
---

# Installation & Setup

Setting up Sentinel Vault is straightforward. I have kept the dependencies as simple as possible to ensure anyone can run it on their local machine for testing.

### Requirements
Before you begin: make sure you have the following installed:
- **Node.js (v18 or newer):** To run the server and handle dependencies.
- **Git:** To clone the project and follow my commit history.
- **A GitHub Account:** This is required for creating a GitHub OAuth App.

### Steps to Install

1. **Clone the project:**
   ```bash
   git clone https://github.com/your-username/sentinel-vault.git
   cd sentinel-vault
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your environment variables:**
   Create a file named `.env` in the root of the project and add the following keys:
   ```env
   PORT=3000
   SESSION_SECRET=your_random_secret_here
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

4. **Register a GitHub OAuth App:**
   - Go to your GitHub Settings > Developer settings > OAuth Apps.
   - Register a new application.
   - For Homepage URL: use `http://localhost:3000`.
   - For Authorization callback URL: use `http://localhost:3000/auth/github/callback`.
   - Copy the Client ID and Client Secret into your `.env` file.

5. **Start the server:**
   ```bash
   npm start
   ```

You should see a message that the server is running on http://localhost:3000.
