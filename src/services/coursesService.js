import * as coursesRepository from '../repositories/coursesRepository';

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

export async function getCourseCorrelations(courseName) {}

// async function correlacao(curso) {
//   const param = {
//   periodo_inicial: 0.1,
//   periodo_final: 3000.2,
//   schema: "${curso}",
//   };

//   const data = await open_cpu('precor', 'calcula_correlacao/json', param).json();

//   const disciplinas = [];
//   const correlacoes = [];

//   const index = {};
//   index[...] = 0;

//   function register(d) {
//   disciplinas.push(d);
//   index[d.nome] = index[...];
//   index[...] += 1;
//   }

//   function get_indice(d) {
//   if (!disciplinas.includes(d)) {
//   register(d);
//   }
//   return index[d.nome];
//   }
//   for (const relation of data) {
//   const disciplina_A = { nome: relation.disciplina_A, periodo: relation.semestre_A };
//   const disciplina_B = { nome: relation.disciplina_B, periodo: relation.semestre_B };
//   correlacoes.push({
//   source: get_indice(disciplina_A),
//   target: get_indice(disciplina_B),
//   valor: relation.correlacao,
//   });
//   }

//   return { disciplinas, correlacoes };
//   }
