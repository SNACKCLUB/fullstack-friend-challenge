import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/CustomError";
import { ZodError } from "zod";

export const errorHandler = (
  error: Error | CustomError | ZodError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if ("statusCode" in error) {
    const { statusCode, message, details } = error as CustomError;
    return response.status(statusCode).json({
      status: "error",
      message,
      details,
    });
  }

  if (error instanceof ZodError) {
    return response.status(400).json({
      status: "error",
      message: "Validation error",
      details: error.format(),
    });
  }

  if (error instanceof Error) {
    return response.status(500).json({
      status: "error",
      message: error.message,
      name: error.name,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Erro interno do servidor",
  });
};
