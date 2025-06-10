import React from 'react'
import { isMobile } from 'react-device-detect'

export default function FloodMessagesTable () {
  const columnWidths = {
    type: isMobile ? '50%' : '40%',
    area: isMobile ? '50%' : '60%'
  }

  const fontSizes = {
    heading: isMobile ? '16' : '19',
    caption: isMobile ? '14' : '16'
  }

  return (
    <div className='govuk-!-padding-bottom-2'>
      <table className='govuk-table'>
        <thead className='govuk-table__head'>
          <tr className='govuk-table__row'>
            <th
              scope='col'
              className='govuk-table__header'
              style={{ width: columnWidths.type }}
            >
              Type of flood message
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              style={{ width: columnWidths.area }}
            >
              Flood message area
            </th>
          </tr>
        </thead>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <td className='govuk-table__cell'>
              <div
                className='org-flood-warning-item'
                style={{ display: 'flex', alignItems: 'flex-start' }}
              >
                <div className='org-flood-warning-square warning-square' />{' '}
                <div>
                  <strong className={`govuk-!-font-size-${fontSizes.heading}`}>
                    Severe flood warnings
                  </strong>
                  <span
                    className={`govuk-caption-m govuk-!-font-size-${fontSizes.caption} govuk-!-margin-bottom-3`}
                  >
                    Danger to life - act now
                  </span>
                  <strong className={`govuk-!-font-size-${fontSizes.heading}`}>
                    Flood warnings
                  </strong>
                  <br />
                  <span
                    className={`govuk-caption-m govuk-!-font-size-${fontSizes.caption}`}
                  >
                    Flooding expected - act now
                  </span>
                </div>
              </div>
            </td>
            <td
              className={`govuk-table__cell govuk-!-font-size-${fontSizes.heading}`}
            >
              Upper Hull River Catchment
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <td className='govuk-table__cell'>
              <div
                className='org-flood-alert-item'
                style={{ display: 'flex', alignItems: 'flex-start' }}
              >
                <div className='org-flood-warning-square alert-square' />
                <div>
                  <strong className={`govuk-!-font-size-${fontSizes.heading}`}>
                    Flood alerts
                  </strong>
                  <br />
                  <span
                    className={`govuk-caption-m govuk-!-font-size-${fontSizes.caption}`}
                  >
                    Early alerts of possible flooding - be prepared
                    <br />
                    <br />
                    You can turn off flood alerts later, in your account, if you
                    need to.
                  </span>
                </div>
              </div>
            </td>
            <td
              className={`govuk-table__cell govuk-!-font-size-${fontSizes.heading}`}
            >
              River Lambourn and its tributaries from Upper Lambourn down to
              Newbury
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
