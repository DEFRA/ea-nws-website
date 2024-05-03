export default function Table() {
  return (
    <>
      <table class="govuk-table">
        <caption class="govuk-table__caption govuk-table__caption--l">
          1 ALL SAINTS HOUSE, THE CAUSEWAY, MARLOW, SL7 2AA
        </caption>
        <tbody class="govuk-table__body">
          <tr class="govuk-table__row">
            <th scope="row" class="govuk-table__header">
              Severe flood warnings
            </th>
            <td class="govuk-table__cell">✅ Always included</td>
          </tr>
          <tr class="govuk-table__row">
            <th scope="row" class="govuk-table__header">
              Flood warnings
            </th>
            <td class="govuk-table__cell">✅ Always included</td>
          </tr>
          <tr class="govuk-table__row">
            <th scope="row" class="govuk-table__header">
              Flood alerts (optional)
            </th>
            <td class="govuk-table__cell">✅ Subscribed</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
