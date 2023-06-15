import * as coursesRepository from '../repositories/coursesRepository';

export async function findAllNewCourses() {
  return coursesRepository.findAllNewCourses();
}

export async function getNewCourse(courseName) {
  return coursesRepository.getNewCourse(courseName);
}

export async function verifyCourseExists(courseName) {
  return coursesRepository.verifyCourseExists(courseName);
}

export async function getSuccessRate(courseName) {
  return coursesRepository.getSuccessRateByCourseName(courseName);
}

export async function getCourseSuccessRateMaxAndMinSemester(courseName) {
  return coursesRepository.getCourseSuccessRateMaxAndMinSemester(courseName);
}
