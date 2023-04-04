import { client } from '../database';
import { buildQuery } from '../database/queryBuilder';

export async function findAllNewCourses() {
  const command = 'SELECT # FROM preanalytics2015.cursos WHERE disponivel=true'; // TODO checar no banco se pode trocar para disponivel IS TRUE
  const columns = ['schema', 'campus', 'nome_comum'];
  const queryString = buildQuery({ command, columns });

  const { rows } = await client.query(queryString);
  return rows;
}

export async function getNewCourse(courseName) {
  const command = `SELECT # FROM preanalytics2015.cursos AS c WHERE c.schema = $1`;
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

  const { rows } = await client.query(queryString, [courseName]);
  return rows.length > 0 ? rows[0] : null; // TODO lançar errinho se nao achar?
}

export async function getCoursePrerequisites(courseName) {
  const command = `SELECT # FROM ${courseName}.pre_requisitos`;
  const columns = ['codigo_disciplina', 'codigo_prerequisito'];
  const queryString = buildQuery({ command, columns });

  const { rows } = await client.query(queryString);
  return rows.length > 0 ? rows : []; // TODO lançar errinho se nao achar?
}

export async function getSuccessRateByCourseName(courseName) {
  const command = `SELECT # FROM ${courseName}.aprovacoes`;
  const columns = ['codigo_disciplina', 'aprovados', 'total', 'periodo'];
  const queryString = buildQuery({ command, columns });

  const { rows } = await client.query(queryString);
  return rows.length > 0 ? rows[0] : null; // TODO lançar errinho se nao achar?
}

export async function getCourseSuccessRateMaxAndMinSemester(courseName) {
  const command = `SELECT # FROM ${courseName}.aprovacoes`;
  const columns = ['min_periodo', 'max_periodo'];
  const queryString = buildQuery({ command, columns });

  const { rows } = await client.query(queryString);
  return rows.length > 0 ? rows[0] : null; // TODO lançar errinho se nao achar?
}

export async function verifyCourseExists(course) {
  const { name: courseName, isOld } = course;
  const queryString = isOld
    ? `SELECT * FROM Curso WHERE NomeSchema = $1`
    : `SELECT * FROM preanalytics2015.cursos AS c WHERE c.schema = $1`;

  const { rows } = await client.query(queryString, [courseName]);
  return rows.length > 0;
}
