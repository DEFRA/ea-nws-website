export default function FloodMessageTypes({ message }) {
  return (
    <>
      <p className='govuk-!-font-weight-bold'>{message}</p>
      <table className='govuk-table'>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <th
              scope='row'
              style={{ borderBottom: 'none', paddingBottom: '0' }}
              className='govuk-table__header'
            >
              <div className='org-flood-warning-square warning-square govuk-!-margin-right-4 left' />
              <p>Severe flood warning</p>
            </th>
            <td
              style={{ borderBottom: 'none', paddingBottom: '0' }}
              className='govuk-table__cell'
            >
              <p style={{ color: '#505a5f', fontSize: '16px' }}>
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
              <div className='org-flood-warning-square govuk-!-margin-right-4 left' />
              <p>Flood warnings</p>
            </th>
            <td
              style={{ borderBottom: 'none', paddingTop: '0' }}
              className='govuk-table__cell'
            >
              <p style={{ color: '#505a5f', fontSize: '16px' }}>
                Flooding expected - act now
              </p>
            </td>
          </tr>

          <tr className='govuk-table__row'>
            <th
              scope='row'
              style={{ borderBottom: 'none', paddingBottom: '0' }}
              className='govuk-table__header'
            >
              <div className='org-flood-warning-square alert-square govuk-!-margin-right-4 left' />
              <p>Flood warnings</p>
            </th>
            <td style={{ borderBottom: 'none' }} className='govuk-table__cell'>
              <p style={{ color: '#505a5f', fontSize: '16px' }}>
                Be prepared - flooding possible
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
