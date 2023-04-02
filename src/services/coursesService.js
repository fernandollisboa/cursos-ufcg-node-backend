import { client } from '../database';
import * as coursesRepository from '../repositories/coursesRepository';

export async function getAllNewCourses() {
	return coursesRepository.selectAllNewCourses();
}
