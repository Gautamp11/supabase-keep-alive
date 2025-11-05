import https from "https";

const urls =
  process.env.SUPABASE_URLS?.split(",").map((url) => url.trim()) || [];
const apiKeys =
  process.env.SUPABASE_ANON_KEYS?.split(",").map((key) => key.trim()) || [];

if (!urls.length) {
  console.error("⚠️ No URLs provided. Set SUPABASE_URLS in GitHub secrets.");
  process.exit(1);
}

if (!apiKeys.length) {
  console.error(
    "⚠️ No API keys provided. Set SUPABASE_ANON_KEYS in GitHub secrets."
  );
  process.exit(1);
}

if (urls.length !== apiKeys.length) {
  console.error("⚠️ Number of URLs and API keys don't match.");
  process.exit(1);
}

console.log("🔁 Pinging Supabase REST endpoints...\n");

async function pingURL(url, apiKey) {
  return new Promise((resolve) => {
    const req = https.request(
      url,
      {
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
        },
      },
      (res) => {
        console.log(`✅ ${url} → ${res.statusCode}`);
        resolve();
      }
    );

    req.on("error", (err) => {
      console.error(`❌ ${url} → ${err.message}`);
      resolve();
    });

    req.end();
  });
}

(async () => {
  try {
    await Promise.all(urls.map((url, i) => pingURL(url, apiKeys[i])));
    console.log("\n🏁 Done! All Supabase projects pinged successfully.");
  } catch (err) {
    console.error("Unexpected error:", err);
  } finally {
    // ✅ ensure GitHub Action exits cleanly
    process.exit(0);
  }
})();
