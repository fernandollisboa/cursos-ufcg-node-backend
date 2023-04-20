export function buildQuery({ command, columns = [], values = [] }) {
  const formattedColumns = formatColumns(columns);

  const queryString = command.replace('#', formattedColumns);

  // for (let i = 0; i < values.length; i++) {
  //   queryString = queryString.replace(`${i + 1}`, `'${values[i]}'`);
  // } // TODO modificar isso para pegar as variaveis do comando e substituir pelos valores

  return queryString;
}

function formatColumns(columns) {
  const quotedColumns = columns.map((col) => `\`${col}\``);
  return quotedColumns.join(', ');
}
