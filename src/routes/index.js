import { Router } from 'express';
import {
  getAllNewCourses,
  getCourse,
  getCourseSuccessRate,
} from '../controllers/coursesController';
import { getClassesByCourse } from '../controllers/classesController';
import errorMiddleware from '../middlewares/errorMiddleware';

const routes = Router();

routes.get('/cursos', getAllNewCourses);
routes.get('/cursos/:courseName', getCourse);
routes.get('/cursos/:courseName/disciplinas', getClassesByCourse);
routes.get('/cursos/:courseName/taxa-sucesso', getCourseSuccessRate);

routes.use(errorMiddleware);

export default routes;
