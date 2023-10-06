import { NextFunction, Request, Response } from "express";

export const isCreateBodyValid = (req: Request, res: Response, next: NextFunction) => {
  const validationRules = [
    { field: "name", required: true, maxLength: 50, message: "Name is required and should not exceed 50 characters" },
    { field: "category", required: true, maxLength: 20, message: "Category is required and should not exceed 20 characters" },
    { field: "duration", required: true, message: "Duration is required" },
    { field: "price", required: true, message: "Price is required" },
  ];

  const errors = [];

  for (const rule of validationRules) {
    const { field, required, maxLength, message } = rule;
    const value = req.body[field];

    if (required && !value) {
      errors.push(`${field} is required`);
    } else if (maxLength && value?.length > maxLength) {
      errors.push(`${field} should not exceed ${maxLength} characters`);
    }
  }

  if (errors.length > 0) {
    return res.status(409).json(errors);
  }

  return next();
};