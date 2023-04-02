export default function makeJson(rows, cols, single) {
	const table = rows.map((row) => {
		const cell = {};
		for (let i = 0; i < cols.length; i++) {
			cell[cols[i]] = row[i];
		}
		return cell;
	});
	return single ? table[0] : table;
}
