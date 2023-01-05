import { Router } from 'express';
import authCheck from '../middleware/auth.middleware';
import loginHandler from '../handlers/profile/login.handler';
import profileInfoHandler from '../handlers/profile/profileInfo.handler';
import registerValidateHandler from '../handlers/profile/registerValidate.handler';
import registerHandler from '../handlers/profile/register.handler';

const router = Router();

router.post('/login', loginHandler);

router.get('/info', authCheck, profileInfoHandler);

router.post('/validate', registerValidateHandler);

router.post('/register', registerHandler);

export default router;
