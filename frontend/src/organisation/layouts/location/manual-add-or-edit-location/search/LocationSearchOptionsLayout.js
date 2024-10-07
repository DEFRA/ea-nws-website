import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import BackLink from '../../../../../common/components/custom/BackLink'
import Radio from '../../../../../common/components/gov-uk/Radio'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import Button from '../../../../../common/components/gov-uk/Button'

export default function LocationSearchOptionsLayout ({ heading, searchOptions, errorMessage, navigateToNextPage }) {
  const navigate = useNavigate()
  const [searchOption, setSearchOption] = useState('')
  const [error, setError] = useState('')
  const location = useLocation()
  const isAddingLocationFlow = location.pathname.includes('add')

  useEffect(() => {
    setError('')
  }, [searchOption])

  const handleSubmit = () => {
    if (!searchOption) {
      setError(errorMessage)
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
            {error && (
              <ErrorSummary errorList={[error]} />
            )}
            <h1 className='govuk-heading-l'>{heading}</h1>
            {isAddingLocationFlow &&
              <p>
                If your location is a polygon, or a line, your organization has
                created you'll need to upload your location as a shapefile in a
                .zip file.
              </p>}

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
