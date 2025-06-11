import React from 'react'
import floodAlertIcon from '../../assets/images/flood_alert.svg'
import floodWarningIcon from '../../assets/images/flood_warning.svg'
import floodSevereWarningIcon from '../../assets/images/severe_flood_warning.svg'

export default function Details({ title, text }) {
  return (
    <>
      <details className='govuk-details'>
        <summary className='govuk-details__summary'>
          <span className='govuk-details__summary-text'>{title}</span>
        </summary>
        <div className='govuk-details__text'>
          <table class='govuk-table'>
            <thead class='govuk-table__head'>
              <tr class='govuk-table__row'>
                <th
                  scope='col'
                  class='govuk-table__header govuk-!-width-one-third'
                >
                  Type of flood message
                </th>
                <th
                  scope='col'
                  class='govuk-table__header govuk-!-width-one-third'
                >
                  What it means
                </th>
                <th
                  scope='col'
                  class='govuk-table__header govuk-!-width-one-third'
                >
                  What's at the risk?
                </th>
              </tr>
            </thead>
            <tbody class='govuk-table__body'>
              <tr class='govuk-table__row'>
                <th scope='row' class='govuk-table__header'>
                  <img
                    src={floodSevereWarningIcon}
                    alt='Severe flood warning Icon'
                    style={{ width: '33px', height: '33px' }}
                  />
                  <span className='govuk-!-padding-left-7'>
                    Severe flood warning
                  </span>
                </th>
                <td class='govuk-table__cell'>Danger to life - act now</td>
                <td class='govuk-table__cell'>
                  Risk of severe flooding and major disruption. There could be
                  danger to life and property and you’ll need to act
                  immediately.
                </td>
              </tr>
              <tr class='govuk-table__row'>
                <th scope='row' class='govuk-table__header'>
                  <img
                    src={floodWarningIcon}
                    alt='Flood warning Icon'
                    style={{ width: '33px', height: '33px' }}
                  />
                  <span className='govuk-!-padding-left-7'>Flood warning</span>
                </th>
                <td class='govuk-table__cell'>Flooding expected - act now</td>
                <td class='govuk-table__cell'>
                  Flooding may affect:
                  <ul className='govuk-list--bullet'>
                    <li>homes and businesses</li>
                    <li>roads and railway lines</li>
                    <li>
                      coastal areas affected by spray or waves overtopping
                    </li>
                    <li>flood plains, including caravans park and campsites</li>
                    <li> tourist and leisure attractions</li>
                  </ul>
                </td>
              </tr>
              <tr class='govuk-table__row'>
                <th scope='row' class='govuk-table__header'>
                  <img
                    src={floodAlertIcon}
                    alt='Flood alert Icon'
                    style={{ width: '33px', height: '33px' }}
                  />
                  <span className='govuk-!-padding-left-7'>Flood alert</span>
                </th>
                <td class='govuk-table__cell'>
                  Early alerts of possible flooding - be prepared
                </td>
                <td class='govuk-table__cell'>
                  The following may be at risk:
                  <ul className='govuk-list--bullet'>
                    <li>fields, recreational land and car parks</li>
                    <li>minor roads</li>
                    <li>farmland</li>
                    <li>
                      coastal areas affected by spray or waves overtopping
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>
    </>
  )
}
