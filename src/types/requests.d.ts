import { Request } from "express";

declare interface AuthenticatedRequest extends Request {
  session: {
    userId: string;
  }
}