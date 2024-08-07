import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../common/components/gov-uk/Radio'
import { setOrgCompHouseNum } from '../../../common/redux/userSlice'

export default function OrganisationCompaniesHouseNumLayout({
  NavigateToNextPage,
  NavigateToPreviousPage
}) {
  const dispatch = useDispatch()
  const [companyNumExists, setCompanyNumExists] = useState(null)
  const [companyNum, setCompanyNum] = useState('')
  const [error, setError] = useState('')
  const [numberError, setNumberError] = useState('')

  // Clear errors when user makes changes
  useEffect(() => {
    setError('')
  }, [companyNumExists])

  useEffect(() => {
    setNumberError('')
  }, [companyNum])

  const handleSubmit = async () => {
    if (companyNumExists === null) {
      setError(
        'Select whether your organisation has a Companies House number or not'
      )
      return
    }
    if (companyNumExists && !companyNum) {
      setNumberError('Enter your Companies House number')
      return
    }

    // Validate number
    dispatch(setOrgCompHouseNum(companyNumExists ? companyNum : null))
    NavigateToNextPage()
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
            {error && <ErrorSummary errorList={[error]} />}
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
                    name='yes-no-radios'
                    label='Yes'
                    onChange={() => setCompanyNumExists(true)}
                    conditional={companyNumExists}
                    conditionalQuestion='Companies House number'
                    conditionalInput={(val) => setCompanyNum(val)}
                    conditionalError={numberError}
                  />
                  <Radio
                    key='radio_no'
                    name='yes-no-radios'
                    label='No'
                    onChange={() => setCompanyNumExists(false)}
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
