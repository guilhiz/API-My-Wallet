import { Router } from "express";
import { recordSchemas } from "../schemas/recordSchemas.js";
import { addIncome, addExpense, getRecords, deleteRecord, editRecord } from "../controller/recordController.js";
import { tokenMiddleware, recordSchemaMiddleware } from "../middleware/index.js";

const recordRouter = Router();

recordRouter.use(tokenMiddleware);

recordRouter.post("/income", recordSchemaMiddleware(recordSchemas), addIncome);

recordRouter.post("/expense", recordSchemaMiddleware(recordSchemas), addExpense);

recordRouter.get("/records", getRecords);

recordRouter.delete("/records/:id", deleteRecord);

recordRouter.put("/records/:id", recordSchemaMiddleware(recordSchemas), editRecord);

export default recordRouter;
