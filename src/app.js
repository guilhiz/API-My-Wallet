import express, { json } from "express";
import router from "./routes/index.js";
import cors from "cors";


const app = express();

app.use(cors());
app.use(json());
const PORT = 5000;


app.use(router)

app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});
