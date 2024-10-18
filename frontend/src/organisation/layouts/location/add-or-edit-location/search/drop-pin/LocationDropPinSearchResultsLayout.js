import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import InsetText from '../../../../../../common/components/gov-uk/InsetText'
import { setCurrentLocationCoordinates } from '../../../../../../common/redux/userSlice'
import { locationInEngland } from '../../../../../../common/services/validations/LocationInEngland'
import Map from '../../../../../components/custom/Map'
import MapInteractiveKey from '../../../../../components/custom/MapInteractiveKey'

export default function LocationDropPinSearchLayout({
  NavigateToNextPage,
  NavigateToPreviousPage,
  NavigateToNotInEnglandPage,
  DifferentSearchUrl
}) {
  const dispatch = useDispatch()
  const [pinCoords, setPinCoords] = useState('')
  const [error, setError] = useState('')
  const [showFloodWarningAreas, setShowFloodWarningAreas] = useState(true)
  const [showFloodAlertAreas, setShowFloodAlertAreas] = useState(true)
  const [showFloodExtents, setShowFloodExtents] = useState(true)
  const currentLocationName = useSelector(
    (state) =>
      state.session.currentLocation.meta_data.location_additional.location_name
  )

  // remove error if user drops a pin
  useEffect(() => {
    if (error) {
      setError('')
    }
  }, [pinCoords])

  const handleSubmit = async () => {
    if (pinCoords === '') {
      setError('Click on the map to drop a pin')
    } else {
      const inEngland = await locationInEngland(
        pinCoords.latitude,
        pinCoords.longitude
      )
      if (inEngland) {
        dispatch(setCurrentLocationCoordinates(pinCoords))
        // TODO: Send currentLocation object to elasticache and geosafe, then navigate
        NavigateToNextPage()
      } else {
        NavigateToNotInEnglandPage()
      }
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>Find location on a map</h1>
            <div className='govuk-body'>
              <p>
                Click on the map to drop a pin where you think this location is.
                You can then add the location to this account.
              </p>
              <InsetText text={currentLocationName} />
              <div className='govuk-!-margin-bottom-4'>
                <a className='govuk-link' href={DifferentSearchUrl}>
                  Search with a different place name, town or postcode
                </a>
              </div>
              <div class='govuk-grid-row'>
                <div class='govuk-grid-column-two-thirds'>
                  <Map
                    setCoordinates={setPinCoords}
                    type='drop'
                    showFloodWarningAreas={showFloodWarningAreas}
                    showFloodAlertAreas={showFloodAlertAreas}
                    showMarker={!useLocation().pathname.includes('add')}
                  />
                </div>
                <div class='govuk-grid-column-one-third'>
                  <MapInteractiveKey
                    showFloodWarningAreas={showFloodWarningAreas}
                    setShowFloodWarningAreas={setShowFloodWarningAreas}
                    showFloodAlertAreas={showFloodAlertAreas}
                    setShowFloodAlertAreas={setShowFloodAlertAreas}
                    showFloodExtents={showFloodExtents}
                    setShowFloodExtents={setShowFloodExtents}
                  />
                </div>
              </div>
              <span className='govuk-caption-m govuk-!-font-size-16 govuk-!-font-weight-bold govuk-!-margin-top-4'>
                This is not a live flood map
              </span>
              <span className='govuk-caption-m govuk-!-font-size-16 govuk-!-margin-top-1'>
                It shows fixed areas that we provide flood warnings and alerts
                for.
              </span>
            </div>
            <Button
              className='govuk-button govuk-!-margin-top-4'
              text={
                useLocation().pathname.includes('add')
                  ? 'Add location'
                  : 'Save location'
              }
              onClick={handleSubmit}
            />
            <Link
              onClick={navigateBack}
              className='govuk-body govuk-link inline-link govuk-!-margin-top-4 govuk-!-margin-left-2'
            >
              Cancel
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
