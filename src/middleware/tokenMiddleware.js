import { records } from "../config/database.js";

export const tokenMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  try {
    const allRecords = await records.find({ token }).toArray();

    res.locals.token = token;
    res.locals.allRecords = allRecords

    next();
  } catch (err) {
    res.status(500).send(err);
  }
};
