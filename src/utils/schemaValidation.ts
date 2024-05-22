// Import necessary modules and types.
import { ZodSchema } from "zod";
import { fromZodError } from "zod-validation-error";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Middleware for request data validation using a Zod schema in a Next.js API route.
 * @param schema - A ZodSchema to validate the request data.
 */
export const validate =
  (schema: ZodSchema) =>
  (handler: (req: NextApiRequest, res: NextApiResponse) => void) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        // Parse and validate various parts of the request data (body, query, headers) using the provided schema.
        const result = schema.safeParse({
          body: req.body, // Request body data
          query: req.query, // URL query parameters
          headers: req.headers, // Request headers
          // Note: Next.js API routes do not have `params` like in Express.
        });

        // Check if validation was successful.
        if (result.success === false) {
          // If validation failed, throw an error based on the Zod error.
          throw fromZodError(result.error);
        }

        // If validation succeeded, call the handler.
        await handler(req, res);
      } catch (err: any) {
        // Handle validation errors by sending a JSON response with a 400 Bad Request status.
        return res
          .status(400)
          .json({ error: true, message: err.message, data: err });
      }
    };
  };
