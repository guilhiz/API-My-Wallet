import express, { json } from "express";
import { MongoClient, ObjectId } from "mongodb";
import * as dotenv from "dotenv";
import cors from "cors";
import dayjs from "dayjs";
import joi from "joi";

const app = express();
dotenv.config();
app.use(cors());
app.use(json());

const mongoClient = new MongoClient(process.env.DATABASE_URL);
const PORT = 5000;
let db;

try {
  await mongoClient.connect();
} catch (err) {
  console.log(err);
}

db = mongoClient.db();
const registries = db.collection("registries");
const users = db.collection("users");

app.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    users.insertOne({ name, email, password, confirmPassword });

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
});



app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});
