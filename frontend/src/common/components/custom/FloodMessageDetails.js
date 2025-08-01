import floodAlertIcon from '../../assets/images/flood_alert.svg'
import floodWarningIcon from '../../assets/images/flood_warning.svg'
import floodSevereWarningIcon from '../../assets/images/severe_flood_warning.svg'

export default function FloodMessageDetails() {
  return (
    <>
      <table className='govuk-table desktop-table'>
        <thead className='govuk-table__head'>
          <tr className='govuk-table__row'>
            <th
              scope='col'
              className='govuk-table__header govuk-!-width-one-third'
            >
              Type of flood message
            </th>
            <th
              scope='col'
              className='govuk-table__header govuk-!-width-one-third'
            >
              What it means
            </th>
            <th
              scope='col'
              className='govuk-table__header govuk-!-width-one-third'
            >
              What's at risk?
            </th>
          </tr>
        </thead>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>
              <div>
                <img
                  src={floodSevereWarningIcon}
                  alt='Severe flood warning Icon'
                  style={{ float: 'left', height: '33px', width: '33px' }}
                  className='govuk-!-margin-right-6'
                />
                <p>Severe flood warnings</p>
              </div>
            </th>
            <td className='govuk-table__cell'>Danger to life - act now</td>
            <td className='govuk-table__cell'>
              Risk of severe flooding and major disruption. There could be
              danger to life and property and you’ll need to act immediately.
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>
              <div>
                <img
                  src={floodWarningIcon}
                  alt='Flood warning Icon'
                  style={{ float: 'left', height: '33px', width: '33px' }}
                  className='govuk-!-margin-right-6'
                />
                <p>Flood warnings</p>
              </div>
            </th>
            <td className='govuk-table__cell'>Flooding expected - act now</td>
            <td className='govuk-table__cell'>
              <p>Flooding may affect:</p>
              <ul className='govuk-list--bullet'>
                <li>homes and businesses</li>
                <li>roads and railway lines</li>
                <li>coastal areas affected by spray or waves overtopping</li>
                <li>flood plains, including caravans park and campsites</li>
                <li> tourist and leisure attractions</li>
              </ul>
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>
              <div>
                <img
                  src={floodAlertIcon}
                  alt='Flood alert Icon'
                  style={{ float: 'left', height: '33px', width: '33px' }}
                  className='govuk-!-margin-right-6'
                />
                <p>Flood alerts</p>
              </div>
            </th>
            <td className='govuk-table__cell'>
              Early alerts of possible flooding - be prepared
            </td>
            <td className='govuk-table__cell'>
              <p>The following may be at risk:</p>
              <ul className='govuk-list--bullet'>
                <li>fields, recreational land and car parks</li>
                <li>minor roads</li>
                <li>farmland</li>
                <li>coastal areas affected by spray or waves overtopping</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>

      <table className='govuk-table mobile-table'>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <td className='govuk-table__cell'>
              <div>
                <img
                  src={floodSevereWarningIcon}
                  alt='Severe flood warning Icon'
                  style={{ float: 'left', height: '33px', width: '33px' }}
                  className='govuk-!-margin-right-1'
                />
                <p className='govuk-!-padding-left-1 govuk-!-margin-bottom-0 govuk-!-font-weight-bold'>
                  Severe flood warnings
                </p>
              </div>
              <p
                style={{ fontSize: '0.875rem' }}
                className='govuk-hint govuk-!-padding-left-9'
              >
                Danger to life - act now
              </p>
            </td>
            <td className='govuk-table__cell'>
              Risk of severe flooding and major disruption. There could be
              danger to life and property and you’ll need to act immediately.
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <td scope='row' className='govuk-table__cell'>
              <div>
                <img
                  src={floodWarningIcon}
                  alt='Flood warning Icon'
                  style={{ float: 'left', height: '33px', width: '33px' }}
                  className='govuk-!-margin-right-1'
                />
                <p className='govuk-!-padding-left-1 govuk-!-margin-bottom-0 govuk-!-font-weight-bold'>
                  Flood warnings
                </p>
              </div>
              <p
                style={{ fontSize: '0.875rem' }}
                className='govuk-hint govuk-!-padding-left-9'
              >
                Flooding expected - act now
              </p>
            </td>
            <td className='govuk-table__cell'>
              <p>Flooding may affect:</p>
              <ul className='govuk-list--bullet'>
                <li>homes and businesses</li>
                <li>roads and railway lines</li>
                <li>coastal areas affected by spray or waves overtopping</li>
                <li>flood plains, including caravans park and campsites</li>
                <li> tourist and leisure attractions</li>
              </ul>
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <td scope='row' className='govuk-table__cell'>
              <div>
                <img
                  src={floodAlertIcon}
                  alt='Flood alert Icon'
                  style={{ float: 'left', height: '33px', width: '33px' }}
                  className='govuk-!-margin-right-1'
                />
                <p className='govuk-!-padding-left-1 govuk-!-margin-bottom-0 govuk-!-font-weight-bold'>
                  Flood alerts
                </p>
              </div>
              <p
                style={{ fontSize: '0.875rem' }}
                className='govuk-hint govuk-!-padding-left-9'
              >
                Early alerts of possible flooding - be prepared
              </p>
            </td>

            <td className='govuk-table__cell'>
              <p>The following may be at risk:</p>
              <ul className='govuk-list--bullet'>
                <li>fields, recreational land and car parks</li>
                <li>minor roads</li>
                <li>farmland</li>
                <li>coastal areas affected by spray or waves overtopping</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
