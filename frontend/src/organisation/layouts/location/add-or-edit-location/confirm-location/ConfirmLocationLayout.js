import { React } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../common/components/gov-uk/Button'
import FloodWarningKey from '../../../../components/custom/FloodWarningKey'
import Map from '../../../../components/custom/Map'

export default function ConfirmLocationLayout({
  navigateToNextPage,
  navigateToPinDropFlow
}) {
  const navigate = useNavigate()
  const currentLocation = useSelector((state) => state.session.currentLocation)
  const locationName = useSelector(
    (state) =>
      state.session.currentLocation.meta_data.location_additional.location_name
  )
  const currentAddress =
    currentLocation.meta_data.location_additional?.full_address
  const formattedAddress = currentAddress ? currentAddress.split(',') : ''

  const handleSubmit = () => {
    // do we need to do anything else here?
    navigateToNextPage()
  }

  const handleNavigateToPinDropFlow = (event) => {
    event.preventDefault()
    navigateToPinDropFlow()
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

            {currentAddress && (
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

            <Link
              onClick={(e) => handleNavigateToPinDropFlow(e)}
              className='govuk-link'
            >
              Move pin position
            </Link>

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
