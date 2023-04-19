import { getCourseRecommendations } from '../services/coursesService';
import httpStatusCode from '../enum/httpStatusCode';

export async function getRecommendations(req, res, next) {
  const { courseName } = req.params;
  const { escolhas, historico, nao_cursei } = req.query;

  try {
    const recommendations = await getCourseRecommendations(
      courseName,
      historico,
      escolhas,
      nao_cursei
    );
    return res.status(httpStatusCode.OK).json({ disciplinas: recommendations });
  } catch (err) {
    next(err);
  }
}
