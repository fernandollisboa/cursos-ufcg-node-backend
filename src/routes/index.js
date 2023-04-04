import { Router } from 'express';
import errorMiddleware from '../middlewares/errorMiddleware';
import coursesRouter from './coursesRouter';
import { getAllNewCourses } from '../controllers/coursesController';

const router = Router();

router.get('/cursos_2015', getAllNewCourses);
router.use('/', coursesRouter);

router.use(errorMiddleware);

export default router;
