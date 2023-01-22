import { Router } from "express";
import { authSchemaMiddleware } from "../middleware/index.js";
import { authSchemas } from "../schemas/authSchemas.js";
import { signIn, signUp } from "../controller/authController.js";

const authRouter = Router();

authRouter.post("/sign-up", authSchemaMiddleware(authSchemas), signUp);
authRouter.post("/sign-in", signIn);

export default authRouter;
