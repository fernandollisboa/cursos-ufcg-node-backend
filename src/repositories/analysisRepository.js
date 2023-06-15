import { client } from '../databases';
import { buildQuery } from '../databases/queryBuilder';

export async function getCourseCompletionPercentageByAcademicTranscript({
  courseSchemaName,
  academicTranscript,
}) {
  const command = `
    SELECT COUNT(*) AS qtd_disciplinas 
    FROM ${courseSchemaName}.disciplinas AS disc 
    WHERE disc.tipo IN ('Obrigatoria', 'Complementar')`;

  const queryString = buildQuery({ command });
  const { rows } = await client.query({ queryString });

  const { qtd_disciplinas: classesTotalCount } = rows[0];

  const percentageCompleted = academicTranscript.length / classesTotalCount;
  return parseFloat(percentageCompleted); // TODO sera que precisa desse parseFLoat mermo?
}

export async function getEnrollmentFrequency({ courseSchemaName, classesChosen }) {
  const classesChosenSorted = classesChosen.sort();
  const classesChosenList = `${classesChosenSorted.toString()}`; //TODO mudar isso aquê

  const command = `
    SELECT COUNT(*) AS frequency FROM (
      SELECT
        h.matricula,
        h.periodo,
        GROUP_CONCAT(h.codigo_disciplina ORDER BY h.codigo_disciplina ASC SEPARATOR ",") AS set_disc
        from ${courseSchemaName}.historico h,${courseSchemaName}.disciplinas d 
        WHERE d.codigo_disciplina = h.codigo_disciplina AND d.tipo IN ("Complementar" , "Obrigatoria") 
        GROUP by h.matricula, h.periodo
      ) AS tabela 
    WHERE tabela.set_disc = "${classesChosenList}" 
    GROUP BY tabela.set_disc 
    ORDER BY frequency
  `;
  const queryString = buildQuery({ command });

  const { frequency } = await client.query({ queryString, singleRow: true });

  return frequency ? frequency : 0;
}

// TODO isso ta feio d+++ e deveria nao estar aqui em repository e sim um R services
