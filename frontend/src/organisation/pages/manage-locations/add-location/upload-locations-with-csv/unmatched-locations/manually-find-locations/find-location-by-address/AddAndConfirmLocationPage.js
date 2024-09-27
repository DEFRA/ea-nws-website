import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../../../../../common/components/gov-uk/Radio'
export default function AddAndConfirmLocationPage () {
  const navigate = useNavigate()
  const uploadedLocation = useSelector((state) => state.session.currentLocation)
  const previouslySelectedLocation = JSON.parse(
    sessionStorage.getItem('selectedAddress')
  )
  const [confirmedAddress, setConfirmedAddress] = useState('')
  const [error, setError] = useState('')
  const addressOptions = [
    {
      value: 'uploaded',
      label:
        'Address uploaded - ' +
        uploadedLocation.meta_data.location_additional.full_address
    },
    {
      value: 'found',
      label: 'Found address - ' + previouslySelectedLocation.name
    }
  ]

  const handleViewLocationButton = () => {}

  const handleContinue = async () => {
    if (!confirmedAddress) {
      setError(
        'Select if you want to use the address uploaded or the address found'
      )
    } else {
      navigate(
        '/organisation/manage-locations/unmatched-locations/manually-find'
      )
    }
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>Add location</h1>
            <div className='govuk-body'>
              <Button
                className='govuk-button--secondary'
                text='View location on map'
                onClick={handleViewLocationButton}
              />
              <br />
              <br />
              <h3 className='govuk-heading-m'>
                Which address do you want to use for this location?
              </h3>
              <div
                className={
                  error
                    ? 'govuk-form-group govuk-form-group--error'
                    : 'govuk-form-group'
                }
              >
                {error && <p className='govuk-error-message'>{error}</p>}
                <div className='govuk-radios' data-module='govuk-radios'>
                  {addressOptions.map((option) => (
                    <Radio
                      key={option.value}
                      id={option.value}
                      name='confirmLocationRadio'
                      label={option.label}
                      type='radio'
                      value={option.value}
                      onChange={() => setConfirmedAddress(option.value)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <br />
            <Button
              className='govuk-button'
              text='Add location'
              onClick={handleContinue}
            />
            <Link
              className='govuk-link inline-link'
              to='/organisation/manage-locations/unmatched-locations/manually-find'
            >
              Cancel
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
