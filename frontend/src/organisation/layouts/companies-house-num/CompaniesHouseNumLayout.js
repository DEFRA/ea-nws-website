import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../common/components/gov-uk/Radio'
import { setOrganizationCompHouseNum } from '../../../common/redux/userSlice'
import { compHouseNumberValidation } from '../../../common/services/validations/CompHouseNumValidation'

export default function CompaniesHouseNumLayout({
  navigateToNextPage,
  NavigateToPreviousPage
}) {
  const dispatch = useDispatch()
  const [companyNumExists, setCompanyNumExists] = useState(null)
  const [companyNum, setCompanyNum] = useState(null)
  const [error, setError] = useState('')
  const [numberError, setNumberError] = useState('')
  const compHouseRadiosId = 'comp-house-radios'
  const compHouseNumberId = 'comp-house-number'

  const handleSubmit = (event) => {
    event.preventDefault()
    if (companyNum === null) {
      setError(
        'Select whether your organisation has a Companies House number or not'
      )
      return
    }
    // No was clicked
    // Explicitly checking for false as !companyNum would also include empty string
    if (companyNum === false) {
      dispatch(setOrganizationCompHouseNum(null))
      navigateToNextPage()
    } else {
      // Yes was clicked - validate input before proceeding
      const validationError = compHouseNumberValidation(companyNum)
      if (!validationError) {
        dispatch(setOrganizationCompHouseNum(companyNum))
        navigateToNextPage()
      } else {
        setNumberError(validationError)
      }
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {(error || numberError) && (
              <ErrorSummary
              errorList={[
                  error && { text: error, componentId: compHouseRadiosId },
                  numberError && { text: numberError, compHouseNumberId: compHouseNumberId }
                ].filter(Boolean)}
              />
            )}
            <h1 className='govuk-heading-l' id='main-content'>
              Does your organisation have a Companies House number?
            </h1>
            <div className='govuk-body'>
              {error && <p className='govuk-error-message'>{error}</p>}
              <div
                className={
                  error
                    ? 'govuk-form-group govuk-form-group--error'
                    : 'govuk-form-group'
                }
              >
                <fieldset id={compHouseRadiosId} className='govuk-fieldset'>
                  <legend className='govuk-visually-hidden'>
                    Does your organisation have a Companies House number?
                  </legend>
                  <div className='govuk-radios'>
                    <Radio
                      key='radio_yes'
                      name='comp-house-radios'
                      label='Yes'
                      onChange={() => {
                        setCompanyNumExists(true)
                        setCompanyNum('')
                      }}
                      conditional={companyNumExists}
                      conditionalQuestion='Companies House number'
                      conditionalInput={(val) => setCompanyNum(val)}
                      conditionalError={numberError}
                      conditionalId={compHouseNumberId}
                    />
                    <Radio
                      key='radio_no'
                      name='comp-house-radios'
                      label='No'
                      onChange={() => setCompanyNum(false)}
                    />
                    <br />
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
        </div>
      </main>
    </>
  )
}
