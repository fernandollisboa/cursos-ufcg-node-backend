import {
  getCourseCompletionPercentageByAcademicTranscript,
  getEnrollmentFrequency,
} from '../repositories/analysisRepository';
import { getEnrollmentProbability, getClassesFailureRisk } from './openCpuService';

export async function getCourseAnalysis(courseSchemaName, academicTranscript, classesChosen) {
  const completionPercentage = await getCourseCompletionPercentageByAcademicTranscript({
    courseSchemaName,
    academicTranscript,
  });

  const enrollmentFrequency = await getEnrollmentFrequency({
    courseSchemaName,
    classesChosen,
  });

  const enrollmentProbability = await getEnrollmentProbability({
    courseSchemaName,
    classesChosen,
    academicTranscript,
  });

  const failingRisk = await getClassesFailureRisk({
    courseSchemaName,
    classesChosen,
  });

  return {
    taxa_complecao: completionPercentage,
    frequencia_matricula: enrollmentFrequency,
    risco_reprovacao: failingRisk,
    probabilidade_matricula: enrollmentProbability,
  };
}
