import express, { json } from "express";
import cors from "cors";
import dayjs from "dayjs";
import bcrypt, { hash } from "bcrypt";
import { v4 as uuid } from "uuid";
import { validationSignUp, validationBalance } from "./schemas/index.js";
import db from "./config/database.js";

const app = express();

app.use(cors());
app.use(json());
const PORT = 5000;


// const mongoClient = new MongoClient(process.env.DATABASE_URL);
// let db;

// try {
//   await mongoClient.connect();
// } catch (err) {
//   console.log(err);
// }

// db = mongoClient.db();
const records = db.collection("records");
const users = db.collection("users");

app.post("/sign-up", async (req, res) => {
  const { name, email, password } = req.body;
  const { error } = validationSignUp.validate(req.body, { abortEarly: false });

  if (error) return res.status(422).send({ message: error.details.map((m) => m.message) });

  try {
    const isUserExist = await users.findOne({ $or: [{ email }, { name }] });
    const passwordHash = await hash(password, 8);
    const createDate = dayjs().format("DD/MM/YYYY");
    const token = uuid();

    if (isUserExist) return res.status(422).send("usuário já cadastrado");

    await users.insertOne({ name, email, password: passwordHash, createDate, token });

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
      return res.status(409).send("verifique se os dados foram inseridos corretamente");
    }

    res.status(200).send({ token: user.token, name: user.name });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/income", async (req, res) => {
  const { value, description } = req.body;
  const body = { value: parseFloat(value), description };
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  const { error } = validationBalance.validate(body, { abortEarly: false });

  if (error) return res.status(422).send({ message: error.details.map((m) => m.message) });

  try {
    const date = dayjs().format("DD/MM");
    const document = {
      value: parseFloat(value).toFixed(2),
      description,
      date,
      type: "income",
      token,
    };
    await records.insertOne({ ...document });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/expense", async (req, res) => {
  const { value, description } = req.body;
  const body = { value: parseFloat(value), description };
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  const { error } = validationBalance.validate(body, { abortEarly: false });
  if (error) return res.status(422).send({ message: error.details.map((m) => m.message) });
  console.log(parseFloat(value));

  try {
    const date = dayjs().format("DD/MM");
    const document = {
      value: parseFloat(value).toFixed(2),
      description,
      date,
      type: "expense",
      token,
    };

    await records.insertOne({ ...document });

    return res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/records", async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  try {
    const allRecords = await records.find({ token }).toArray();

    res.status(200).send(allRecords);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});
