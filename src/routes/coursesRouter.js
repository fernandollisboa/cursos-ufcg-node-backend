import { Router } from 'express';
import {
  getCourse,
  getCourseSuccessRate,
  getCourseSuccessRateMaxAndMinSemester,
  getCourseCorrelations,
} from '../controllers/coursesController';
import { getClassesByCourse } from '../controllers/classesController';
import { verifyCourseExists, validateCourseName } from '../middlewares/coursesMiddleware';

const coursesRouter = Router();

const validateAndVerifyCourse = [validateCourseName, verifyCourseExists];
coursesRouter.use('/:courseName', validateAndVerifyCourse);

coursesRouter.get('/:courseName', getCourse);
coursesRouter.get('/:courseName/disciplinas', getClassesByCourse);
coursesRouter.get('/:courseName/taxa-sucesso', getCourseSuccessRate);
coursesRouter.get('/:courseName/taxa-sucesso/periodos', getCourseSuccessRateMaxAndMinSemester);
coursesRouter.get('/:courseName/correlacao', getCourseCorrelations);
export default coursesRouter;
