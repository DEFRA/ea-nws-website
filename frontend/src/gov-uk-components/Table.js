export default function Table ({ caption, tableHeadings, tableRows }) {
  return (
    <>
      <table className="govuk-table">
        <caption className="govuk-table__caption govuk-table__caption--l">
          {caption}
        </caption>
        {tableHeadings ? (
          <thead className="govuk-table__head">
            <tr className="govuk-table__row">
              {tableHeadings.map((heading, index) => (
                <th key={index} scope="col" className="govuk-table__header">
                  {heading.title}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        {tableRows ? (
          <tbody className="govuk-table__body">
            <tr className="govuk-table__row">
              {tableRows.map((row, index) => (
                <td key={index} scope="col" className="govuk-table__cell">
                  {row.text}
                </td>
              ))}
            </tr>
          </tbody>
        ) : null}
      </table>
    </>
  )
}
