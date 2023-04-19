import {
  getCourseCompletionPercentage,
  getEnrollmentFrequency,
  getEnrollmentProbability,
  getClassesFailingRisk,
} from '../repositories/analysisRepository';

export async function getCourseAnalysis(courseName, academicTranscript, classesChosen) {
  const completionPercentage = await getCourseCompletionPercentage({
    courseSchemaName: courseName,
    academicTranscript,
  });
  const enrollmentFrequency = await getEnrollmentFrequency({
    courseSchemaName: courseName,
    classesChosen,
  });
  const enrollmentProbability = await getEnrollmentProbability({
    courseSchemaName: courseName,
    classesChosen,
    academicTranscript,
  });

  const failingRisk = await getClassesFailingRisk({ courseSchemaName: courseName, classesChosen });

  return {
    taxa_complecao: completionPercentage,
    frequencia_matricula: enrollmentFrequency,
    probabilidade_matricula: enrollmentProbability,
    risco_reprovacao: failingRisk,
  };
}
