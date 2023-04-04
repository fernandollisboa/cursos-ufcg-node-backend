import httpStatusCode from '../enum/httpStatusCode';
import * as classesServices from '../services/classesService';

export async function getClassesByCourse(req, res, next) {
  const { courseName } = req.params;
  // TODO validar cursoname
  // TODO validar disciplina?
  try {
    const classes = await classesServices.findClassesByCourseName(courseName);

    return res.status(httpStatusCode.OK).json(classes);
  } catch (err) {
    next(err);
  }
}
