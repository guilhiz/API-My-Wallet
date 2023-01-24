import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();
const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

try {
  await mongoClient.connect();
  db = mongoClient.db();
} catch (err) {
  res.status(500).send(err)
}
export const users = db.collection("users");
export const records = db.collection("records");
