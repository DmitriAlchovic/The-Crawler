import { Request, Response, NextFunction } from 'express';
import { createUserController } from '../../controllers/user.controller';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PASSWORD_SALT, REGISTER_DISCOUNT_ID } from '../../constants';

const registerHandler =async (req: Request, res: Response) => {
    try {
    const { email, password, userName, phoneNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT);
    const createUser = await createUserController({
      email,
      password: hashedPassword,
      userName,
      phoneNumber,
      discountId: REGISTER_DISCOUNT_ID,
    });
    const token = jwt.sign({ userId: createUser.userId }, 'secret', {
      expiresIn: '40h',
    });

    res.status(200).json(token);
  } catch (error) {
    res.status(500).json(error);
  }
}

export default registerHandler;
