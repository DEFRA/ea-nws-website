import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../../common/components/gov-uk/Radio'
import {
  getLocationAdditional,
  getLocationOther,
  setCurrentLocationPostcode,
  setLocationSearchResults
} from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'

export default function FindUnmatchedLocationLayout ({
  navigateToFindPostCode,
  navigateToFindAddress,
  navigateToFindCoordinates,
  navigateToFindLocationOnMap,
  flow
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [findLocationOption, setFindLocationOption] = useState('')
  const [error, setError] = useState('')

  const currentLocName = useSelector((state) =>
    getLocationAdditional(state, 'locationName')
  )
  const currentLocAddress = useSelector((state) =>
    getLocationOther(state, 'full_address')
  )
  const currentLocPostcode = useSelector((state) =>
    getLocationOther(state, 'postcode')
  )
  const currentLocXcoordinate = useSelector((state) =>
    getLocationOther(state, 'x_coordinate')
  )
  const currentLocYcoordinate = useSelector((state) =>
    getLocationOther(state, 'y_coordinate')
  )

  const coordinatesAvailable = !!(
    currentLocXcoordinate && currentLocYcoordinate
  )
  const postcodeText = currentLocPostcode ? ' and postcode ' : ' '

  const findLocationOptions = [
    {
      value: 'postcode',
      label: 'Check the postcode'
    },
    {
      value: 'coordinates',
      label: coordinatesAvailable
        ? 'Use different X and Y coordinates'
        : 'Use X and Y coordinates'
    },
    { value: 'map', label: 'Drop a pin on a map' }
  ]

  const handleContinue = async () => {
    if (!findLocationOption) {
      setError('Select how do you want to find this location')
    } else if (findLocationOption === findLocationOptions[0].value) {
      if (!currentLocPostcode) {
        navigateToFindPostCode()
      } else {
        const dataToSend = {
          postCode: currentLocPostcode
            .replace(/[^a-zA-Z0-9]/g, '')
            .toUpperCase()
        }
        const { data, errorMessage } = await backendCall(
          dataToSend,
          'api/os-api/postcode-search',
          navigate
        )
        if (!errorMessage) {
          dispatch(setCurrentLocationPostcode(data[0].postcode))
          dispatch(setLocationSearchResults(data))
          navigateToFindAddress()
        } else {
          navigateToFindPostCode()
        }
      }
    } else if (findLocationOption === findLocationOptions[1].value) {
      navigateToFindCoordinates()
    } else {
      navigateToFindLocationOnMap()
    }
  }

  const Info = () => (
    <>
      {coordinatesAvailable && currentLocAddress && (
        <>
          <p>
            Both X and Y coordinates and an address{postcodeText}were uploaded
            for this location.
          </p>

          <p>
            When both X and Y coordinates and an address{postcodeText}are
            provided, we only check the X and Y coordinates to confirm the
            location.
          </p>
        </>
      )}

      {!coordinatesAvailable && currentLocAddress && (
        <p>
          Some of the information in the address provided could not be found,
          for example the street name or postcode.
        </p>
      )}

      {coordinatesAvailable && (
        <p>
          The X and Y coordinates uploaded for this location were not
          recognised.
        </p>
      )}

      <p>
        Select how you want to manually find the location to add it to this
        account.
      </p>
    </>
  )

  const InsetText = () => (
    <div className='govuk-inset-text'>
      <strong>{currentLocName}</strong>
      {currentLocAddress && (
        <>
          <br />
          {currentLocAddress}
          {currentLocPostcode && <>, {currentLocPostcode}</>}
          {coordinatesAvailable && (
            <>
              <br />
            </>
          )}
        </>
      )}

      {coordinatesAvailable && (
        <>
          <br />
          {typeof currentLocXcoordinate === 'number'
            ? Math.round(currentLocXcoordinate)
            : currentLocXcoordinate}
          ,{' '}
          {typeof currentLocYcoordinate === 'number'
            ? Math.round(currentLocYcoordinate)
            : currentLocYcoordinate}
        </>
      )}
    </div>
  )

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-8'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            {error && <ErrorSummary errorList={[error]} />}

            {/* Heading */}
            <h1 className='govuk-heading-l'>
              How do you want to{' '}
              {flow === 'unmatched-locations-not-found'
                ? 'find'
                : 'to change the position of'}{' '}
              {currentLocName}?
            </h1>

            {/* Body */}
            <div className='govuk-body'>
              {flow === 'unmatched-locations-not-found' && <Info />}
              {flow === 'unmatched-locations-not-in-england' && (
                <>
                  <p>This location is not in England.</p>
                  <p>
                    Select how you want to manually change the position of this
                    location.
                  </p>
                </>
              )}
              <InsetText />

              <div
                className={
                  error
                    ? 'govuk-form-group govuk-form-group--error'
                    : 'govuk-form-group'
                }
              >
                {error && <p className='govuk-error-message'>{error}</p>}
                <div className='govuk-radios' data-module='govuk-radios'>
                  {findLocationOptions.map((option) => (
                    <Radio
                      key={option.value}
                      id={option.value}
                      name='findLocationOptionRadios'
                      label={option.label}
                      type='radio'
                      value={option.value}
                      onChange={() => setFindLocationOption(option.value)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <br />
            <Button
              className='govuk-button'
              text='Continue'
              onClick={handleContinue}
            />
          </div>
        </div>
      </main>
    </>
  )
}
