import express, { json } from "express";
import router from "./routes/index.js";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(json());
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server running in port: ${process.env.PORT}`);
});
