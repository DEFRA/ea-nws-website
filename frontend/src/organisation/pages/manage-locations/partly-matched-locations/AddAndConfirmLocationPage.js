import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../common/components/gov-uk/Radio'
export default function AddAndConfirmLocationPage() {
  const navigate = useNavigate()
  const selectedLocation = useSelector(
    (state) =>
      state.session.currentLocation.meta_data.location_additional.full_address
  )
  const [confirmedAddress, setConfirmedAddress] = useState('')
  const [error, setError] = useState('')
  const addressOptions = [selectedLocation]
  useEffect(() => {
    setError('')
  }, [confirmedAddress])

  const handleViewLocationButton = () => {}

  const handleContinue = async () => {
    if (!confirmedAddress) {
      setError('Select an address')
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
              <div
                className={
                  error
                    ? 'govuk-form-group govuk-form-group--error'
                    : 'govuk-form-group'
                }
              >
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
              text='Cancel'
              className='govuk-link inline-link'
              onClick={navigate(
                '/organisation/manage-locations/unmatched-locations/manually-find'
              )}
            />
          </div>
        </div>
      </main>
    </>
  )
}
