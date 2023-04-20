import * as coursesRepository from '../repositories/coursesRepository';
import openCpu from '../utils/openCpu';

export async function findAllNewCourses() {
  return coursesRepository.findAllNewCourses();
}

export async function getNewCourse(courseName) {
  return coursesRepository.getNewCourse(courseName);
}

export async function verifyCourseExists({ name, isOld = false }) {
  const course = { name, isOld };
  return coursesRepository.verifyCourseExists(course);
}

export async function getSuccessRate(courseName) {
  return coursesRepository.getSuccessRateByCourseName(courseName);
}

export async function getCourseSuccessRateMaxAndMinSemester(courseName) {
  return coursesRepository.getCourseSuccessRateMaxAndMinSemester(courseName);
}

export async function getCourseCorrelations(courseName) {
  const param = { periodo_inicial: 0.1, periodo_final: 3000.2, schema: `"${courseName}"` };
  const data = await openCpu('precor', 'calcula_correlacao/json', param); //TODO

  const disciplinas = [];
  const correlacoes = [];

  function createIndexMap() {
    const indexMap = new Map();
    var indexCount = 0;

    return ({ nome, periodo }) => {
      if (!indexMap.has(nome)) {
        disciplinas.push({ nome, periodo });
        indexMap.set(nome, indexCount);
        indexCount++;
      }
      return indexMap.get(nome);
    };
  }

  const getIndex = createIndexMap();

  for (const relation of data) {
    const disciplinaA = { nome: relation.disciplina_A, periodo: relation.semestre_A };
    const disciplinaB = { nome: relation.disciplina_B, periodo: relation.semestre_B };
    correlacoes.push({
      source: getIndex(disciplinaA),
      target: getIndex(disciplinaB),
      valor: relation.correlacao,
    });
  }

  return { disciplinas, correlacoes };
}

export async function getCourseRecommendations(courseName, academicTranscript, choices, notTaken) {
  const semester = coursesRepository.getMaxCourseSemesterFindByClassesIds(courseName, [
    ...academicTranscript,
    ...choices,
  ]);

  const param = {
    historico_: `c(${academicTranscript.join(',')})`,
    disciplinas: `c(${[...choices, ...notTaken].join(',')})`,
    course_name: `"${courseName}"`,
    p: semester,
  };

  const data = await openCpu('recomendacao', 'recomenda/json', param).json(); //TODO

  return data;
}
