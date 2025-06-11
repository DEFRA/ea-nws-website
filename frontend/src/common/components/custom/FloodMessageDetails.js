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
              What's at the risk?
            </th>
          </tr>
        </thead>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>
              <img
                src={floodSevereWarningIcon}
                alt='Severe flood warning Icon'
                style={{ width: '33px', height: '33px' }}
              />
              <span className='govuk-!-padding-left-7'>
                Severe flood warning
              </span>
            </th>
            <td className='govuk-table__cell'>Danger to life - act now</td>
            <td className='govuk-table__cell'>
              Risk of severe flooding and major disruption. There could be
              danger to life and property and you’ll need to act immediately.
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>
              <img
                src={floodWarningIcon}
                alt='Flood warning Icon'
                style={{ width: '33px', height: '33px' }}
              />
              <span className='govuk-!-padding-left-7'>Flood warning</span>
            </th>
            <td className='govuk-table__cell'>Flooding expected - act now</td>
            <td className='govuk-table__cell'>
              Flooding may affect:
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
              <img
                src={floodAlertIcon}
                alt='Flood alert Icon'
                style={{ width: '33px', height: '33px' }}
              />
              <span className='govuk-!-padding-left-7'>Flood alert</span>
            </th>
            <td className='govuk-table__cell'>
              Early alerts of possible flooding - be prepared
            </td>
            <td className='govuk-table__cell'>
              The following may be at risk:
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
            <td className='govuk-table__cell govuk-!-width-one-half'>
              <img
                src={floodSevereWarningIcon}
                alt='Severe flood warning Icon'
                style={{ width: '35px', height: '33px' }}
              />
              <span className='govuk-!-padding-left-1 govuk-!-font-weight-bold'>
                Severe flood warning
              </span>
              <p className='govuk-hint govuk-!-padding-left-9'>
                Danger to life - act now
              </p>
            </td>
            <td className='govuk-table__cell govuk-!-width-one-half'>
              Risk of severe flooding and major disruption. There could be
              danger to life and property and you’ll need to act immediately.
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <td
              scope='row'
              className='govuk-table__cell govuk-!-width-one-half'
            >
              <img
                src={floodWarningIcon}
                alt='Flood warning Icon'
                style={{ width: '35px', height: '33px' }}
              />
              <span className='govuk-!-padding-left-1 govuk-!-font-weight-bold'>
                Flood warning
              </span>
              <p className='govuk-hint govuk-!-padding-left-9'>
                Flooding expected - act{' '}
              </p>
            </td>
            <td className='govuk-table__cell govuk-!-width-one-half'>
              Flooding may affect:
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
            <td
              scope='row'
              className='govuk-table__cell govuk-!-width-one-half'
            >
              <img
                src={floodAlertIcon}
                alt='Flood alert Icon'
                style={{ width: '35px', height: '33px' }}
              />
              <span className='govuk-!-padding-left-1 govuk-!-font-weight-bold'>
                Flood alert
              </span>
              <p className='govuk-hint govuk-!-padding-left-9'>
                Early alerts of possible flooding - be prepared
              </p>
            </td>

            <td className='govuk-table__cell govuk-!-width-one-half'>
              The following may be at risk:
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
