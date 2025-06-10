import React from 'react'

export default function FloodMessageTypesTable() {
  return (
    <div className='govuk-!-padding-bottom-2'>
      <table className='govuk-table'>
        <thead className='govuk-table__head'>
          <tr className='govuk-table__row'>
            <th
              scope='col'
              className='govuk-table__header govuk-!-width-one-half'
            >
              Type of flood message
            </th>
            <th
              scope='col'
              className='govuk-table__header govuk-!-width-one-half'
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
                  <strong>Severe flood warnings</strong>
                  <span className='govuk-caption-m govuk-!-font-size-16 govuk-!-margin-bottom-3'>
                    Danger to life - act now
                  </span>
                  <strong>Flood warnings</strong>
                  <br />
                  <span className='live-map-filter-caption govuk-caption-m'>
                    Flooding expected - act now
                  </span>
                </div>
              </div>
            </td>
            <td className='govuk-table__cell'>Upper Hull River Catchment</td>
          </tr>
          <tr className='govuk-table__row'>
            <td className='govuk-table__cell'>
              <div
                className='org-flood-alert-item'
                style={{ display: 'flex', alignItems: 'flex-start' }}
              >
                <div className='org-flood-warning-square alert-square' />
                <div>
                  <strong>Flood alerts</strong>
                  <br />
                  <span className='govuk-caption-m govuk-!-font-size-16'>
                    Early alerts of possible flooding - be prepared
                    <br />
                    <br />
                    You can turn off flood alerts later, in your account, if you
                    need to.
                  </span>
                </div>
              </div>
            </td>
            <td className='govuk-table__cell'>
              River Lambourn and its tributaries from Upper Lambourn down to
              Newbury
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
