import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import BackLink from '../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../../common/components/gov-uk/Radio'

export default function LocationSearchOptionsLayout({
  heading,
  additionalInfo,
  searchOptions,
  navigateToNextPage
}) {
  const navigate = useNavigate()
  const [searchOption, setSearchOption] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setError('')
  }, [searchOption])

  const handleSubmit = () => {
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
    navigate(-1)
  }
  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>{heading}</h1>
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
