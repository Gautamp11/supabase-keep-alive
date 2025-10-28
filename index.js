import https from "https";

const urls = process.env.SUPABASE_URLS?.split(",") || [];

if (urls.length === 0) {
  console.error(
    "⚠️ No URLs provided. Set SUPABASE_URLS in your GitHub secrets."
  );
  process.exit(1);
}

console.log("🔁 Pinging Supabase projects...\n");

async function pingURL(url) {
  const apiEndpoint = `${url.replace(/\/$/, "")}/rest/v1/`;
  return new Promise((resolve) => {
    https
      .get(apiEndpoint, (res) => {
        console.log(`✅ ${url} → ${res.statusCode}`);
        resolve();
      })
      .on("error", (err) => {
        console.error(`❌ ${url} → ${err.message}`);
        resolve();
      });
  });
}

(async () => {
  await Promise.all(urls.map(pingURL));
  console.log("\n🏁 Done! All Supabase projects pinged successfully.");
  process.exit(0);
})();
