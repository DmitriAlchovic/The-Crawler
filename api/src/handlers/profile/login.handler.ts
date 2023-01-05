import { Request, Response } from 'express';
import { findByEmailController } from '../../controllers/user.controller';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

 const loginHandler = async(req: Request, res: Response) => {
    try {
    const { email, password } = req.body;
    const user = await findByEmailController(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: 'Wrong login or password' });
      }
      const token = jwt.sign({ userId: user.userId }, 'secret', {
        expiresIn: '40h',
      });
      res.status(200).json(token);
    }
  } catch (error: any) {
    res.status(500).json(error);
  }
}

export default loginHandler;
