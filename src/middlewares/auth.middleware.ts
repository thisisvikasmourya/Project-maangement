import {
  NextFunction,
  Response,
} from 'express';
import jwt from 'jsonwebtoken';

import { AuthenticatedRequest } from '../../types/express';

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

//   console.log(authHeader,"AUTH")

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' })
  }

  const token = authHeader.split(' ')[1]
  console.log(token,"TOKEN")

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN || 'supersecret') as { id: string ,email:string,role:string}
    req.user = {id:decoded.id,email:decoded.email,role:decoded.role}
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' })
  }
}
