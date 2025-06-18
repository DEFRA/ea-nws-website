export default function FloodMessageTypes({ message }) {
  return (
    <>
      <p
        style={{ fontSize: '1rem', whiteSpace: 'nowrap' }}
        className='govuk-!-margin-bottom-1 govuk-!-font-weight-bold'
      >
        {message}
      </p>
      <table className='govuk-table'>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <th
              scope='row'
              style={{ borderBottom: 'none', paddingBottom: '0' }}
              className='govuk-table__header flood-types-row-header'
            >
              <div
                style={{ width: '1rem', height: '1rem' }}
                className='org-flood-warning-square warning-square govuk-!-margin-right-4 left'
              />
              <p
                style={{ whiteSpace: 'nowrap' }}
                className='govuk-!-margin-bottom-1 flood-types'
              >
                Severe flood warnings
              </p>
            </th>
            <td
              style={{ borderBottom: 'none', paddingBottom: '0' }}
              className='govuk-table__cell'
            >
              <p
                className='govuk-!-margin-bottom-1 flood-types'
                style={{ color: '#505a5f' }}
              >
                Danger to life - act now
              </p>
            </td>
          </tr>

          <tr className='govuk-table__row'>
            <th
              scope='row'
              style={{ borderBottom: 'none', paddingTop: '0' }}
              className='govuk-table__header'
            >
              <div
                style={{ width: '1rem', height: '1rem' }}
                className='org-flood-warning-square govuk-!-margin-right-4 left'
              />
              <p className='flood-types'>Flood warnings</p>
            </th>
            <td
              style={{ borderBottom: 'none', paddingTop: '0' }}
              className='govuk-table__cell'
            >
              <p className='flood-types' style={{ color: '#505a5f' }}>
                Flooding expected - act now
              </p>
            </td>
          </tr>

          <tr className='govuk-table__row'>
            <th
              scope='row'
              style={{ borderBottom: 'none', paddingBottom: '0' }}
              className='govuk-table__header govuk-!-padding-top-0'
            >
              <div
                style={{ width: '1rem', height: '1rem' }}
                className='org-flood-warning-square alert-square govuk-!-margin-right-4 left'
              />
              <p className='flood-types'>Flood alerts</p>
            </th>
            <td
              style={{ borderBottom: 'none' }}
              className='govuk-table__cell govuk-!-padding-top-0'
            >
              <p className='flood-types' style={{ color: '#505a5f' }}>
                Be prepared - flooding possible
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
