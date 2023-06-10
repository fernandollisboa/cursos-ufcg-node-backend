import * as graduatesRepository from '../repositories/graduatesRepository';

export async function getAllCourseGraduates({ courseSchemaName }) {
  return graduatesRepository.getByCourseName(courseSchemaName);
}
