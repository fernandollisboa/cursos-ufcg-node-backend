export function buildQuery({ command, columns, single = false }) {
	const formattedColumns = formatColumns(columns);
	const query = command.replace('#', formattedColumns);
	return query;
	// return makeJson(getRows(command), cols, single);
}

function formatColumns(columns) {
	return columns.map((col) => `\`${col}\``).join(', ');
}
