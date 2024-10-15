import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import BackLink from '../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../common/components/gov-uk/Radio'
import { orgManageLocationsUrls } from '../../../routes/manage-locations/ManageLocationsRoutes'

export default function EditLocationOptionsPage () {
  const navigate = useNavigate()
  const [addLocationType, setAddLocationType] = useState('')
  const [Error, setError] = useState('')
  const editLocationOptions = [
    { value: 'Coordinates', label: 'Use X and Y coordinates' },
    { value: 'Pin drop', label: 'Drop a pin on a map' }
  ]

  useEffect(() => {
    setError('')
  }, [addLocationType])

  const handleButton = () => {
    if (!addLocationType) {
      // ToDo change this later when figma is answered
      setError(
        'Select if you want to use X and Y coordinates or drop a pin on a map'
      )
    } else {
      if (addLocationType === editLocationOptions[0].value) {
        navigate('/organisation/manage-locations/add/xy-coordinates-search')
      } else if (addLocationType === editLocationOptions[1].value) {
        navigate(orgManageLocationsUrls.edit.dropPinEdit)
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
            {Error && <ErrorSummary errorList={[Error]} />}
            <h1 className='govuk-heading-l'>
              How do you want to change the existing location?
            </h1>

            <div className='govuk-body'>
              <div
                className={
                  Error
                    ? 'govuk-form-group govuk-form-group--error'
                    : 'govuk-form-group'
                }
              >
                <div className='govuk-radios' data-module='govuk-radios'>
                  {Error && <p className='govuk-error-message'>{Error}</p>}
                  {editLocationOptions.map((option) => (
                    <Radio
                      key={option.value}
                      name='editLocationOptionsRadios'
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
