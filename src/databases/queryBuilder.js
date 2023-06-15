export function buildQuery({ command, columns = [], values = [] }) {
  const formattedColumns = formatColumns(columns);

  const queryString = command.replace('#', formattedColumns);

  return queryString;
}

function formatColumns(columns) {
  const quotedColumns = columns.map((col) => `\`${col}\``);
  return quotedColumns.join(', ');
}
