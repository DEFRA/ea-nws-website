import React from 'react'
import { Link } from 'react-router-dom'

export default function FloodMessageReviewTable ({ registration }) {
  const hasSevereFloodWarning = registration.params.categories.some(
    (category) =>
      category.code === 'SEVERE_FLOOD_WARNING' ||
      category.code === 'FLOOD_WARNING'
  )

  const hasFloodAlert = registration.params.categories.some(
    (category) => category.code === 'FLOOD_ALERT'
  )

  return (
    <>
      <h3 className='govuk-heading-m'>Flood messages you'll get</h3>
      {registration.params.categories.length > 0
        ? (
          <table className='govuk-table'>
            <tbody className='govuk-table__body'>
              {hasSevereFloodWarning
                ? (
                  <>
                    <tr className='govuk-table__row'>
                      <th
                        scope='row'
                        className='govuk-table__header govuk-!-width-one-half'
                      >
                        Severe flood warnings and flood warnings
                      </th>
                      <td className='govuk-table__cell  govuk-!-width-full'>Yes</td>
                      <td className='govuk-table__cell' />
                    </tr>
                    <tr className='govuk-table__row'>
                      <th
                        scope='row'
                        className='govuk-table__header govuk-!-width-one-half'
                      >
                        Flood alerts (optional)
                      </th>
                      <td className='govuk-table__cell govuk-!-width-full'>
                        {hasFloodAlert ? 'Yes' : 'No'}
                      </td>
                      <td className='govuk-table__cell'>
                        <Link
                          to='/signup/review/change-flood-alert'
                          className='govuk-link'
                        >
                          Change
                        </Link>
                      </td>
                    </tr>
                  </>
                  )
                : (
                  <>
                    <tr className='govuk-table__row'>
                      <th
                        scope='row'
                        className='govuk-table__header govuk-!-width-one-half'
                      >
                        Flood alerts
                      </th>
                      <td className='govuk-table__cell govuk-!-width-full'>Yes</td>

                      <td className='govuk-table__cell' />
                    </tr>
                  </>
                  )}
            </tbody>
          </table>
          )
        : null}
    </>
  )
}
