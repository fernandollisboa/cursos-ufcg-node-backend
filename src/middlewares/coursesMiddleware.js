import Joi from 'joi';
import httpStatusCode from '../enum/httpStatusCode';
import * as coursesService from '../services/coursesService';
import coursesArray from '../database/mockCoursesArray';

const courseNameSchema = Joi.string()
  .regex(/^[a-z_]*$/)
  .required();

export function validateCourseName(req, res, next) {
  const { courseName } = req.params;

  const validation = courseNameSchema.validate(courseName);
  if (validation.error) {
    return res.status(httpStatusCode.BAD_REQUEST).json({ error: 'Nome de curso inválido' });
  }
  next();
}

export async function verifyCourseExists(req, res, next) {
  const { courseName } = req.params;

  console.log({ courseName });

  const doesCourseExists = coursesArray.includes(courseName);
  // TODO assim que tiver com bd, mudar pra isso
  // => await coursesService.verifyCourseExists({ name: courseName });
  if (!doesCourseExists)
    return res.status(httpStatusCode.NOT_FOUND).json({ message: 'Curso não encontrado' });

  next();
}
