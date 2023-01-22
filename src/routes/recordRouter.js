import { Router } from "express";
import {addIncome, addExpense, getRecords} from "../controller/recordController.js"
import { tokenMiddleware } from "../middleware/index.js";

const recordRouter = Router()

recordRouter.use(tokenMiddleware)

recordRouter.post("/income", addIncome)

recordRouter.post("/expense", addExpense)

recordRouter.get("/records", getRecords)

export default recordRouter