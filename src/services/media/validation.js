import { body } from "express-validator";
import { checkSchema, validationResult } from "express-validator";

const schema = {
  Title: {
    in: ["body"],
    isString: {
      errorMessage: "Title Validation failed, type must be string",
    },
  },
  Year: {
    in: ["body"],
    isNumeric: {
      errorMessage: "Year Validation failed, type must be a number",
    },
  },
  Type: {
    in: ["body"],
    isString: {
      errorMessage: "Type Validation failed, type must be string",
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
