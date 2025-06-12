export default function FloodMessageTypes({ message }) {
  return (
    <>
      <p className='govuk-!-font-weight-bold'>{message}</p>
      <table className='govuk-table'>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <th
              scope='row'
              style={{ borderBottom: 'none' }}
              className='govuk-table__header'
            >
              <div>
                <div className='org-flood-warning-square warning-square left' />
                <div
                  style={{ display: 'inline' }}
                  className='govuk-!-padding-left-4'
                >
                  Severe flood warning
                </div>
              </div>
              <div>
                <div className='org-flood-warning-square left' />
                <div className='govuk-!-padding-left-4 govuk-!-display-inline-block'>
                  <p className='govuk-!-padding-top-2 govuk-!-padding-left-5'>
                    Flood warnings
                  </p>
                </div>
              </div>
            </th>
            <td style={{ borderBottom: 'none' }} className='govuk-table__cell'>
              <p style={{ color: '#505a5f', fontSize: '16px' }}>
                Danger to life - act now
              </p>
              <p style={{ color: '#505a5f', fontSize: '16px' }}>
                Flooding expected - act now
              </p>
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <th
              scope='row'
              style={{ borderBottom: 'none' }}
              className='govuk-table__header'
            >
              <div className='org-flood-warning-square alert-square left' />
              <div className='govuk-!-padding-left-4 govuk-!-display-inline-block'>
                Flood warnings
              </div>
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
