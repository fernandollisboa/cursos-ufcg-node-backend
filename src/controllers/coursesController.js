import * as coursesService from '../services/coursesService';
import CourseNotFoundError from '../errors/CourseNotFoundError';
import httpStatusCode from '../enum/httpStatusCode';

/* Baseando-se no apiRest.py (o novo) */

export async function getAllNewCourses(req, res, next) {
  try {
    const courses = await coursesService.findAllNewCourses();

    return res.status(httpStatusCode.OK).send({ disciplinas: courses });
  } catch (err) {
    next(err);
  }
}

export async function getCourse(req, res, next) {
  const { courseName } = req.params;
  const { isOld } = req.query;

  console.log({ isOld });
  try {
    await verifyCourseExists({ name: courseName, isOld });
    const course = await coursesService.getNewCourse(courseName);

    return res.status(httpStatusCode.OK).send({ disciplina: course });
  } catch (err) {
    next(err);
  }
}

export async function getCourseSuccessRate(req, res, next) {
  const { courseName } = req.params;
  try {
    const successRate = await coursesService.getSuccessRate(courseName);
    return res.status(httpStatusCode.OK).send({ taxa_de_sucesso: successRate });
  } catch (err) {
    next(err);
  }
}

// TODO isso aqui embaixo pode virar um router middleware facin
async function verifyCourseExists({ name, isOld = false }) {
  console.log({ name, isOld });
  const regex = new RegExp(/^[a-z_]*$/); // TODO isso é trabalho de router

  if (!regex.test(name)) throw new CourseNotFoundError('name', name);

  const doesCourseExists = await coursesService.verifyCourseExists({ name, isOld });
  if (!doesCourseExists) throw new CourseNotFoundError('name', name);
}
