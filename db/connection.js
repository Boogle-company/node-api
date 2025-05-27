const { MongoClient } = require("mongodb")

const URL = "mongodb://localhost:27017"
const DB_NAME = "boogle";

async function connect() {
    const client = new MongoClient(URL);
    await client.connect();
    const db = client.db(DB_NAME);
    return { db, client };
}

module.exports = { connect };