import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { records } from "../config/database.js";

export const addIncome = async (req, res) => {
  const { value, description } = req.body;
  const { token } = res.locals;

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
  const { token } = res.locals;

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

export const deleteRecord = async (req, res) => {
  const { id } = req.params;

  try {
    await records.deleteOne({ _id: new ObjectId(id) });

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const editRecord = async (req, res) => {
  const { value, description } = req.body;
  const { id } = req.params;

  try {
    const date = dayjs().format("DD/MM");
    await records.updateOne(
      { _id: ObjectId(id) },
      { $set: { value: parseFloat(value).toFixed(2), description, date } }
    );

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};
