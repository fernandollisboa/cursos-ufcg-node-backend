import httpStatusCode from '../enum/httpStatusCode';
import * as classesServices from '../services/classesService';

export async function getClassesByCourse(req, res, next) {
  const { courseName } = req.params;
  // TODO validar cursoname
  // TODO validar disciplina?

  const classes = await classesServices.findClassesByCourseName(courseName);

  return req.send(httpStatusCode.OK, { disciplinas: classes });
}
