import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../components/custom/BackLink'
import Button from '../../components/gov-uk/Button'
import ErrorSummary from '../../components/gov-uk/ErrorSummary'
import Radio from '../../components/gov-uk/Radio'
import TextArea from '../../components/gov-uk/TextArea'
import { backendCall } from '../../services/BackendService'

export default function ServiceSelectionPage () {
  const navigate = useNavigate()
  const charLimit = 2000
  const charLimitText = 'Your answer must be 2000 characters or fewer'
  const accountDeletionReasonOptions = [
    { value: 'MovedOutOfArea', label: 'Moved out of area' },
    { value: 'TooManyWarnings', label: 'Too many warnings' },
    { value: 'WarningsAreTooLate', label: 'Warnings are too late' },
    { value: 'NotGettingAnyWarnings', label: 'Not getting any warnings' },
    { value: 'MyDetailsAreIncorrect', label: 'My details are incorrect' },
    { value: 'ConcernedAboutPrivacy', label: 'Concerned about privacy' }
  ]

  const [serviceOption, setServiceOption] = useState('')
  const [reasonError, setReasonError] = useState('')
  const [reasonTextError, setReasonTextError] = useState('')
  const [furtherInfoError, setFurtherInfoError] = useState('')

  useEffect(() => {
    setReasonError('')
  }, [serviceOption])

  const handleButton = async (event) => {
    event.preventDefault()
    let isValidInput = true

    // Check if reason is selected
    if (!serviceOption) {
      setReasonError('Select who the flood warnings are for')
      isValidInput = false
    }

    if (isValidInput) {
      if (serviceOption === 'citizen') {
        navigate('/signup/register-location/search')
      }
      else {
        navigate('/signup/organisation-service')
      }
    }
  }

  return (
    <>

      <BackLink onClick={() => navigate(-1)} />
      {/* Main body */}
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            {/* Error summary */}
            {(reasonError || reasonTextError || furtherInfoError) && (
              <ErrorSummary
                errorList={[reasonError, reasonTextError, furtherInfoError]}
              />
            )}
            <h1 className='govuk-heading-l'>
              Who are the flood warnings for?
            </h1>
            <div className='govuk-body'>
              <div>
                <div className='govuk-radios' data-module='govuk-radios'>
                  {reasonError && (
                    <p className='govuk-error-message'>{reasonError}</p>
                  )}
                  <Radio
                    key='citizen'
                    name='serviceSelectionRadios'
                    label='Myself, friends and family'
                    value='citizen'
                    onChange={(e) =>
                      setServiceOption(e.target.value)}
                  />
                  <Radio
                    key='organisation'
                    name='serviceSelectionRadios'
                    label='An organisation or business'
                    value='organisation'
                    onChange={(e) =>
                      setServiceOption(e.target.value)}
                  />
                </div>
              </div>
              <br />
              <Button
                text='Continue'
                className='govuk-button'
                onClick={handleButton}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
