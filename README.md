# 🟢 Supabase Keep-Alive

This tool pings your Supabase projects twice a week to prevent free-tier projects from going to sleep.

---

## 🔹 How It Works

- GitHub Actions runs a Node.js script on a schedule.
- The script pings your Supabase project URLs to keep them active.
- No server, no manual work — just fork and add your project URL(s).

---

## 🔹 Get Your Supabase Project Details

You'll need two things from your Supabase project:

1. **Project URL** looks like:
   https://tifqawwuaiorgvqycztr.supabase.co

2. **Anon/Public API Key** looks like:
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

**To find these:**

1. Go to [Supabase](https://app.supabase.com/) and select your project
2. Click **Project Settings → API**
3. Copy both the **Project URL** and **anon/public** key (under API Keys section)

> Both the URL and API key are required to keep your project awake.

---

## 🔹 Quick Setup (for users)

1. **Fork this repository**

   - Click the **Fork** button in the top-right corner.
   - This creates a copy of the repo in your GitHub account.

2. **Add your Supabase details as GitHub Secrets**

   - Go to **Settings → Secrets and variables → Actions**
   - Add two new repository secrets:

   a. First secret for URLs:

   - Name: `SUPABASE_URLS`
   - Value: Your project URL(s), comma-separated if multiple:
     ```
     https://tifqawwuaiorgvqycztr.supabase.co,https://another.supabase.co
     ```

   b. Second secret for API keys:

   - Name: `SUPABASE_ANON_KEYS`
   - Value: Your anon/public API key(s), comma-separated in the same order as URLs:
     ```
     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     ```

   > ⚠️ Important: Make sure the order of API keys matches the order of URLs!

3. **Done!**

- GitHub Actions will automatically ping your projects on the schedule.
- No further setup needed.

---

## 🔹 Optional: Run manually

If you want to test it locally:

1. Clone and set up the project:

```bash
git clone https://github.com/<your-username>/supabase-keep-alive.git
cd supabase-keep-alive
npm install
```

2. Set your environment variables:

```bash
# On Windows (PowerShell)
$env:SUPABASE_URLS="https://your-project.supabase.co"
$env:SUPABASE_ANON_KEYS="your-anon-key"

# On Linux/Mac
export SUPABASE_URLS="https://your-project.supabase.co"
export SUPABASE_ANON_KEYS="your-anon-key"
```

3. Run the script:

```bash
npm run ping
```

🔁 Pinging Supabase projects...
✅ https://tifqawwuaiorgvqycztr.supabase.co → 200
🏁 Done! All Supabase projects pinged successfully.

⚡ Notes
Keep URLs in GitHub Secrets — never hardcode them.

Works for both free-tier and paid projects.

Multiple projects? Just separate URLs with a comma.

The workflow is pre-configured to run Monday & Thursday at 9 AM UTC, but users can change the schedule in .github/workflows/ping.yml if desired.
