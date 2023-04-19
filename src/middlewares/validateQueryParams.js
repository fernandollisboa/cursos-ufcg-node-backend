import httpStatusCode from '../enum/httpStatusCode';

export default function validateQueryParams(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.query, { abortEarly: false });

    if (error) {
      const { details } = error;
      const [errorMessages, errorLabels] = details.map(({ message, context }) => [
        message,
        context.label,
      ]);
      return res.status(httpStatusCode.BAD_REQUEST).json({ message: errorMessages, errorLabels });
    }

    return next();
  };
}
