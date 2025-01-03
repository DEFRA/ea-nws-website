import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../../common/components/gov-uk/Radio'
import {
  setCurrentLocationEasting,
  setCurrentLocationFullAddress,
  setCurrentLocationName,
  setCurrentLocationNorthing,
  setCurrentLocationPostcode,
  setLocationSearchResults
} from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function FindUnmatchedLocationLayout ({
  navigateToFindPostCode,
  navigateToFindAddress,
  navigateToFindCoordinates,
  navigateToFindLocationOnMap,
  flow
}) {
  const navigate = useNavigate()
  const [findLocationOption, setFindLocationOption] = useState('')
  const [error, setError] = useState('')
  const [coordinatesAvailable, setCoordinatesAvailable] = useState(false)

  const dispatch = useDispatch()

  // TODO: This data will be set from the unmatched location table
  const location = {
    name: 'Location_IDXX',
    address: 'Address',
    // address: null,
    // postcode: 'N1 0AG',
    postcode: null,
    coordinates: ['X', 'Y']
    // coordinates: [null, null]
  }

  useEffect(() => {
    if (location.coordinates[0] && location.coordinates[1]) {
      setCoordinatesAvailable(true)
    }
  }, [location.coordinates])

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
    // TODO: This will be set from the unmatched location table
    dispatch(setCurrentLocationName(location.name))
    dispatch(setCurrentLocationFullAddress(location.address))
    dispatch(setCurrentLocationPostcode(location.postcode))
    dispatch(setCurrentLocationEasting(location.coordinates[0]))
    dispatch(setCurrentLocationNorthing(location.coordinates[1]))

    if (!findLocationOption) {
      setError('Select how do you want to find this location')
    } else if (findLocationOption === findLocationOptions[0].value) {
      if (!location.postcode) {
        navigateToFindPostCode()
      } else {
        const dataToSend = {
          postCode: location.postcode.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
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
      {coordinatesAvailable && location.address && (
        <>
          <p>
            Both X and Y coordinates and an address and postcode were uploaded
            for this location.
          </p>

          <p>
            When both X and Y coordinates and an address and postcode are
            provided, we only check the X and Y coordinates to confirm the
            location.
          </p>
        </>
      )}

      {!coordinatesAvailable && location.address && (
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
      <strong>{location.name}</strong>
      {location.address && (
        <>
          <br />
          {location.address}
        </>
      )}
      {coordinatesAvailable && !location.address && (
        <>
          <br />
          {location.coordinates[0]}, {location.coordinates[1]}
        </>
      )}
      {coordinatesAvailable && location.address && (
        <>
          <br />
          <br />
          {location.coordinates[0]}, {location.coordinates[1]}
        </>
      )}
    </div>
  )

  return (
    <>
      <OrganisationAccountNavigation
        currentPage={orgManageLocationsUrls.view.dashboard}
      />
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
              {location.name}?
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
