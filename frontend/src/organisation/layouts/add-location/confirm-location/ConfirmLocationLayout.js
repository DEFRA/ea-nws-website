import { React } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import FloodWarningKey from '../../../../common/components/custom/FloodWarningKey'
import OrganisationAccountNavigation from '../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../common/components/gov-uk/Button'
import { convertCoordinatesToEspg27700 } from '../../../../common/services/CoordinatesFormatConverter'
import Map from '../../../components/custom/Map'
import { orgManageLocationsUrls } from '../../../routes/manage-locations/ManageLocationsRoutes'

export default function ConfirmLocationLayout() {
  const navigate = useNavigate()
  let { type } = useParams()
  let { flow } = useParams()
  const locationName = useSelector((state) => state.session.locationName)
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  const formattedAddress = selectedLocation.name.split(',')
  const coordinates = selectedLocation.coordinates

  const getCoordinatesToDisplay = (flow) => {
    switch (flow) {
      case 'postcode-search':
        return convertCoordinatesToEspg27700(
          selectedLocation.coordinates.longitude,
          selectedLocation.coordinates.latitude
        )
      case 'xy-coordinates-search':
        return (
          selectedLocation.coordinates.longitude,
          selectedLocation.coordinates.latitude
        )
    }
  }

  const { latitude, longitude } = getCoordinatesToDisplay(flow)

  const handleSubmit = () => {
    navigate(orgManageLocationsUrls.add.optionalInfo)
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

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
            'Severe flood warnings and flood warnings available',
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
                  {formattedAddress.map((line) => {
                    return (
                      <>
                        {line}
                        <br />
                      </>
                    )
                  })}
                </p>
              </>
            )}
            <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-top-4 govuk-!-margin-bottom-0'>
              X and Y Coordinates
            </h3>
            <p>
              {Math.round(latitude)}, {Math.round(longitude)}
            </p>
            {flow === 'xy-coordinates-search' && (
              <>
                <Link to={'james to update'} className='govuk-link'>
                  Move the pin on the map
                </Link>
                <br />
                <Link to={'james to update'} className='govuk-link'>
                  Use different X and Y coordinates
                </Link>
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
            style={{ marginTop: '105px' }}
          >
            <Map
              coordinates={coordinates}
              showMapControls={false}
              zoomLevel={14}
            />
            <FloodWarningKey type={'both'} />
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
