import express, { json } from "express";
import cors from "cors";
import { signIn, signUp } from "./controller/authController.js";
import { addIncome, addExpense, getRecords } from "./controller/recordController.js";

const app = express();

app.use(cors());
app.use(json());
const PORT = 5000;


// const records = db.collection("records");
// const users = db.collection("users");

app.post("/sign-up", signUp)

app.post("/sign-in", signIn )


app.post("/income", addIncome)
// async (req, res) => {
//   const { value, description } = req.body;
//   const body = { value: parseFloat(value), description };
//   const { authorization } = req.headers;
//   const token = authorization?.replace("Bearer ", "");

//   const { error } = validationBalance.validate(body, { abortEarly: false });

//   if (error) return res.status(422).send({ message: error.details.map((m) => m.message) });

//   try {
//     const date = dayjs().format("DD/MM");
//     const document = {
//       value: parseFloat(value).toFixed(2),
//       description,
//       date,
//       type: "income",
//       token,
//     };
//     await records.insertOne({ ...document });
//     res.sendStatus(201);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

app.post("/expense", addExpense)
// async (req, res) => {
//   const { value, description } = req.body;
//   const body = { value: parseFloat(value), description };
//   const { authorization } = req.headers;
//   const token = authorization?.replace("Bearer ", "");

//   const { error } = validationBalance.validate(body, { abortEarly: false });
//   if (error) return res.status(422).send({ message: error.details.map((m) => m.message) });
//   console.log(parseFloat(value));

//   try {
//     const date = dayjs().format("DD/MM");
//     const document = {
//       value: parseFloat(value).toFixed(2),
//       description,
//       date,
//       type: "expense",
//       token,
//     };

//     await records.insertOne({ ...document });

//     return res.sendStatus(201);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

app.get("/records", getRecords)
// async (req, res) => {
//   const { authorization } = req.headers;
//   const token = authorization?.replace("Bearer ", "");
//   try {
//     const allRecords = await records.find({ token }).toArray();

//     res.status(200).send(allRecords);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});
