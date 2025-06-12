import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import NotificationBanner from '../../../../../../common/components/gov-uk/NotificationBanner'
import Radio from '../../../../../../common/components/gov-uk/Radio'

export default function FindUnmatchedLocationsPage () {
  const navigate = useNavigate()
  const [unmatchedLocationOption, setUnmatchedLocationOption] = useState('')
  const [error, setError] = useState('')
  const location = useLocation()

  // Default values for null location.state
  const addedLocations = location?.state?.added || 0
  const notAddedLocations = location?.state?.notAdded || 0

  const unmatchedLocationsOptions = [
    { value: 'ManuallyFindLocations', label: 'Manually find locations' },
    { value: 'DoNotAddLocations', label: 'Do not add locations' }
  ]

  useEffect(() => {
    setError('')
  }, [unmatchedLocationOption])

  const handleButton = async (event) => {
    event.preventDefault()
    if (!unmatchedLocationOption) {
      setError('Select if you want to manually find, or not add, locations')
    } else if (unmatchedLocationOption === unmatchedLocationsOptions[1].value) {
      navigate('/organisation/manage-locations/unmatched-locations/do-not-add')
    } else {
      // this will need updated to the list of unmatched locations page
      navigate(
        '/organisation/manage-locations/unmatched-locations/manually-find'
      )
    }
  }

  return (
    <>
      {addedLocations > 0 && (
        <NotificationBanner
          className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-bottom-10 govuk-!-margin-top-5'
          title='Success'
          text={`${addedLocations} locations added`}
        />
      )}
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[{text: error, href: '#unmatched-locations-radios'}]} />}
            <h1 className='govuk-heading-l'>
              What do you want to do with the {notAddedLocations} locations not
              matched?
            </h1>
            <div className='govuk-body'>
              <div
                className={
                  error
                    ? 'govuk-form-group govuk-form-group--error'
                    : 'govuk-form-group'
                }
              >
                {error && (
                  <p className='govuk-error-message'>
                    <span className='govuk-visually-hidden'>Error:</span> {error}
                  </p>
                )}
                <div id='unmatched-locations-radios' className='govuk-radios' data-module='govuk-radios'>
                  {unmatchedLocationsOptions.map((option) => (
                    <Radio
                      key={option.value}
                      id={option.value}
                      name='unmatchedLocationRadios'
                      label={option.label}
                      type='radio'
                      value={option.value}
                      onChange={() => setUnmatchedLocationOption(option.value)}
                    />
                  ))}
                </div>
              </div>
              <p className='govuk-body'>
                <Link
                  onClick='/' // link to download file of all locations not matched
                  className='govuk-link'
                >
                  Download a file of all the locations not matched,
                </Link>
                update it and reupload later.
              </p>
            </div>
            <div className='govuk-body govuk-!-padding-top-5'>
              <Button
                text='Continue'
                className='govuk-button govuk-button'
                onClick={handleButton}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
