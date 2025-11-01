// Simple diagnostic: loads .env.local, prints DATABASE_URL, then attempts to connect.
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

(async () => {
  try {
    const url = process.env.DATABASE_URL;
    console.log("DATABASE_URL (raw):", url);
    if (!url) throw new Error("DATABASE_URL is not set");

    // Quick sanity check for common malformed query param
    if (url.includes("retryWrites=") && /retryWrites=[&?]/.test(url)) {
      throw new Error('Found "retryWrites=" with no value in DATABASE_URL');
    }

    const client = new MongoClient(url);
    await client.connect();
    console.log("Connected OK");
    await client.db().admin().ping();
    console.log("Ping OK");
    await client.close();
  } catch (e) {
    console.error("Connection failed:", e);
    process.exitCode = 1;
  }
})();