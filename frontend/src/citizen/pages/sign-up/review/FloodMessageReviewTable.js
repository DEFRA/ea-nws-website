import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AlertType from '../../../../common/enums/AlertType'
import { getLocationOtherAdditional } from '../../../../common/redux/userSlice'

export default function FloodMessageReviewTable () {
  const locationsSelected = useSelector((state) => state.session.profile.pois)
  const alertLevelsUserHasSelected = []
  locationsSelected.forEach((location) => {
    const locationLevels = getLocationOtherAdditional(
      location.additionals,
      'alertTypes'
    )
    alertLevelsUserHasSelected.push(...locationLevels)
  })

  const warningLevels = [
    AlertType.SEVERE_FLOOD_WARNING,
    AlertType.FLOOD_WARNING
  ]
  const alertLevels = [AlertType.FLOOD_ALERT]

  const hasSevereFloodWarning = alertLevelsUserHasSelected.some((level) =>
    warningLevels.includes(level)
  )
  const hasFloodAlerts = alertLevelsUserHasSelected.some((level) =>
    alertLevels.includes(level)
  )

  return (
    <div className='govuk-!-padding-bottom-4'>
      <h2 className='govuk-heading-m'>Flood messages you'll get</h2>
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
                    {hasFloodAlerts ? 'Yes' : 'No'}
                  </td>
                  <td className='govuk-table__cell'>
                    <Link
                      to='/signup/review/change-flood-alert'
                      className='govuk-link'
                      style={{ cursor: 'pointer' }}
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
                  <td className='govuk-table__cell ' />
                  <td className='govuk-table__cell govuk-!-width-full'>Yes</td>

                  <td className='govuk-table__cell' />
                </tr>
              </>
              )}
        </tbody>
      </table>
    </div>
  )
}
