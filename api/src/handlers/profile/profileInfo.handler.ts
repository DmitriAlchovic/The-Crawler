import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { findByIdController } from '../../controllers/user.controller';

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    userId: number;
  }
}

const profileInfoHandler = async(req: Request, res: Response) => {
try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const { userId } = <jwt.UserIDJwtPayload>jwt.verify(token, 'secret');

      const user = await findByIdController(userId);
      if (user) {
        res.status(200).json(user);
      }
    }
  } catch (error: any) {
    res.status(500).json(error);
  }
}

export default profileInfoHandler;