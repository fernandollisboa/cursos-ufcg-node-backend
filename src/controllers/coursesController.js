import * as coursesService from '../services/coursesService';
import httpStatusCode from '../enum/httpStatusCode';

export async function getAllNewCourses(req, res, next) {
  try {
    const courses = await coursesService.findAllNewCourses();
    return res.status(httpStatusCode.OK).json(courses);
  } catch (err) {
    next(err);
  }
}

export async function getCourse(req, res, next) {
  const { courseName } = req.params;

  try {
    const course = await coursesService.getNewCourse(courseName);
    return res.status(httpStatusCode.OK).json(course);
  } catch (err) {
    next(err);
  }
}

export async function getCourseSuccessRate(req, res, next) {
  const { courseName } = req.params;

  try {
    const successRate = await coursesService.getSuccessRate(courseName);
    return res.status(httpStatusCode.OK).json(successRate);
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
    return res.status(httpStatusCode.OK).json(successRateMaxAndMinSemester);
  } catch (err) {
    next(err);
  }
}

export async function getCourseCorrelations(req, res, next) {
  const { courseName } = req.params;
  try {
    const courseCorrelations = await coursesService.getCourseCorrelations(courseName);
    console.log('courseCorrelations', courseCorrelations);

    return res.status(httpStatusCode.OK).json(courseCorrelations);
  } catch (err) {
    next(err);
  }
}
