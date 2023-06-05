import { client } from '../databases';
import { buildQuery } from '../databases/queryBuilder';

export async function findClassesByCourseName(courseName) {
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
