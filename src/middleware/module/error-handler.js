import logger from "../../utils/logger";

const handleError = (err, req, res, next) => {
  if (res.headerSent) return next(err);

  const message = err.status ? err.message : "Internal Server Error";

  let errors = err.data ? err.data : null;
  if (errors instanceof Array)
    if (message === "Validation Error") {
      const result = [];
      let key = 0;
      const keys = {};

      errors.forEach((val) => {
        const { param, msg } = val;

        if (!keys[param]) {
          keys[param] = 1;
          result[key] = msg;
          key += 1;
        }
      });

      errors = result;
    } else {
      errors = [errors];
    }

  logger.error(message);

  res.status(err.status ? err.status : 500).send({
    meta: {
      status: "failure",
      message,
      code: err.status ? err.status : 500,
    },
    errors,
  });
};

export default handleError;
