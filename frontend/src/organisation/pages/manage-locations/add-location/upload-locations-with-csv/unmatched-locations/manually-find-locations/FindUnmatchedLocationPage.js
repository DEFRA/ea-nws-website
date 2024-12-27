import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../../../../common/components/gov-uk/Radio'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function FindUnmatchedLocationsPage () {
  const navigate = useNavigate()
  const [findLocationOption, setFindLocationOption] = useState('')
  const [error, setError] = useState('')

  // TODO: This data needs to be passed
  const location = {
    name: 'Location_IDXX',
    address: 'Address',
    postcode: null,
    coordinates: 'X and Y'
  }

  const findLocationOptions = [
    {
      value: 'postcode',
      label: 'Check the postcode'
    },
    { value: 'coordinates', label: 'Use different X and Y coordinates' },
    { value: 'map', label: 'Drop a pin on a map' }
  ]

  // const locationSearchResults = useSelector(
  //   (state) => state.session.locationSearchResults
  // )

  const handleContinue = () => {
    if (!findLocationOption) {
      setError('Select how do you want to find this location')
    } else if (findLocationOption === findLocationOptions[0].value) {
      if (!location.postcode) {
        navigate(orgManageLocationsUrls.unmatchedLocations.find.postcode)
      }
    } else {
      navigate(orgManageLocationsUrls.unmatchedLocations.manuallyfind.areaName) // Navigate to map
    }
  }

  const Info = () => (
    <>
      {location.coordinates && location.address && (
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

      {!location.coordinates && location.address && (
        <p>
          Some of the information in the address provided could not be found,
          for example the street name or postcode.
        </p>
      )}

      {location.coordinates && !location.address && (
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
      {location.coordinates && !location.address && (
        <>
          <br />
          {location.coordinates}
        </>
      )}
      {location.coordinates && location.address && (
        <>
          <br />
          <br />
          {location.coordinates}
        </>
      )}
    </div>
  )

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>
              How do you want to find Location_IDXX?
            </h1>
            <div className='govuk-body'>
              <Info />
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
