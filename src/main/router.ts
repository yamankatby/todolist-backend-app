import { Request, Response, Router } from 'express';

const router = Router();
router.get('/', (request: Request, response: Response) => {
	response.render('index', { title: 'TodoList Backend App' });
});

export default router;
