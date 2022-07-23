export default function Table({ data, cols }) {
  const tableHeaders = (headers) => {
    // console.log(data);
    return (
      <tr>
        {headers.map((td) => (
          <th key={td}>{td}</th>
        ))}
      </tr>
    );
  };
  const tableRows = (headers, rowdata) => {
    return (
      <>
        {rowdata.map((rd) => (
          <tr key={rd[headers[0]]}>
            {headers.map((header) => (
              <td key={header}>{rd[header]}</td>
            ))}
          </tr>
        ))}
      </>
    );
  };

  return (
    <details>
      <summary>Data-Table List</summary>
      <div className="tableDiv">
        <table>
          <thead>{tableHeaders(cols)}</thead>
          <tbody>{tableRows(cols, data)}</tbody>
        </table>
      </div>
    </details>
  );
}
