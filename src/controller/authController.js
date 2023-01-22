import bcrypt, { hash } from "bcrypt";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { users } from "../config/database.js";

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

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
};

export const signIn = async (req, res) => {
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
};
