import { client } from '../database';
import { buildQuery } from '../database/queryBuilder';
import openCpu from '../utils/openCpu';
import { getMaxCourseSemesterFindByClassesIds } from './coursesRepository';

export async function getCourseCompletionPercentage({ courseSchemaName, academicTranscript }) {
  const command = `
    SELECT COUNT(*) AS qtd_disciplinas 
    FROM ${courseSchemaName}.disciplinas AS disc 
    WHERE disc.tipo IN ('Obrigatoria', 'Complementar')`;
  const queryString = buildQuery({ command });
  const { rows } = await client.query({ queryString });

  const { qtd_disciplinas: classesTotalCount } = rows[0];

  const percentageCompleted = academicTranscript.length / classesTotalCount;
  return percentageCompleted;
}

export async function getEnrollmentFrequency({ courseSchemaName, classesChosen }) {
  const classesChosenSorted = classesChosen.sort();
  const classesChosenList = `${classesChosenSorted.toString()}`;

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

export async function getEnrollmentProbability({
  courseSchemaName,
  classesChosen,
  academicTranscript,
}) {
  // Cursos válidos para o cálculo da probabilidade de matrícula
  const validCoursesSchemas = ['engenharia_eletrica_cg', 'ciencia_da_computacao_d_cg'];
  if (!validCoursesSchemas.includes(courseSchemaName)) {
    return {};
  }
  const { maxSemester } = await getMaxCourseSemesterFindByClassesIds(
    courseSchemaName,
    classesChosen
  );

  return { maxSemester };
  //TODO fazer retornar do cpu
  // const param = {
  //   historico_: `c(${academicTranscript.toString()})`,
  //   matricula_atual_: `c(${classesChosen.toString()})`,
  //   course_name: `"${courseSchemaName}"`,
  //   p: term,
  // };

  // const response = await openCpu('redes', 'pegar_prob_da_rede/print', param);

  // return parseFloat(response.split(' ')[1]);
}

export async function getClassesFailingRisk({ courseSchemaName, classesChosen }) {
  const command1 = `SELECT codigo_curso FROM preanalytics2015.cursos WHERE \`schema\` = '${courseSchemaName}'`;
  const { codigo_curso } = await client.query({ queryString: command1, singleRow: true });

  const command2 = `SELECT DISTINCT(codigo_disciplina) FROM preanalytics2015.disciplinas WHERE codigo_curso = ${codigo_curso}`;
  const { rows: distinctClasses } = await client.query({ queryString: command2 });

  const command3 = `SELECT AVG(media) AS cra FROM ${courseSchemaName}.historico`;
  const { cra } = await client.query({ queryString: command3, singleRow: true });

  // const placeholders = classesChosen.map((_, i) => '$' + (i + 1)).join(',');
  const command4 = `SELECT AVG(media) AS media_set FROM ${courseSchemaName}.historico WHERE codigo_disciplina IN (${classesChosen})`;
  const { media_set } = await client.query({ queryString: command4, singleRow: true });

  const classesCodes = distinctClasses.map(({ codigo_disciplina }) => codigo_disciplina);
  const { length: n_disc } = classesChosen;

  const names = [...classesCodes, 'n_disc', 'media_set', 'cra'].join(',');
  const values = [
    ...classesCodes.map((d) => classesChosen.includes(d)),
    n_disc,
    media_set,
    cra,
  ].join(',');
  const param = { names: names, values: values, course_name: courseSchemaName };

  const RResponse = await openCpu('termometro', 'make_prediction/json', param);
  // return response.json()[0];
  return { codigo_curso, media_set, cra, distinctClasses };
}
