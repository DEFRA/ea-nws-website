import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../common/components/gov-uk/Radio'
import { orgManageLocationsUrls } from '../../../routes/manage-locations/ManageLocationsRoutes'

export default function AddLocationOptionsPage () {
  const navigate = useNavigate()
  const [addLocationType, setAddLocationType] = useState('')
  const [addLocationTypeError, setAddLocationTypeError] = useState('')
  const addLocationOptions = [
    {
      value: 'BulkAddresses',
      label: 'Addresses and postcodes in a file (.xls, .xlsx or .csv)'
    },
    { value: 'BulkCoordinates', label: 'X and Y coordinates in a file (.csv)' },
    { value: 'BulkShapeFile', label: 'Shapefile (points, lines or areas)' },
    { value: 'Manual', label: 'I want to add locations manually' }
  ]

  useEffect(() => {
    setAddLocationTypeError('')
  }, [addLocationType])

  const handleButton = () => {
    if (!addLocationType) {
      setAddLocationTypeError('Select how you want to add locations')
    } else {
      switch (addLocationType) {
        case addLocationOptions[0].value:
          navigate(orgManageLocationsUrls.add.addressInfo)
          break
        case addLocationOptions[1].value:
          // Someone to update
          // navigate(orgManageLocationsUrls.add.addressInfo)
          break
        case addLocationOptions[2].value:
          // Someone to update
          // navigate(orgManageLocationsUrls.add.addressInfo)
          break
        case addLocationOptions[3].value:
          navigate(orgManageLocationsUrls.add.name)
          break
      }
    }
  }

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {addLocationTypeError && (
              <ErrorSummary errorList={[addLocationTypeError]} />
            )}

            <h1 className='govuk-heading-l'>
              How do you want to add locations?
            </h1>
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
                  {addLocationOptions.map((option) => (
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
