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
                <th scope='row' class='govuk-table__header'>
                  Severe flood warnings
                </th>
                <td class='govuk-table__cell'>✅ Always included</td>
              </tr>
            </tbody>
            )
          : null}
      </table>
    </>
  )
}
