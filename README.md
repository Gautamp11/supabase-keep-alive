# 🟢 Supabase Keep-Alive

Keep your Supabase projects awake automatically — no setup headaches.

This tool pings your Supabase projects twice a week to prevent free-tier projects from going to sleep.

---

## 🔹 How It Works

- GitHub Actions runs a Node.js script on a schedule.
- The script pings your Supabase project URLs to keep them active.
- No server, no manual work — just fork and add your project URL(s).

---

## 🔹 Get Your Supabase Base URL

Your **Supabase project URL** looks like:
https://tifqawwuaiorgvqycztr.supabase.co

**To find it:**

1. Go to [Supabase](https://app.supabase.com/) and select your project.
2. Click **Settings → API**.
3. Copy the **Project URL**.

> This is the only thing you need to keep your project awake.

---

## 🔹 Quick Setup (for users)

1. **Fork this repository**

   - Click the **Fork** button in the top-right corner.
   - This creates a copy of the repo in your GitHub account.

2. **Add your Supabase URLs as a GitHub Secret**
   - Go to **Settings → Secrets and variables → Actions → New repository secret**
   - Name: `SUPABASE_URLS`
   - Value: Your project URL(s), comma-separated if multiple:

https://tifqawwuaiorgvqycztr.supabase.co,https://another.supabase.co

3. **Done!**

- GitHub Actions will automatically ping your projects on the schedule.
- No further setup needed.

---

## 🔹 Optional: Run manually

If you want to test it locally:

```bash
git clone https://github.com/<your-username>/supabase-keep-alive.git
cd supabase-keep-alive
npm install
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
