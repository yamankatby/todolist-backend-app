import { Router } from 'express';
import { create, index, remove, toggle } from './controllers';
import { authorization } from '../config/utilities';

const router = Router();

router.get('/', authorization, index);
router.post('/create', authorization, create);
router.post('/toggle', authorization, toggle);
router.post('/remove', authorization, remove);

export default router;
