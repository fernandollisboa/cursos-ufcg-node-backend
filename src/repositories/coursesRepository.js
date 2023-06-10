import { client } from '../databases';
import { buildQuery } from '../databases/queryBuilder';

export async function findAllNewCourses() {
  const command = 'SELECT # FROM preanalytics2015.cursos WHERE disponivel IS TRUE';
  const columns = ['schema', 'campus', 'nome_comum'];
  const queryString = buildQuery({ command, columns });

  const { rows } = await client.query({ queryString });
  return rows;
}

export async function getNewCourse(courseSchemaName) {
  // TODO tirar esse nome de schema
  const command = `SELECT # FROM preanalytics2015.cursos AS c WHERE c.schema = '${courseSchemaName}'`;
  const columns = [
    'codigo_curso',
    'curso',
    'nome_comum',
    'campus',
    'codigo_emec',
    'turno',
    'horas',
    'tempo_minimo',
    'vagas_primeira',
    'vagas_segunda',
    'ato_normativo',
  ];
  const queryString = buildQuery({ command, columns });

  const { rows } = await client.query({ queryString });
  return rows.length > 0 ? rows[0] : null;
}

export async function getCoursePrerequisites(courseName) {
  const command = `SELECT # FROM ${courseName}.pre_requisitos`;
  const columns = ['codigo_disciplina', 'codigo_prerequisito'];
  const queryString = buildQuery({ command, columns });

  const { rows } = await client.query({ queryString });
  return rows.length > 0 ? rows : null;
}

export async function getSuccessRateByCourseName(courseName) {
  const command = `SELECT # FROM ${courseName}.aprovacoes`;
  const columns = ['codigo_disciplina', 'aprovados', 'total', 'periodo'];
  const queryString = buildQuery({ command, columns });

  const { rows } = await client.query({ queryString });
  return rows.length > 0 ? rows : [];
}

export async function getCourseSuccessRateMaxAndMinSemester(courseName) {
  const command = `
    SELECT min(periodo) AS min_periodo, max(periodo) AS max_periodo 
    FROM ${courseName}.aprovacoes`;
  const queryString = buildQuery({ command });

  const { rows } = await client.query({ queryString });
  return rows.length > 0 ? rows[0] : null;
}

export async function verifyCourseExists(courseName) {
  const command = `SELECT c.schema FROM preanalytics2015.cursos AS c WHERE c.schema = '${courseName}'`;
  const queryString = buildQuery({ command });

  const { count } = await client.query({ queryString });
  return count > 0;
}

export async function getMaxCourseSemesterFindByClassesIds(courseSchemaName, classIds) {
  // TODO capitalizar
  const command = `select MAX(semestre) AS max_semester from ${courseSchemaName}.disciplinas where codigo_disciplina in (${[
    ...classIds,
  ].join(', ')})`;
  const columns = ['periodo'];
  const queryString = buildQuery({ command, columns });

  const { max_semester } = await client.query({ queryString, singleRow: true });

  return { maxSemester: max_semester };
}

export async function getCourseCode(courseSchemaName) {
  const command = `SELECT codigo_curso FROM preanalytics2015.cursos WHERE schema = $1`;
  const values = [courseSchemaName];
  const columns = ['codigo_curso']; // TODO tirar isso daqui
  const queryString = buildQuery({ command, values });
  const { rows } = await client.query({ queryString });

  return rows[0]['codigo_curso'];
}
