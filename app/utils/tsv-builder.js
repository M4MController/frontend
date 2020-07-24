export default function(headers, rows) {
  const result = [headers.slice()];
  for (const row of rows) {
    const resultRow = [];
    for (const header of headers) {
      const cell = row[header];
      resultRow.push(typeof cell === 'object' ? JSON.stringify(row[header]) : cell);
    }
    result.push(resultRow);
  }
  return result.map((row) => row.join('\t')).join('\n');
}
