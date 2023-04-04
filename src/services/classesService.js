import * as classesRepository from '../repositories/classesRepository';
import * as coursesRepository from '../repositories/coursesRepository';

export async function findClassesByCourseName(courseName) {
  const classesPromise = classesRepository.findClassesByCourseName(courseName);

  const prerequisitesPromise = coursesRepository.getCoursePrerequisites(courseName);
  //TODO verificar se prerequisitos existem mesmo? ele retorna [] se nao existir

  const [classes, prerequisites] = await Promise.all([classesPromise, prerequisitesPromise]);

  const sortedObj = buildClassesWithPrerequisitesObject(classes, prerequisites);
  return sortedObj;
}

function buildClassesWithPrerequisitesObject(classes, prerequisites) {
  const classesMap = new Map(
    classes.map((c) => [
      c.codigo_disciplina,
      {
        ...c,
        pre_requisitos: [],
        pos_requisitos: [],
      },
    ])
  );

  for (const { codigo_disciplina, codigo_prerequisito } of prerequisites) {
    const classInfo = classesMap.get(codigo_disciplina);
    const prereqInfo = classesMap.get(codigo_prerequisito);

    classInfo.pre_requisitos.push(codigo_prerequisito);
    prereqInfo.pos_requisitos.push(codigo_disciplina);
  }

  const sortedResult = Array.from(classesMap.values()).sort((a, b) => a.semestre - b.semestre);
  return sortedResult;
}
