import { Router } from 'express';
import { getAllNewCourses } from '../controllers/coursesController';

const routes = Router();

routes.get('/cursos', getAllNewCourses);

export default routes;
