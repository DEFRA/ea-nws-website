import React, { useEffect, useState } from 'react'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../../common/components/gov-uk/Radio'

export default function LocationSearchOptionsLayout({
  heading,
  additionalInfo,
  searchOptions,
  navigateToNextPage,
  navigateToPreviousPage
}) {
  const [searchOption, setSearchOption] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setError('')
  }, [searchOption])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!searchOption) {
      if (Object.keys(searchOptions).length > 2) {
        setError('Select how you want to find this location')
      } else {
        setError(
          'Select if you want to use X and Y coordinates or drop a pin on a map'
        )
      }
    } else {
      navigateToNextPage(searchOption)
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigateToPreviousPage()
  }
  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            {error && <ErrorSummary errorList={[error]} />}
            <legend className='govuk-fieldset__legend'>
              <h1 className='govuk-heading-l'>{heading}</h1>
            </legend>
            {additionalInfo && <>{additionalInfo}</>}
            <div
              className={
                error
                  ? 'govuk-form-group govuk-form-group--error'
                  : 'govuk-form-group'
              }
            >
              {error && <p className='govuk-error-message'>{error}</p>}
              <fieldset className='govuk-fieldset'>
                <div className='govuk-radios' data-module='govuk-radios'>
                  {searchOptions.map((option) => (
                    <Radio
                      key={option.label}
                      label={option.label}
                      value={option.value}
                      name='searchOptionsRadios'
                      onChange={(e) => setSearchOption(e.target.value)}
                    />
                  ))}
                </div>
              </fieldset>
            </div>
            <Button
              text='Continue'
              className='govuk-button'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </main>
    </>
  )
}
