import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AlertType from '../../../../common/enums/AlertType'
import { getLocationOtherAdditional } from '../../../../common/redux/userSlice'

export default function FloodMessageReviewTable() {
  const locationsSelected = useSelector((state) => state.session.profile.pois)
  const floodAreasInfo = useSelector(
    (state) => state.session.floodAreasInfo || null
  )
  const floodWarningAreasSet = new Set()
  const floodAlertAreasSet = new Set()
  locationsSelected.forEach((location) => {
    const locationTargetAreas = getLocationOtherAdditional(
      location.additionals,
      'targetAreas'
    )
    if (locationTargetAreas) {
      locationTargetAreas.map((targetArea) => {
        if (targetArea.category.toLowerCase().includes('warning')) {
          floodWarningAreasSet.add(targetArea.TA_Name)
        }
        if (targetArea.category.toLowerCase().includes('alert')) {
          floodAlertAreasSet.add(targetArea.TA_Name)
        }
      })
    } else {
      const locationLevels =
        floodAreasInfo?.find((area) => area.address === location.address)
          ?.alertTypes || []

      const warningLevels = [
        AlertType.SEVERE_FLOOD_WARNING,
        AlertType.FLOOD_WARNING
      ]
      const alertLevels = [AlertType.FLOOD_ALERT]

      locationLevels.map((level) => {
        if (warningLevels.includes(level)) {
          floodWarningAreasSet.add(location.address)
        }
        if (alertLevels.includes(level)) {
          floodAlertAreasSet.add(location.address)
        }
      })
    }
  })

  const floodWarningAreas = [...floodWarningAreasSet]
  const floodAlertAreas = [...floodAlertAreasSet]

  return (
    <div className='govuk-!-padding-bottom-4'>
      <table className='govuk-table govuk-!-margin-bottom-0'>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <th
              scope='row'
              className='govuk-table__header govuk-!-width-full'
              style={{ borderBottom: 'none' }}
            >
              <h2 className='govuk-heading-m govuk-!-margin-bottom-2'>
                Flood messages
              </h2>
            </th>
            <td className='govuk-table__cell' style={{ borderBottom: 'none' }}>
              <Link
                to='/signup/review/change-location-search'
                className='govuk-link'
                style={{ cursor: 'pointer' }}
                aria-label={`Change flood messages you'll get`}
              >
                Change
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
      <table className='govuk-table check-your-answers-table'>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <th
              className='govuk-!-width-one-third govuk-table__cell'
              scope='row'
            >
              <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>
                Severe flood warnings
              </h3>
              <span className='govuk-caption-m' style={{ fontSize: '16px' }}>
                Danger to life - act now
              </span>
              <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>
                Flood warnings
              </h3>
              <span className='govuk-caption-m' style={{ fontSize: '16px' }}>
                Flooding expected - act now
              </span>
            </th>
            <td className='govuk-table__cell govuk-!-width-full'>
              {floodWarningAreas.length > 0 ? (
                <ul className='govuk-list govuk-list--bullet'>
                  {floodWarningAreas.map((item, key) => (
                    <li key={key}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>No flood warning areas selected</p>
              )}
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <th
              className='govuk-!-width-one-third govuk-table__cell'
              scope='row'
            >
              <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>
                Flood alerts
              </h3>
              <span className='govuk-caption-m' style={{ fontSize: '16px' }}>
                Early alerts of possible flooding - be prepared
              </span>
            </th>
            <td className='govuk-table__cell govuk-!-width-full'>
              {floodAlertAreas.length > 0 ? (
                <ul className='govuk-list govuk-list--bullet'>
                  {floodAlertAreas.map((item, key) => (
                    <li key={key}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>No flood alert areas selected</p>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
