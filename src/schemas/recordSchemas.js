import joi from "joi";

export const recordSchemas = joi.object({
  value: joi.number().precision(2).min(2).required(),
  description: joi.string().min(3).max(50).required(),
});
