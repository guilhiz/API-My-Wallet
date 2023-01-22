import joi from "joi";

export const signUpSchemas = joi.object({
  name: joi.string().min(3).max(20).required(),
  email: joi.string().email().max(50).required(),
  password: joi.string().min(4).max(16).required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
});
