const DataTable = ({ title, columns, rows }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-700">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column.header} className="px-4 py-3 font-medium uppercase tracking-wide">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-6 text-center text-slate-500">
                  No hay registros disponibles.
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                  {columns.map((column) => (
                    <td key={column.header} className="px-4 py-4 align-top">
                      {column.render ? column.render(row) : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable
