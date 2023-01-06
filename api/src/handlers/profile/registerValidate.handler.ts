import { Request, Response } from 'express';
import { findByEmailController } from '../../controllers/user.controller';
import * as zod from 'zod';
import { ZodError } from 'zod';

const registerValidateHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const findByEmail = await findByEmailController(email);
    if (!findByEmail) {
      const verifyUser = zod.object({
        email: zod.string().email({ message: 'Must be valid email.' }),
        password: zod
          .string()
          .min(8, { message: 'Password must be 8 characters long.' }),
      });
      verifyUser.parse({ email, password });
       res.status(200).json({ message: 'valid data' });
    } else   res.status(500).json({message:'User with this email already exists.'});
  } catch (error: any) {
    if (error instanceof ZodError) {
      const { fieldErrors } = error.flatten();
      const { email, password } = fieldErrors;
      const emailMessage = email ? email[0] + '\n' : '';
      const passwordMessage = password ? password[0] : '';

       res.status(500).json({ message: `${emailMessage}${passwordMessage}` });
    }
    else res.status(500).json({ message: error.message });
  }
};

export default registerValidateHandler;
