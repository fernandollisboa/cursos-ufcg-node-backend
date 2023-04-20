import httpStatusCode from '../enum/httpStatusCode';
import * as analysisService from '../services/analysisService';

export async function getCourseAnalysis(req, res, next) {
  const {
    params: { courseName },
    query: { historico, escolhas },
  } = req;

  try {
    const academicTranscript = JSON.parse(historico);
    const classesChosen = JSON.parse(escolhas);
    // TODO mudar essa abordagem acima para uma mais segura

    const analysis = await analysisService.getCourseAnalysis(
      courseName,
      academicTranscript,
      classesChosen
    );
    return res.status(httpStatusCode.OK).json(analysis);
  } catch (err) {
    next(err);
  }
}
