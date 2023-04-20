import httpStatusCode from '../enum/httpStatusCode';
import * as classesServices from '../services/classesService';

export async function getClassesByCourse(req, res, next) {
  const { courseSchemaName } = req.locals;
  try {
    const classes = await classesServices.findClassesByCourseName(courseSchemaName);

    return res.status(httpStatusCode.OK).json(classes);
  } catch (err) {
    next(err);
  }
}
