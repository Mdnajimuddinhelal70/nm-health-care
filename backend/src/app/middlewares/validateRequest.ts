import type { NextFunction, Request, Response } from "express";
import type { ZodObject } from "zod";

const validateRequest =
  (schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({ body: req.body });
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;
