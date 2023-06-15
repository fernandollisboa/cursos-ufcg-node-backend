import { client } from '../databases';
import { buildQuery } from '../databases/queryBuilder';
import { DB_DEFAULT_SCHEMA } from '../setup';

export async function getAllClassesByCourseName(courseName) {
  const command = `SELECT # FROM ${courseName}.disciplinas`;
  const columns = [
    'codigo_disciplina',
    'disciplina',
    'tipo',
    'codigo_departamento',
    'semestre',
    'horas',
    'creditos',
  ];
  const queryString = buildQuery({ command, columns });
  const { rows } = await client.query({ queryString });
  return rows;
}

export async function getDistinctClassesCodesByCourseCode(courseCode) {
  const command = `SELECT DISTINCT(codigo_disciplina) FROM ${DB_DEFAULT_SCHEMA}.disciplinas WHERE codigo_curso = ${courseCode}`;

  const { rows } = await client.query({ queryString: command });
  return rows;
}
