import * as graduatesRepository from '../repositories/graduatesRepository';

export async function getAllGraduatesByCourse({ courseSchemaName }) {
  return graduatesRepository.findByCourseName(courseSchemaName);
}
