import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../components/custom/BackLink'
import Button from '../../components/gov-uk/Button'
import ErrorSummary from '../../components/gov-uk/ErrorSummary'
import Radio from '../../components/gov-uk/Radio'

export default function ServiceSelectionPage () {
  const navigate = useNavigate()

  const [serviceOption, setServiceOption] = useState('')
  const [reasonError, setReasonError] = useState('')

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
      } else {
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
            {(reasonError) && (
              <ErrorSummary
                errorList={[reasonError]}
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
