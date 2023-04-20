import * as statisticsRepository from '../repositories/statisticsRepository.js';

export async function getStatisticsByCourse({ courseSchemaName }) {
  return statisticsRepository.getByCourseName(courseSchemaName);
}
