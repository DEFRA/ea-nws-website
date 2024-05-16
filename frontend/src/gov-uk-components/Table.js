export default function Table ({ caption, tableHeadings, tableRows }) {
  return (
    <>
      <table class='govuk-table'>
        <caption class='govuk-table__caption govuk-table__caption--l'>
          {caption}
        </caption>
        {tableHeadings
          ? (
            <thead class='govuk-table__head'>
              <tr class='govuk-table__row'>
                {tableHeadings.map((heading, index) => (
                  <th key={index} scope='col' class='govuk-table__header'>
                    {heading.title}
                  </th>
                ))}
              </tr>
            </thead>
            )
          : null}
        {tableRows
          ? (
            <tbody class='govuk-table__body'>
              <tr class='govuk-table__row'>
                {tableRows.map((row, index) => (
                  <td key={index} scope='col' class='govuk-table__cell'>
                    {row.text}
                  </td>
                ))}
              </tr>
            </tbody>
            )
          : null}
      </table>
    </>
  )
}
