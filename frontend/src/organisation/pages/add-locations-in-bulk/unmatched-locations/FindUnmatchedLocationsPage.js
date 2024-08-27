import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../common/components/gov-uk/Radio'
import NotificationBanner from '../../../../common/components/gov-uk/NotificationBanner'

export default function FindUnmatchedLocationsPage () {
  const navigate = useNavigate()
  const [addUnmatchedLocationOption, setUnmatchedLocationOption] = useState('')
  const [error, setError] = useState('')

  const unmatchedLocationsOptions = [
    { value: 'ManuallyFindLocations', label: 'Manually find locations' },
    { value: 'DoNotAddLocations', label: 'Do not add locations' }
  ]

  // Reset error
  useEffect(() => {
    setError('')
  }, [addUnmatchedLocationOption])

  const handleButton = async () => {
    if (!addUnmatchedLocationOption) {
        setError('Select if you want to manually find, or not add, locations')
    } else if (addUnmatchedLocationOption === unmatchedLocationsOptions[1].value) {
        navigate('/organisation/unmatchedlocations/donotadd')
    }else{
        navigate('/')
    }
  }

  return (
    <>
      <NotificationBanner
        className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-bottom-10 govuk-!-margin-top-5'
        title='Success'
        text={'locations added'}
     />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            {error && (
              <ErrorSummary errorList={[error]} />)}
            <h1 className='govuk-heading-l'>
              What do you want to do with the {'number of locations not matched'} locations not matched?
            </h1>
            <div className='govuk-body'>
              <div
                className={
                    error
                    ? 'govuk-form-group govuk-form-group--error'
                    : 'govuk-form-group'
                }
              >
                {error && <p className='govuk-error-message'>{error}</p>}
                  <div className='govuk-radios' data-module='govuk-radios'>
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
                        onClick={'/'}
                        className='govuk-link' >
                          Download a file of all the locations not matched, 
                    </Link>
                    {''} update it and reupload later.
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