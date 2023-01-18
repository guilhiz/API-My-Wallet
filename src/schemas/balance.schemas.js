import joi from "joi"

export const validationBalance = joi.object({
  value: joi.number().precision(2).min(2).required(),
  description: joi.string().min(3).max(50).required(),
});
