import express, { json } from "express";
import { MongoClient, ObjectId } from "mongodb";
import * as dotenv from "dotenv";
import cors from "cors";
import dayjs from "dayjs";
import bcrypt, { hash } from "bcrypt";
import { v4 as uuid } from "uuid";
import { validationSignUp, validationBalance } from "./schemas/index.js";

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
  const { name, email, password, confirmPassword } = req.body;
  const { error } = validationSignUp.validate(req.body, { abortEarly: false });

  if (error) return res.status(422).send({ message: error.details.map((m) => m.message) });

  try {
    const isUserExist = await users.findOne({ $or: [{ email }, { name }] });
    const passwordHash = await hash(password, 8);
    const token = uuid();

    if (isUserExist) return res.status(422).send("usuário já cadastrado");

    await users.insertOne({ name, email, password: passwordHash, token });

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await users.findOne({ email });
    const match = await bcrypt.compare(password, user.password);

    if (!user || !match) {
      return res.status(401).send("verifique se os dados foram inseridos corretamente");
    }

    res.status(200).send(user.token, user.name);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/income", async (req, res) => {
  const date = dayjs().format("DD/MM");
  const { token } = req.headers;
  const { value, error } = validationBalance.validate(req.body, { abortEarly: false });

  if (error) return res.status(422).send({ message: error.details.map((m) => m.message) });

  try {
    await records.insertOne({ ...value, date, type: "income", token });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/expense", async (req, res) => {
  const date = dayjs().format("DD/MM");
  const { token } = req.headers;
  const { value, error } = validationBalance.validate(req.body, { abortEarly: false });

  if (error) return res.status(422).send({ message: error.details.map((m) => m.message) });

  try {
    await records.insertOne({ ...value, date, type: "expense", token });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/records", async (req, res) => {
  const { token } = req.headers;
  try {
    const allRecords = await records.find({token: token}).toArray();

    res.status(200).send(allRecords);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});
