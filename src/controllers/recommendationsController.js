import { getCourseRecommendations } from '../services/coursesService';
import httpStatusCode from '../enum/httpStatusCode';

export async function getRecommendations(req, res, next) {
  const { courseName } = req.params;
  const { disciplinas, historico, nao_cursei } = req.query;

  try {
    const disciplinasParsed = JSON.parse(disciplinas);
    const historicoParsed = JSON.parse(historico);
    const naoCurseiParsed = JSON.parse(nao_cursei);
    //TODO mudar pra uma abordagem mais segura
    const recommendations = await getCourseRecommendations(
      courseName,
      historicoParsed,
      disciplinasParsed,
      naoCurseiParsed
    );
    return res.status(httpStatusCode.OK).json({ disciplinas: recommendations });
  } catch (err) {
    next(err);
  }
}
