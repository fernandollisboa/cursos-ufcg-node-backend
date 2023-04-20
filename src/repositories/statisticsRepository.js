import { client } from '../database';
import { buildQuery } from '../database/queryBuilder';

export async function getByCourseName(courseSchemaName) {
  const courseFailings = await getCourseFailingsGroupByFailingTypeId(courseSchemaName);
  const courseSuccessRatePercent = (await getCourseSucessRate(courseSchemaName)) * 100;

  const [activeStudentsFailings, graduatedStudentsFailings] = courseFailings;

  return {
    regulares: activeStudentsFailings.quant,
    graduados: graduatedStudentsFailings.quant,
    taxa_de_aprovacao: courseSuccessRatePercent,
  };
}

async function getCourseFailingsGroupByFailingTypeId(courseSchemaName) {
  const command = `
    SELECT codigo_evasao, COUNT(codigo_evasao) AS quant
    FROM ${courseSchemaName}.alunos
    WHERE codigo_evasao IN (0, 1)
    GROUP BY codigo_evasao`;

  const queryString = buildQuery({ command });
  const { rows } = await client.query({ queryString });

  return rows;
}

async function getCourseSucessRate(courseSchemaName) {
  const command = `
      SELECT (SUM(situacao = "Aprovado") / SUM(situacao != "Trancado")) AS taxa_de_aprovacao 
      FROM ${courseSchemaName}.historico`;

  const queryString = buildQuery({ command });
  const { taxa_de_aprovacao: successRate } = await client.query({ queryString, singleRow: true });

  return successRate;
}
