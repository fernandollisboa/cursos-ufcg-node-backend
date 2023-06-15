import axios, { HttpStatusCode } from 'axios';
import { OPENCPU_SERVER, OPENCPU_PORT } from '../setup';
import {
  getMaxCourseSemesterFindByClassesIds,
  getCourseCodeByCourseName,
  getCourseHistoricalAverageByCourseName,
  getCourseHistoricalAverageFromClassesCodesByCourseName,
} from '../repositories/coursesRepository';
import { getDistinctClassesCodesByCourseCode } from '../repositories/classesRepository';
import DatabaseError from '../errors/DatabaseError';

export async function openCpu(_package, method, params) {
  const url = `${OPENCPU_SERVER}:${OPENCPU_PORT}/ocpu/library/${_package}/R/${method}`;

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'max-age=86400',
    },
  };
  try {
    const response = await axios.post(url, params, config);
    return response.data;
  } catch (err) {
    console.err(err);
    throw new DatabaseError(1, 'Error connecting to OpenCpu', HttpStatusCode.InternalServerError);
  }
}

export async function getEnrollmentProbability({
  courseSchemaName,
  classesChosen,
  academicTranscript,
}) {
  const validCoursesSchemas = ['engenharia_eletrica_cg', 'ciencia_da_computacao_d_cg'];
  if (!validCoursesSchemas.includes(courseSchemaName)) {
    return null;
  }

  const { maxSemester } = await getMaxCourseSemesterFindByClassesIds(
    courseSchemaName,
    classesChosen
  );

  const _package = 'redes';
  const method = 'pegar_prob_da_rede/print';
  const params = {
    historico_: `c(${academicTranscript.toString()})`,
    matricula_atual_: `c(${classesChosen.toString()})`,
    course_name: `"${courseSchemaName}"`,
    p: maxSemester,
  };

  const reponse = openCpu(_package, method, params);

  return parseFloat(reponse.split(' ')[1]);
}

export async function getClassesFailureRisk({ courseSchemaName, classesChosen }) {
  const courseCode = await getCourseCodeByCourseName(courseSchemaName);
  const distinctClasses = await getDistinctClassesCodesByCourseCode(courseCode);
  const courseAverage = await getCourseHistoricalAverageByCourseName(courseSchemaName);
  const historicalAverageSet = await getCourseHistoricalAverageFromClassesCodesByCourseName(
    classesChosen,
    courseSchemaName
  );

  const classesCodes = distinctClasses.map(({ codigo_disciplina }) => codigo_disciplina);
  const names = [...classesCodes, 'n_disc', 'media_set', 'cra'].join(',');
  const values = [
    ...classesCodes.map((d) => (classesChosen.includes(d) ? 'TRUE' : 'FALSE')),
    classesChosen.length, // n_disc
    historicalAverageSet, // media_set
    courseAverage, //cra
  ].join(',');

  const _package = 'termometro';
  const method = 'make_prediction/json';
  const params = {
    names: `"${names}"`,
    values: `"${values}"`,
    course_name: `"${courseSchemaName}"`,
  };

  const response = await openCpu(_package, method, params);

  return response[0];
}

export async function getCourseCorrelations(courseName) {
  const MIN_SEMESTER = 0.1;
  const MAX_SEMESTER = 3000.2;
  const params = {
    periodo_inicial: MIN_SEMESTER,
    periodo_final: MAX_SEMESTER,
    schema: `"${courseName}"`,
  };
  const _package = 'precor';
  const method = 'calcula_correlacao/json';
  const correlations = await openCpu(_package, method, params);

  const courses = [];
  const correlationsWithPrereq = [];
  function createCorrelationsPrerequisitesIndex() {
    const courseIndexMap = new Map();
    let courseIndexCount = 0;

    return (course) => {
      const { nome: courseName, periodo: semester } = course;

      if (!courseIndexMap.has(courseName)) {
        courses.push({ nome: courseName, periodo: semester });
        courseIndexMap.set(courseName, courseIndexCount);
        courseIndexCount++;
      }

      return courseIndexMap.get(courseName);
    };
  }

  function buildPrerequisitesObjectFromCorrelations(correlations) {
    const getFromIndex = createCorrelationsPrerequisitesIndex();

    for (const relation of correlations) {
      const { disciplina_A, semestre_A, disciplina_B, semestre_B } = relation;

      const disciplinaA = { nome: disciplina_A, periodo: semestre_A };
      const disciplinaB = { nome: disciplina_B, periodo: semestre_B };

      correlationsWithPrereq.push({
        source: getFromIndex(disciplinaA),
        target: getFromIndex(disciplinaB),
        valor: relation.correlacao,
      });
    }
  }

  buildPrerequisitesObjectFromCorrelations(correlations);

  return { disciplinas: courses, correlacoes: correlationsWithPrereq }; //TODO isso deveria ta em portugues so no controller
}

export async function getCourseRecommendations(courseName, academicTranscript, choices, notTaken) {
  const { maxSemester } = await getMaxCourseSemesterFindByClassesIds(courseName, [
    ...academicTranscript,
    ...choices,
  ]);

  const transcript = academicTranscript.join(',');
  const courses = [...choices, ...notTaken].join(',');

  const params = {
    historico_: `c(${transcript})`,
    disciplinas: `c(${courses})`,
    course_name: `"${courseName}"`,
    p: maxSemester,
  };
  const _package = 'recomendacao';
  const method = 'recomenda/json';

  const data = await openCpu(_package, method, params);

  return data;
}
