import express, { json } from "express";
import { MongoClient, ObjectId } from "mongodb";
import * as dotenv from "dotenv";
import cors from "cors";
import joi from "joi";


const app = express();
dotenv.config();
app.use(cors());
app.use(json());

const mongoClient = new MongoClient(process.env.DATABASE_URL);
const PORT = 5000
let db;

try {
	await mongoClient.connect();
} catch (err) {
	console.log(err);
}

db = mongoClient.db();
const registries = db.collection("registries")
const users = db.collection("users")





app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});