import { React } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../common/components/gov-uk/Button'
import FloodWarningKey from '../../../../components/custom/FloodWarningKey'
import Map from '../../../../components/custom/Map'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ConfirmLocationLayout () {
  const navigate = useNavigate()
  const { type } = useParams()
  const { flow } = useParams()
  const currentLocation = useSelector((state) => state.session.currentLocation)
  const locationName = useSelector(
    (state) =>
      state.session.currentLocation.meta_data.location_additional.location_name
  )
  const formattedAddress =
    flow === 'postcode-search'
      ? currentLocation.meta_data.location_additional.full_address.split(',')
      : ''

  const getFloodMessage = (type) => {
    switch (type) {
      case 'all':
        return {
          floodMessagesAvailableHeader: 'All flood messages available',

          floodInfoMessage: `You can get all flood messages for ${locationName} as it is in a flood warning and a flood alert area.`
        }

      case 'alerts':
        return {
          floodMessagesAvailableHeader:
            'Severe flood warnings and flood warnings unavailable',

          floodInfoMessage: `You cannot get flood warnings for ${locationName} as it is not in a flood warning area. But you may be able to link this location to any nearby locations that can get severe flood warnings and flood warnings.`
        }

      case 'no-alerts':
        return {
          floodMessagesAvailableHeader: 'Flood messages unavailable',

          floodInfoMessage: `You cannot get flood messages for ${locationName} as it is not in a flood area. But you may be able to link this location to any nearby locations that can get flood messages.`
        }

      default:
        return {
          floodMessagesAvailableHeader: 'Unknown flood status',

          floodInfoMessage: `Flood message status for ${locationName} is unknown.`
        }
    }
  }

  const { floodMessagesAvailableHeader, floodInfoMessage } =
    getFloodMessage(type)

  const handleSubmit = () => {
    // do we need to do anything else here?

    navigate(orgManageLocationsUrls.add.optionalInfo)
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l govuk-!-margin-top-5'>
              Confirm Location
            </h1>
            <h2 className='govuk-heading-m govuk-!-margin-top-6'>
              {locationName}
            </h2>
            <hr />

            {flow === 'postcode-search' && (
              <>
                <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                  Address
                </h3>
                <p>
                  {formattedAddress.map((line, index) => {
                    return (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    )
                  })}
                </p>
              </>
            )}
            <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-top-4 govuk-!-margin-bottom-0'>
              X and Y Coordinates
            </h3>
            <p>
              {Math.round(
                currentLocation.meta_data.location_additional.x_coordinate
              )}
              {', '}
              {Math.round(
                currentLocation.meta_data.location_additional.y_coordinate
              )}
            </p>

            {flow === 'xy-coordinates-search' && (
              <>
                <Link to='TODO: add link to move pin' className='govuk-link'>
                  Move the pin on the map
                </Link>
                <br />
                <Link
                  onClick={navigateBack}
                  className='govuk-link'
                >
                  Use different X and Y coordinates
                </Link>
              </>
            )}

            {type === 'alerts' && (
              <>
                <h3 className='govuk-heading-s govuk-!-margin-top-8'>
                  {locationName} gets flood alerts
                </h3>
                <p>
                  This location is in a flood alert area and will get flood
                  alerts.
                </p>
              </>
            )}

            <h3 className='govuk-heading-s govuk-!-margin-top-8'>
              {floodMessagesAvailableHeader}
            </h3>
            <p>{floodInfoMessage}</p>

            <div className='govuk-!-margin-top-8'>
              <Button
                text='Confirm Location'
                className='govuk-button'
                onClick={handleSubmit}
              />
              <Link
                onClick={navigateBack}
                className='govuk-body govuk-link inline-link'
              >
                Cancel
              </Link>
            </div>
          </div>
          <div
            className='govuk-grid-column-one-half'
            style={{ marginTop: '95px' }}
          >
            <Map showMapControls={false} zoomLevel={14} />
            <div className='govuk-!-margin-top-4'>
              <FloodWarningKey type='both' />
            </div>
            <span className='govuk-caption-m govuk-!-font-size-16 govuk-!-font-weight-bold govuk-!-margin-top-4'>
              This is not a live flood map
            </span>
            <span className='govuk-caption-m govuk-!-font-size-16'>
              It shows fixed areas we provide flood warnings and alerts for
            </span>
          </div>
        </div>
      </main>
    </>
  )
}
