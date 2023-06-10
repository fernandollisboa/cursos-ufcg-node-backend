import {
  getCourseCompletionPercentageByTranscpript,
  getEnrollmentFrequency,
  getEnrollmentProbability,
  getClassesFailingRisk,
} from '../repositories/analysisRepository';
// TODO mudar para get * from analysisrepositorurueur

export async function getCourseAnalysis(courseSchemaName, academicTranscript, classesChosen) {
  const completionPercentage = await getCourseCompletionPercentageByTranscpript({
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

  const failingRisk = await getClassesFailingRisk({ courseSchemaName, classesChosen });

  return {
    taxa_complecao: completionPercentage,
    frequencia_matricula: enrollmentFrequency,
    risco_reprovacao: failingRisk,
    probabilidade_matricula: enrollmentProbability,
  };
}
