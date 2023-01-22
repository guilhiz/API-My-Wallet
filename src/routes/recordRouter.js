import { Router } from "express";
import { recordSchemas } from "../schemas/index.js";
import { addIncome, addExpense, getRecords } from "../controller/recordController.js";
import { tokenMiddleware, recordSchemaMiddleware } from "../middleware/index.js";

const recordRouter = Router();

recordRouter.use(tokenMiddleware);

recordRouter.post("/income", recordSchemaMiddleware(recordSchemas), addIncome);

recordRouter.post("/expense", recordSchemaMiddleware(recordSchemas), addExpense);

recordRouter.get("/records", getRecords);

export default recordRouter;
