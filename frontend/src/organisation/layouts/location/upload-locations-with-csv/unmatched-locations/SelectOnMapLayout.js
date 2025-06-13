import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import InsetText from '../../../../../common/components/gov-uk/InsetText'
import {
  setCurrentLocationCoordinates
} from '../../../../../common/redux/userSlice'
import { locationInEngland } from '../../../../../common/services/validations/LocationInEngland'
import Map from '../../../../components/custom/Map'

export default function SelectOnMapLayout ({ fullAddress, navigateToNextPage, NavigateToPreviousPage, NavigateToNotFound }) {
  const dispatch = useDispatch()
  const [pinCoords, setPinCoords] = useState('')
  const [error, setError] = useState('')
  const mapPinId = 'map-pin'

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (pinCoords === '') {
      setError('Click on the map to drop a pin')
    } else {
      const inEngland = await locationInEngland(pinCoords.latitude, pinCoords.longitude)
      // code here
      if (inEngland) {
        dispatch(setCurrentLocationCoordinates(pinCoords))
        // TODO: Send currentLocation object to elasticache and geosafe, then navigate
        navigateToNextPage()
      } else {
        NavigateToNotFound()
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
            {error && (
              <ErrorSummary
                errorList={[{text: error, componentId: mapPinId}]}
              />
            )}
            <h1 className='govuk-heading-l'>Find location on a map</h1>
            <div id={mapPinId} className='govuk-body'>
              <p>
                Click on the map to drop a pin where you think this location is. You can then add the location to this account.
              </p>
              <InsetText text={'For ' + fullAddress} />
              <Map setCoordinates={setPinCoords} type='drop' />
            </div>
            <Button
              className='govuk-button'
              text='Add location'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </main>
    </>
  )
}
