import * as coursesRepository from '../repositories/coursesRepository';
import openCpu from '../utils/openCpu';

export async function findAllNewCourses() {
  return coursesRepository.findAllNewCourses();
}

export async function getNewCourse(courseName) {
  return coursesRepository.getNewCourse(courseName);
}

export async function verifyCourseExists(courseName) {
  const course = { name: courseName };
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
  const correlations = await openCpu('precor', 'calcula_correlacao/json', param); //TODO criar uma funcao pra R
  const courses = [];
  const correlacoes = [];

  function createCorrelationsPrerequisitesIndex() {
    const courseIndexMap = new Map();
    let courseIndexCount = 0;

    return (course) => {
      const { nome: courseName, periodo: semester } = course;

      if (!courseIndexMap.has(courseName)) {
        courses.push({ nome: courseName, periodo: semester });
        courseIndexMap.set(courseName, courseIndexCount);
        courseIndexCount++;
      }

      return courseIndexMap.get(courseName);
    };
  }

  function buildPrerequisitesObjectFromCorrelations(correlations) {
    const getFromIndex = createCorrelationsPrerequisitesIndex();

    for (const relation of correlations) {
      const { disciplina_A, semestre_A, disciplina_B, semestre_B } = relation;

      const disciplinaA = { nome: disciplina_A, periodo: semestre_A };
      const disciplinaB = { nome: disciplina_B, periodo: semestre_B };

      correlacoes.push({
        source: getFromIndex(disciplinaA),
        target: getFromIndex(disciplinaB),
        valor: relation.correlacao,
      });
    }
  }

  buildPrerequisitesObjectFromCorrelations(correlations);

  return { disciplinas: courses, correlacoes: correlacoes }; //TODO isso deveria ta em portugues so no controller
}

export async function getCourseRecommendations(courseName, academicTranscript, choices, notTaken) {
  const { maxSemester } = await coursesRepository.getMaxCourseSemesterFindByClassesIds(courseName, [
    ...academicTranscript,
    ...choices,
  ]);

  const historico = academicTranscript.join(',');
  const disciplinas = [...choices, ...notTaken].join(',');

  const param = {
    historico_: `c(${historico})`,
    disciplinas: `c(${disciplinas})`,
    course_name: `"${courseName}"`,
    p: Number(maxSemester).toPrecision(3),
  };

  const data = await openCpu('recomendacao', 'recomenda/json', param); //TODO

  return data;
}
