import { Router } from "express";
import {addIncome, addExpense, getRecords} from "../controller/recordController.js"

const recordRouter = Router()

recordRouter.post("/income", addIncome)

recordRouter.post("/expense", addExpense)

recordRouter.get("/records", getRecords)

export default recordRouter