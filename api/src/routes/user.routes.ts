import { Router } from 'express';
import {
  createUserController,
  findByEmailController,
  findByIdController,
} from '../controllers/user.controller';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import authCheck from '../middleware/auth.middleware';
import * as zod from 'zod';
import { ZodError } from 'zod';

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
      userId: number
  }
}

const router = Router();


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findByEmailController(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Wrong login or password' });
      }
      const token = jwt.sign({ userId: user.userId }, 'secret', {
        expiresIn: '40h',
      });
      return res.status(200).json(token);
    }
    return res.status(500).json({message: 'Wrong login or password'})
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.get('/info', authCheck, async (req, res) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const { userId } = <jwt.UserIDJwtPayload>jwt.verify(token, 'secret');
      
       const user = await findByIdController(userId);
       if (user) {
        return res.status(200).json(user);
      } 
    }
  } catch (error: any) {
    res.status(500).json(error);
  }
});

router.post('/validate', async (req, res) => {
  try {
    const { email, password } = req.body;
    const findByEmail = await findByEmailController(email);
    if (findByEmail && findByEmail.email === email) {
      throw new Error('User with this email already exists.');
    }
    const verifyUser = zod.object({
      email: zod.string().email({message: "Must be valid email."}),
      password: zod.string().min(8, {message:"Password must be 8 characters long."})
    })
    verifyUser.parse({email, password});
    return res.status(200).json({ message: 'valid data' });
  } catch (error: any) {
    if (error instanceof ZodError){
      const {fieldErrors} = error.flatten();
      const {email, password} = fieldErrors;
      const emailMessage = email ? email[0]+'\n' : '';
      const passwordMessage = password ? password[0] : '';
      
      return res.status(500).json( {message: `${emailMessage}${passwordMessage}`})
    }
    console.log(error.message,"ERRR");
    
    res.status(500).json({message: error.message});
  }
});

router.post('/register', async (req, res) => {
  const { email, password, userName, phoneNumber } = req.body;
  const hashedPassword = await bcrypt.hash(password, 2);
  const REGISTER_DISCOUNT_ID = 2;
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

  return res.status(200).json( token );
});

export default router;
