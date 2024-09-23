import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import InsetText from '../../../../../../common/components/gov-uk/InsetText'
import {
  setCurrentLocationCoordinates
} from '../../../../../../common/redux/userSlice'
import Map from '../../../../../components/custom/Map'

export default function SelectOnMapPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const fullAddress = useSelector((state) => state.session.currentLocation.meta_data.location_additional.full_address)
  const [pinCoords, setPinCoords] = useState('')
  const [error, setError] = useState('')

  const coordinates = useSelector((state) => state.session.currentLocation.coordinates)

  const handleSubmit = async () => {
    if (pinCoords === '') {
      setError('Click on the map to drop a pin')
    } else {
      // check ccords are in england if not navigate to error page
      // code here
      // set coords and navigate back to find locations page, api call first to set elasticache
      dispatch(setCurrentLocationCoordinates(pinCoords))
    }
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && (
              <ErrorSummary
                errorList={[error]}
              />
            )}
            <h1 className='govuk-heading-l'>Find location on a map</h1>
            <div className='govuk-body'>
              <p>
                Click on the map to drop a pin where you think this location is. You can then add the location to this account.
              </p>
              {/* <InsetText text={'For '+fullAddress} /> */}
              <InsetText text='For 25A BELGRAVE ROAD' />
              <Map coordinates={coordinates} setCoordinates={setPinCoords} type='drop' />
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
