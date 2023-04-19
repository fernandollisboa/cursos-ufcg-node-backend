import httpStatusCode from '../enum/httpStatusCode';
import * as graduatesService from '../services/graduatesService';

export async function getAllGraduatesByCourse(req, res, next) {
  const { courseSchemaName } = req.locals;
  try {
    const graduates = await graduatesService.getAllGraduatesByCourse({ courseSchemaName });
    return res.status(httpStatusCode.OK).json(graduates);
  } catch (err) {
    next(err);
  }
}
