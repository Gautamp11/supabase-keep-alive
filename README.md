🟢 Supabase Keep-Alive (Free-Tier Saver)

Keep your Supabase free-tier projects awake automatically using GitHub Actions.
No server, no cron setup, just a lightweight scheduled ping 💡

🚀 How It Works

This GitHub Action runs twice a week and pings a live REST endpoint in your Supabase project — keeping it active and preventing sleep.

⚙️ Setup (Takes <3 Minutes)
1️⃣ Fork This Repo

Click Fork (top right on GitHub).
This creates your own copy — GitHub Actions will run from your account.

2️⃣ Create a Small “Ping” Table in Supabase

For each project you want to keep alive:

Open SQL Editor → New Query

Paste and run:

create table if not exists ping_test (
id serial primary key,
note text
);
insert into ping_test (note) values ('keep alive');

That’s all — now you have a tiny table you can safely query.

3️⃣ Add GitHub Secrets

In your forked repo:
Settings → Secrets → Actions → New repository secret

Add these two secrets:

SUPABASE_URLS

https://tifqawwuaiorgvqycztr.supabase.co/rest/v1/ping_test?select=id,
https://gnrpfrrighiptxealvoy.supabase.co/rest/v1/ping_test?select=id,
https://fapzspalbjziliwycaij.supabase.co/rest/v1/ping_test?select=id,
https://lngdvxlzuxjxxtrkrihm.supabase.co/rest/v1/ping_test?select=id,
https://gvpmwpuskokddtkthhme.supabase.co/rest/v1/ping_test?select=id,
https://kedfrvwwggcydiomjriz.supabase.co/rest/v1/ping_test?select=id

SUPABASE_ANON_KEYS

<anon_key_for_project_1>,
<anon_key_for_project_2>,
<anon_key_for_project_3>,
<anon_key_for_project_4>,
<anon_key_for_project_5>,
<anon_key_for_project_6>

👉 You’ll find your Anon Key under
Supabase → Settings → API → Project API Keys

⚠️ Make sure the number of URLs and keys match (same order).

4️⃣ That’s It 🎉

GitHub Actions will:

Run every Monday and Thursday at 6 AM UTC

Ping all your Supabase projects’ /rest/v1/ping_test?select=id endpoint

Log results in the Actions tab

You don’t need to keep anything running — GitHub handles the schedule automatically.

🔒 Security Note

Use only your Anon Key (never your Service Role key).
The Anon key is safe and read-only for this purpose.

🧩 Optional: Edge Function Method

If you prefer not to create a table, deploy a simple Edge Function instead:

// supabase/functions/ping/index.ts
export const onRequest = () => new Response("pong", { status: 200 });

Then deploy it and use this URL instead:

https://<your-project>.supabase.co/functions/v1/ping

🕒 Custom Schedule (optional)

You can edit .github/workflows/keep-alive.yml and change:

cron: "0 6 \* \* 1,4"

to your own schedule (e.g., every day).

❤️ Credits

Built by Gautam Kumar
to save Supabase developers from sleeping projects 😄
