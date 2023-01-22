export const recordSchemaMiddleware = (schema) => {
  return (req, res , next) => {
    const { value, description } = req.body;
    const body = { value: parseFloat(value), description };

    const { error } = schema.validate(body, { abortEarly: false });

    if (error) return res.status(422).send({ message: error.details.map((m) => m.message) });

    next()
  }
}