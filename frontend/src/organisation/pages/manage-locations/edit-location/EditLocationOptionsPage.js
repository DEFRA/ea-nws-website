import React from 'react'
import OrganisationAccountNavigation from '../../../../common/components/custom/OrganisationAccountNavigation'
import BackLink from '../../../../common/components/custom/BackLink'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import Radio from '../../../../common/components/gov-uk/Radio'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Button from '../../../../common/components/gov-uk/Button'
import { useEffect } from 'react'

export default function EditLocationOptionsPage () {
    const navigate = useNavigate()
    const [addLocationType,setAddLocationType] = useState('')
    const [addLocationTypeError, setAddLocationTypeError] = useState('')
    const editLocationOptions = [
        {value:'Coordinates', label: 'Use X and Y coordinates'},
        {value: 'Pin drop', label: 'Drop a pin on a map'}
    ]

    useEffect(() => {
        setAddLocationTypeError()
    },[addLocationType])

    const handleButton = () => {
        if(!addLocationType) {
            // change this later when figma is answered
            setAddLocationTypeError('select how you want to edit locations')
        }else{
            if (addLocationType === editLocationOptions[0].value){
                //change when page made
                navigate('/')
            }else{
                //Update this later when page made
                navigate('/')
            }
        }
    }

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
          {addLocationTypeError && (
              <ErrorSummary errorList={[addLocationTypeError]} />
            )}
            <h1 className='govuk-heading-l'>How do you want to change the existing location?</h1>
            
            <div className='govuk-body'>
              <div
                className={
                  addLocationTypeError
                    ? 'govuk-form-group govuk-form-group--error'
                    : 'govuk-form-group'
                }
              >
                <div className='govuk-radios' data-module='govuk-radios'>
                  {addLocationTypeError && (
                    <p className='govuk-error-message'>
                      {addLocationTypeError}
                    </p>
                  )}
                  {editLocationOptions.map((option) => (
                    <Radio
                      key={option.value}
                      name='addLocationOptionsRadios'
                      label={option.label}
                      value={option.value}
                      onChange={(e) => setAddLocationType(e.target.value)}
                    />
                  ))}
                </div>
              </div>

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
