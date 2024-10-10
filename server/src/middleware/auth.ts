import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../consts';
import logger from '../logger';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

interface TokenPayload extends JwtPayload {
  id: string;
}

export const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];

  if(!JWT_SECRET){
    logger.info('JWT_SECRET not defined');
    res.status(500).json({ msg: 'Server configuration error' });
    return;
  }

  if (!token) {
    logger.info('No token found');
    res.status(401).json({ msg: 'No token, authorization denied' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as TokenPayload;
    req.userId = decoded.id;
    logger.info('Token is valid, forwarding');
    next();
  } catch (err) {
    logger.info('Invalid token');
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
