import {
  NextFunction,
  Request,
  Response,
} from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: string }
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

//   console.log(authHeader,"AUTH")

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' })
  }

  const token = authHeader.split(' ')[1]
  console.log(token,"TOKEN")

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN || 'supersecret') as { id: string }
    req.user = decoded
    console.log(decoded)
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' })
  }
}
