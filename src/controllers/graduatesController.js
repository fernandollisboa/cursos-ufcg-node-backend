import httpStatusCode from '../enum/httpStatusCode';
import * as graduatesService from '../services/graduatesService';

export async function getCourseGraduatesBySemester(req, res, next) {
  const { courseSchemaName } = req.locals;
  try {
    const graduates = await graduatesService.getAllCourseGraduates({ courseSchemaName });
    return res.status(httpStatusCode.OK).json(graduates);
  } catch (err) {
    next(err);
  }
}
