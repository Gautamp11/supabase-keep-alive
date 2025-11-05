import https from "https";

const urls =
  process.env.SUPABASE_URLS?.split(",").map((url) => url.trim()) || [];
const apiKeys =
  process.env.SUPABASE_ANON_KEYS?.split(",").map((key) => key.trim()) || [];

if (urls.length === 0) {
  console.error(
    "⚠️ No URLs provided. Set SUPABASE_URLS in your GitHub secrets."
  );
  process.exit(1);
}

if (apiKeys.length === 0) {
  console.error(
    "⚠️ No API keys provided. Set SUPABASE_ANON_KEYS in your GitHub secrets."
  );
  process.exit(1);
}

if (urls.length !== apiKeys.length) {
  console.error(
    "⚠️ Number of URLs and API keys don't match. Please provide one API key for each URL."
  );
  process.exit(1);
}

console.log("🔁 Pinging Supabase projects...\n");

async function pingURL(url, apiKey) {
  const apiEndpoint = `${url.replace(/\/$/, "")}/rest/v1/`;
  return new Promise((resolve) => {
    const options = {
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
    };
    https
      .get(apiEndpoint, options, (res) => {
        console.log(`✅ ${apiEndpoint} → ${res.statusCode}`);
        resolve();
      })
      .on("error", (err) => {
        console.error(`❌ ${apiEndpoint} → ${err.message}`);
        resolve();
      });
  });
}

(async () => {
  await Promise.all(urls.map((url, index) => pingURL(url, apiKeys[index])));
  console.log("\n🏁 Done! All Supabase projects pinged successfully.");
  process.exit(0);
})();
