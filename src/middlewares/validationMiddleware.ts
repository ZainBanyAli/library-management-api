import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import ErrorHandler from "./errorHandler"; // Import ErrorHandler

class ValidationMiddleware {
  public static validate(req: Request, res: Response, next: NextFunction): void {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Create a custom error object and pass it to ErrorHandler
      const validationError = new Error("Validation Failed");
      (validationError as any).status = 400;
      (validationError as any).details = errors.array();
      
      return next(validationError); //  Pass error to ErrorHandler
    }

    next();
  }
}

export default ValidationMiddleware;
