import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../../../common/components/gov-uk/Radio'
import LocationInformation from './duplicate-location-components/LocationInformation'

export default function DuplicateLocationComparisonPage () {
  const location = useLocation()
  const navigate = useNavigate()
  const [existingOrNew, setExistingOrNew] = useState('')
  const [error, setError] = useState('')
  const existingLocation = location?.state?.existingLocation
  const newLocation = location?.state?.newLocation

  // remove error if user changes selection
  useEffect(() => {
    if (error) {
      setError('')
    }
  }, [existingOrNew])

  const handleSubmit = async () => {
    if (existingOrNew === '') {
      setError(
        'Select if you want to keep the existing location or use the new location'
      )
    } else {
      // TODO: do something with existing or new location then navigate
      // back to the "Manage duplicate locations" page
      navigate(-1)
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            {/* TODO: use the existing location name here */}
            <h1 className='govuk-heading-l'>
              {newLocation.Location_name} already exists in this account
            </h1>
            <div className='govuk-body'>
              <div className='govuk-!-margin-bottom-6'>
                Select if you want to keep the existing location or use the new
                location uploaded.
              </div>
              <div class='govuk-grid-column-one-half govuk-!-padding-left-0'>
                <div className='outline-1px'>
                  <div className='org-location-information-header govuk-heading-m govuk-!-margin-bottom-0'>
                    Existing Location
                  </div>
                  <LocationInformation location={existingLocation} />
                  <div className='org-location-information-footer'>
                    <Radio
                      label='Keep existing location'
                      name='ExistingOrNewRadio'
                      small='true'
                      onChange={(e) => setExistingOrNew('Existing')}
                    />
                  </div>
                </div>
              </div>
              <div class='govuk-grid-column-one-half'>
                <div className='outline-1px'>
                  <div className='org-location-information-header govuk-heading-m govuk-!-margin-bottom-0'>
                    New Location
                  </div>
                  <LocationInformation location={newLocation} />
                  <div className='org-location-information-footer'>
                    <Radio
                      label='Use new location'
                      name='ExistingOrNewRadio'
                      small='true'
                      onChange={(e) => setExistingOrNew('New')}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button
              className='govuk-button govuk-!-margin-top-6'
              text='Continue'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </main>
    </>
  )
}
