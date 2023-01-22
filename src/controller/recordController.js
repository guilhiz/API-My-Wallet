import dayjs from "dayjs";
import { records } from "../config/database.js";
import { validationBalance } from "../schemas/index.js";




export const addIncome = async (req, res) => {
  const { value, description } = req.body;
  const body = { value: parseFloat(value), description };
  const { token } = res.locals;


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
};

export const addExpense = async (req, res) => {
  const { value, description } = req.body;
  const body = { value: parseFloat(value), description };
  const { token } = res.locals;

  const { error } = validationBalance.validate(body, { abortEarly: false });

  if (error) return res.status(422).send({ message: error.details.map((m) => m.message) });

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
};

export const getRecords = async (req, res) => {
  const { allRecords } = res.locals;

  try {
    res.status(200).send(allRecords);
  } catch (err) {
    res.status(500).send(err);
  }
};
