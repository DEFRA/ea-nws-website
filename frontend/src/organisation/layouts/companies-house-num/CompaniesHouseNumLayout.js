import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../common/components/gov-uk/Radio'
import { setProfile } from '../../../common/redux/userSlice'
import {
  getOrganisationAdditionals,
  updateOrganisationAdditionals
} from '../../../common/services/ProfileServices'
import { compHouseNumberValidation } from '../../../common/services/validations/CompHouseNumValidation'

export default function CompaniesHouseNumLayout({
  NavigateToNextPage,
  NavigateToPreviousPage
}) {
  const dispatch = useDispatch()
  const [companyNumExists, setCompanyNumExists] = useState(null) // This exists so that the input field does not disappear when user deletes text
  const [companyNum, setCompanyNum] = useState(null)
  const [error, setError] = useState('')
  const [numberError, setNumberError] = useState('')
  const profile = useSelector((state) => state.session.profile)

  const handleSubmit = async () => {
    // Nothing selected
    if (companyNum === null) {
      setError(
        'Select whether your organisation has a Companies House number or not'
      )
      return
    }

    let organisation = Object.assign({}, getOrganisationAdditionals(profile))

    // No was clicked
    // Explicitly checking for false as !companyNum would also include empty string
    if (companyNum === false) {
      organisation.compHouseNum = null

      const updatedProfile = updateOrganisationAdditionals(
        profile,
        organisation
      )
      dispatch(setProfile(updatedProfile))

      NavigateToNextPage()
    }
    // Yes was clicked - validate input before proceeding
    else {
      const validationError = compHouseNumberValidation(companyNum)
      if (!validationError) {
        organisation.compHouseNum = companyNum

        const updatedProfile = updateOrganisationAdditionals(
          profile,
          organisation
        )
        dispatch(setProfile(updatedProfile))
        NavigateToNextPage()
      } else {
        setNumberError(validationError)
      }
    }
  }

  const navigateBack = async (event) => {
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
              <ErrorSummary errorList={[error, numberError]} />
            )}
            <h1 className='govuk-heading-l'>
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
                  />
                  <Radio
                    key='radio_no'
                    name='comp-house-radios'
                    label='No'
                    onChange={() => setCompanyNum(false)}
                  />
                  <br />
                </div>
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
