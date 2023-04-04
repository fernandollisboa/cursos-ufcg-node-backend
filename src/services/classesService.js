import * as classesRepository from '../repositories/classesRepository';
import * as coursesRepository from '../repositories/coursesRepository';

export async function findClassesByCourseName(courseName) {
  const classes = await classesRepository.findClassesByCourseName(courseName);

  const prerequisites = await coursesRepository.getCoursePrerequisites(courseName);
  //TODO verificar se prerequisitos existem mesmo? ele retorna [] se nao existir

  const sortedObj = buildClassesPrerequisitesObject(classes, prerequisites);
  return sortedObj;
}

function buildClassesPrerequisitesObject(classes, prerequisites) {
  const classesMap = classes.map((c) => ({
    [c.codigo_disciplina]: {
      ...c,
      pre_requisitos: [],
      pos_requisitos: [],
    },
  }));

  prerequisites.forEach(({ codigo_disciplina, codigo_prerequisito }) => {
    const classInfo = classesMap[codigo_disciplina];
    const prereqInfo = classesMap[codigo_prerequisito];

    classInfo['pre_requisitos'].push(codigo_prerequisito);
    prereqInfo['pos_requisitos'].push(codigo_disciplina);
  });

  const sortedResult = Array.from(classesMap.values()).sort((a, b) => a.semestre - b.semestre);
  return sortedResult;
}
