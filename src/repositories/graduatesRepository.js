import { buildQuery } from '../databases/queryBuilder';
import { client } from '../databases';

export async function findByCourseName(courseSchemaName) {
  const command = `
    SELECT table_a.periodo, ingressos, IFNULL(formandos, 0) formandos 
    FROM (
      SELECT periodo_ingressao AS periodo, 
      COUNT(id_aluno) AS ingressos 
      FROM ${courseSchemaName}.alunos 
      GROUP BY periodo_ingressao
    ) AS table_a 
    LEFT JOIN (
      SELECT periodo_ingressao periodo, COUNT(id_aluno) formandos 
      FROM ${courseSchemaName}.alunos 
      where codigo_evasao IN (1, 20) 
      GROUP BY periodo_ingressao
    ) AS table_b
    ON table_a.periodo = table_b.periodo`;
  const columns = ['periodo', 'ingressos', 'formandos'];

  const queryString = buildQuery({ command, columns });

  const { rows } = await client.query({ queryString });
  return rows;
}
