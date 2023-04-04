import * as coursesRepository from '../repositories/coursesRepository';

export async function findAllNewCourses() {
  return coursesRepository.findAllNewCourses();
}

export async function getNewCourse(courseName) {
  return coursesRepository.getNewCourse(courseName);
}

export async function verifyCourseExists(course) {
  return coursesRepository.verifyCourseExists(course);
}

export async function getSuccessRate(courseName) {
  return coursesRepository.getSuccessRateByCourseName(courseName);
}
