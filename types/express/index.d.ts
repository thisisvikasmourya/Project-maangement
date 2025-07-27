// types/express.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
        // Add other user properties as needed
      };
    }
  }
}
