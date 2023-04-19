import { Router } from 'express';
import errorMiddleware from '../middlewares/errorMiddleware.js';
import coursesRouter from './coursesRouter.js';
import { getAllNewCourses } from '../controllers/coursesController.js';

const router = Router();

router.get('/cursos_2015', getAllNewCourses);
router.use('/', coursesRouter);

router.use(errorMiddleware);

export default router;
