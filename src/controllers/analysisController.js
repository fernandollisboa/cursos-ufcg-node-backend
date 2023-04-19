import httpStatusCode from '../enum/httpStatusCode';
import * as analysisService from '../services/analysisService';

export async function getCourseAnalysis(req, res, next) {
  const {
    params: { courseName },
    query: { historico, escolhas },
  } = req;

  try {
    const academicTranscript = JSON.parse(historico);
    console.log(academicTranscript);
    const classesChosen = JSON.parse(escolhas);
    console.log(classesChosen);

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
