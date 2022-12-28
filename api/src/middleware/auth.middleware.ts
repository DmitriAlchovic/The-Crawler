import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const authCheck = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      // Bearer TOKEN

      if (!token) {
        return res.status(401).json({
          message: 'No authorization',
        });
      }

      const decoded = jwt.verify(token, 'secret');
      res.locals.user = decoded;
      next();
    } else
      return res.status(401).json({
        message: 'No authorization',
      });
  } catch (error) {
    res.status(401).json({ message: 'No authorization' });
  }
};

export default authCheck;
