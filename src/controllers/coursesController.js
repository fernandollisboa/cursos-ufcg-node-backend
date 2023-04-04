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

  try {
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

export async function getCourseSuccessRateMaxAndMinSemester(req, res, next) {
  const { courseName } = req.params;
  try {
    const successRateMaxAndMinSemester = await coursesService.getCourseSuccessRateMaxAndMinSemester(
      courseName
    );
    return res.status(httpStatusCode.OK).send({ semestres: successRateMaxAndMinSemester });
  } catch (err) {
    next(err);
  }
}

export async function getCourseCorrelations(req, res, next) {
  const { courseName } = req.params;
  try {
    const courseCorrelations = await coursesService.getCourseCorrelations(courseName);
  } catch (err) {
    next(err);
  }
}
