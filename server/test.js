const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://kashyappayal654_db_user:payal123@cluster0.d4zkpbk.mongodb.net/artisanscorner?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();