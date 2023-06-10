import httpStatusCode from '../enum/httpStatusCode';
import * as statisticsService from '../services/statisticsService.js';

export async function getStatisticsByCourse(req, res, next) {
  const { courseSchemaName } = req.locals;
  try {
    const statistics = await statisticsService.getStatisticsByCourseName(courseSchemaName);
    return res.status(httpStatusCode.OK).json(statistics);
  } catch (err) {
    next(err);
  }
}
