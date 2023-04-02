import { client } from '../database';
import { buildQuery } from '../database/queryBuilder';

export async function selectAllNewCourses() {
	const command = 'select # from preanalytics2015.cursos where disponivel=true';
	const columns = ['schema', 'campus', 'nome_comum'];
	const queryStr = buildQuery({ command, columns });

	const { rows } = await client.query(queryStr);

	return rows;
}
