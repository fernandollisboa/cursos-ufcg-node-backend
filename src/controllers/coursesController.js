import * as coursesService from '../services/coursesService';

/* Baseando-se no apiRest.py (o novo) */

export async function getAllNewCourses(req, res) {
	const courses = await coursesService.getAllNewCourses();

	return res.status(200).send({ courses });
}
