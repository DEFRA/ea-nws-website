import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../common/components/gov-uk/Radio'
export default function SelectHowToFindThisLocationPage() {
  const navigate = useNavigate()
  const [findLocationOption, setFindLocationOption] = useState('')
  const [error, setError] = useState('')
  const findLocationOptions = [
    {
      value: 'Dropdown',
      label: 'Select from a drop-down list of partly matches addresses'
    },
    { value: 'Map', label: 'Find location on a map' }
  ]

  useEffect(() => {
    setError('')
  }, [findLocationOption])

  const handleContinue = async () => {
    if (!findLocationOption) {
      setError('Select if you want to manually find, or not add, locations')
    } else if (findLocationOption === findLocationOptions[0].value) {
      navigate('/') //Navigate to drop down
    } else {
      navigate('/') // Navigate to map
    }
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>
              How do you want to find this location?
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
                  {findLocationOptions.map((option) => (
                    <Radio
                      key={option.value}
                      id={option.value}
                      name='findLocationOptionRadios'
                      label={option.label}
                      type='radio'
                      value={option.value}
                      onChange={() => setFindLocationOption(option.value)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <br />
            <Button
              className='govuk-button'
              text='Continue'
              onClick={handleContinue}
            />
          </div>
        </div>
      </main>
    </>
  )
}
