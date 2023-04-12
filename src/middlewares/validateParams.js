import httpStatusCode from '../enum/httpStatusCode';

export default function validateParams(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.params, { abortEarly: false });

    if (error) {
      const { details } = error;
      const [errorMessages, errorLabels] = details.map(({ message, context }) => [
        message,
        context.label,
      ]);
      return res.status(httpStatusCode.BAD_REQUEST).send({ message: errorMessages, errorLabels });
    }

    return next();
  };
}
