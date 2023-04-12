import { getCourseRecommendations } from '../services/coursesService';
import httpStatusCode from '../enum/httpStatusCode';

export async function getRecommendations(req, res, next) {
  const { courseName, escolhas, historico, nao_cursei } = req.params;

  try {
    const recommendations = await getCourseRecommendations(
      courseName,
      historico,
      escolhas,
      nao_cursei
    );
    return res.status(httpStatusCode.OK).send({ disciplinas: recommendations });
  } catch (err) {
    next(err);
  }
}
