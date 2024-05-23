export default function Table({ caption, tableHeadings, tableRows }) {
  return (
    <>
      <table classNameName="govuk-table">
        <caption classNameName="govuk-table__caption govuk-table__caption--l">
          {caption}
        </caption>
        {tableHeadings ? (
          <thead classNameName="govuk-table__head">
            <tr classNameName="govuk-table__row">
              {tableHeadings.map((heading, index) => (
                <th key={index} scope="col" classNameName="govuk-table__header">
                  {heading.title}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        {tableRows ? (
          <tbody classNameName="govuk-table__body">
            <tr classNameName="govuk-table__row">
              {tableRows.map((row, index) => (
                <td key={index} scope="col" classNameName="govuk-table__cell">
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
