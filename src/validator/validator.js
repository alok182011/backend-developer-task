const { badRequestResponse } = require("../utility/responses");

const validator = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      const response = badRequestResponse(message);
      res.status(400).json(response);
    }
  };
};
module.exports = validator;
