export function buildQuery({ command, columns }) {
  const formattedColumns = formatColumns(columns);

  const queryString = command.replace('#', formattedColumns);
  return queryString;
}

function formatColumns(columns) {
  const quotedColumns = columns.map((col) => `"${col}"`); // TODO verificar se precisa do escaped (``) no bd
  return quotedColumns.join(', ');
}
