import { checkSchema, validationResult } from "express-validator";

const schema = {
  Title: {
    in: ["body"],
    isString: {
      errorMessage: "Title  must be string",
    },
  },
  Year: {
    in: ["body"],
    isNumeric: {
      errorMessage: "Year  must be a number",
    },
  },
  Type: {
    in: ["body"],
    isString: {
      errorMessage: "Type  must be string",
    },
  },
};

export const checkMediaSchema = checkSchema(schema);

export const checkValidatonResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation is failed");
    error.status = 400;
    error.errors = errors.array();
    next(error);
  } else {
    next();
  }
};
