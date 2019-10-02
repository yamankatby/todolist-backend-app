import { Router } from 'express';
import { login, profile, register } from './controllers';
import { authorization } from '../config/utilities';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authorization, profile);

export default router;
