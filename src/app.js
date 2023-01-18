import express, { json } from "express";
import { MongoClient, ObjectId } from "mongodb";
import * as dotenv from "dotenv";
import cors from "cors";
import dayjs from "dayjs";
import { validationSignUp } from "./schemas/index.js";

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
const records = db.collection("records");
const users = db.collection("users");

app.post("/sign-up", async (req, res) => {
  const { value, error } = validationSignUp.validate(req.body, { abortEarly: false });
  if (error) return res.status(422).send({ message: error.details.map((m) => m.message) });

  try {
    users.insertOne({ ...value });

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserExist = await users.findOne({ $and: [{ email }, { password }] });

    if (!isUserExist) return res.status(401).send("verifique se os dados foram inseridos corretamente");

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/income", async (req, res) => {
  const { value, description } = req.body;
  const date = dayjs().format("DD/MM");

  try {
    await records.insertOne({ date, value, description, type: "income" });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/expense", async (req, res) => {
  const { value, description } = req.body;
  const date = dayjs().format("DD/MM");

  try {
    await records.insertOne({ date, value, description, type: "expense" });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/records", async (req, res) => {
  try {
    const allRecords = await records.find({}).toArray();

    res.status(200).send(allRecords);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});
