// index.js
import https from "https";

const urls = process.env.SUPABASE_URLS?.split(",") || [];

if (urls.length === 0) {
  console.error(
    "⚠️ No URLs provided. Set SUPABASE_URLS in your GitHub secrets."
  );
  process.exit(1);
}

console.log("🔁 Pinging Supabase projects...\n");

urls.forEach((url) => {
  https
    .get(url, (res) => {
      console.log(`✅ ${url} → ${res.statusCode}`);
    })
    .on("error", (err) => {
      console.error(`❌ ${url} → ${err.message}`);
    });
});
