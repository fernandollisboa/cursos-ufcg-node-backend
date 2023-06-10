import * as statisticsRepository from '../repositories/statisticsRepository.js';

export async function getStatisticsByCourseName(courseSchemaName) {
  return statisticsRepository.getByCourseName(courseSchemaName);
}
