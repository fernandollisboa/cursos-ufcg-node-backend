import { Router } from 'express';

import { verifyCourseExists, validateCourseName } from '../middlewares/coursesMiddleware';
import validateQueryParams from '../middlewares/validateQueryParams';

import recommendationsRouteSchema from '../schemas/recommendationsRouteSchema';
import analysisRouteSchema from '../schemas/analysisRouteSchema';

import {
  getCourse,
  getCourseSuccessRate,
  getCourseSuccessRateMaxAndMinSemester,
  getCourseCorrelations,
} from '../controllers/coursesController';
import { getClassesByCourse } from '../controllers/classesController';
import { getRecommendations } from '../controllers/recommendationsController';
import { getCourseAnalysis } from '../controllers/analysisController';
import { getCourseGraduatesBySemester } from '../controllers/graduatesController';
import { getStatisticsByCourse } from '../controllers/statisticsController.js';

const coursesRouter = Router();

const validateAndVerifyCourse = [validateCourseName, verifyCourseExists];
coursesRouter.use('/:courseName', validateAndVerifyCourse);

coursesRouter.get('/:courseName', getCourse);
coursesRouter.get('/:courseName/disciplinas', getClassesByCourse);
coursesRouter.get('/:courseName/taxa-sucesso', getCourseSuccessRate);
coursesRouter.get('/:courseName/taxa-sucesso/periodos', getCourseSuccessRateMaxAndMinSemester);
coursesRouter.get('/:courseName/correlacao', getCourseCorrelations);
coursesRouter.get(
  '/:courseName/recomendacao',
  validateQueryParams(recommendationsRouteSchema),
  getRecommendations
);
coursesRouter.get(
  '/:courseName/analise',
  validateQueryParams(analysisRouteSchema),
  getCourseAnalysis
);
coursesRouter.get('/:courseName/formandos', getCourseGraduatesBySemester);
coursesRouter.get('/:courseName/estatisticas', getStatisticsByCourse);

export default coursesRouter;
