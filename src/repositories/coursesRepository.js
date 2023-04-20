import { client } from '../database';
import { buildQuery } from '../database/queryBuilder';

export async function findAllNewCourses() {
  const command = 'SELECT # FROM preanalytics2015.cursos WHERE disponivel=true'; // TODO checar no banco se pode trocar para disponivel IS TRUE
  const columns = ['schema', 'campus', 'nome_comum'];
  const queryString = buildQuery({ command, columns });

  const { rows } = await client.query({ queryString });
  return rows;
}

export async function getNewCourse(courseSchemaName) {
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
  return rows.length > 0 ? rows[0] : null; // TODO mudar pra singleRow
}

export async function getCoursePrerequisites(courseName) {
  const command = `SELECT # FROM ${courseName}.pre_requisitos`;
  const columns = ['codigo_disciplina', 'codigo_prerequisito'];
  const queryString = buildQuery({ command, columns });

  const { rows } = await client.query({ queryString });
  return rows.length > 0 ? rows : []; // TODO lançar errinho se nao achar?
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

  console.log(queryString);
  const { rows } = await client.query({ queryString });
  return rows.length > 0 ? rows[0] : null; // TODO lançar errinho se nao achar?
}

export async function verifyCourseExists(course) {
  const { name: courseName, isOld } = course;
  const command = isOld // TODO remover se nao precisar traduzir o oldApi
    ? `SELECT NomeSchema as schema FROM Curso WHERE NomeSchema = '${courseName}'`
    : `SELECT c.schema FROM preanalytics2015.cursos AS c WHERE c.schema =  '${courseName}'`;
  const queryString = buildQuery({ command });

  const { count } = await client.query({ queryString });
  return count > 0;
}

export async function getMaxCourseSemesterFindByClassesIds(courseSchemaName, classIds) {
  const command = `select MAX(semestre) AS max_semester from ${courseSchemaName}.disciplinas where codigo_disciplina in (${[
    ...classIds,
  ].join(', ')})`;
  const columns = ['periodo'];
  const queryString = buildQuery({ command, columns });

  const { max_semester: maxSemester } = await client.query({ queryString, singleRow: true });

  return { maxSemester };
}

export async function getCourseCode(courseSchemaName) {
  const command = `SELECT codigo_curso FROM preanalytics2015.cursos WHERE schema = $1`;
  const values = [courseSchemaName];
  const columns = ['codigo_curso'];
  const queryString = buildQuery({ command, values });
  const { rows } = await client.query({ queryString });

  console.log(rows, 'rows');
  return rows[0]['codigo_curso'];
}
