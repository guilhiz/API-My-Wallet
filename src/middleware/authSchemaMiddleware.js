export const authSchemaMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) return res.status(422).send({ message: error.details.map((m) => m.message) });

    next();
  };
};
