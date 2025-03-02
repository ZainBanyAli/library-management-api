import { Request, Response, NextFunction } from "express";

class ErrorHandler {
  public static handleErrors(err: any, req: Request, res: Response, next: NextFunction): Response {
    console.error("Error:", err);

    //  Handle validation errors from express-validator
    if (err.message === "Validation Failed" && err.details) {
      return res.status(400).json({
        status: 400,
        message: "Validation Failed",
        errors: err.details,
      });
    }

    //  Handle unauthorized access (JWT missing or invalid)
    if (err.message === "Unauthorized") {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized: Invalid or missing token",
      });
    }

    //  Handle forbidden actions (JWT valid but no permission)
    if (err.message === "Forbidden") {
      return res.status(403).json({
        status: 403,
        message: "Forbidden: You do not have permission for this action",
      });
    }

    //  Handle not found errors (e.g., book/author does not exist)
    if (err.message === "Not Found") {
      return res.status(404).json({
        status: 404,
        message: "Resource not found",
      });
    }

    //  Handle duplicate entry (MySQL conflict error)
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        status: 409,
        message: "Conflict: Duplicate entry, data already exists.",
      });
    }

    //  Handle MySQL bad field error
    if (err.code === "ER_BAD_FIELD_ERROR") {
      return res.status(400).json({
        status: 400,
        message: "Invalid field provided.",
      });
    }

    //  Handle successful resource creation (201 Created)
    if (err.message === "Resource Created") {
      return res.status(201).json({
        status: 201,
        message: "Resource created successfully.",
      });
    }

    //  Generic error handler for unhandled errors
    return res.status(err.status || 500).json({
      status: err.status || 500,
      message: err.message || "Internal Server Error",
      error: err.details || "Something went wrong.",
    });
  }
}

export default ErrorHandler;
