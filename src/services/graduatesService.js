import * as graduatesRepository from '../repositories/graduatesRepository';

export async function getAllCourseGraduates({ courseSchemaName }) {
  return graduatesRepository.findByCourseName(courseSchemaName);
}
