import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();
const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

try {
  await mongoClient.connect();
  db = mongoClient.db();
} catch (err) {
  console.log(err);
}
export const users = db.collection("users");
export const records = db.collection("records");
