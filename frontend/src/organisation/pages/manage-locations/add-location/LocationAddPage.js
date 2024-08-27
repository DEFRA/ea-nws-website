import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../common/components/gov-uk/Radio'
import orgManageLocationsUrls from '../../../routes/manage-locations/ManageLocationsUrls'

export default function LocationAddPage () {
  const navigate = useNavigate()

  const addLocationOptions = [
    {
      value: 'BulkAddresses',
      label: 'Addresses and postcodes in a file (.xls, .xlsx or .csv)'
    },
    { value: 'BulkCoordinates', label: 'X and Y coordinates in a file (.csv)' },
    { value: 'BulkShapeFile', label: 'Shapefile (points, lines or areas)' },
    { value: 'Manual', label: 'I want to add locations manually' }
  ]

  const [addLocationType, setAddLocationType] = useState('')
  const [addLocationTypeError, setAddLocationTypeError] = useState('')

  // Reset add location type error
  useEffect(() => {
    setAddLocationTypeError('')
  }, [addLocationType])

  // Button
  const handleButton = async () => {
    // Check if add location type is selected
    if (!addLocationType) {
      setAddLocationTypeError('Select how you want to add locations')
    } else if (addLocationType === addLocationOptions[0].value) {
      navigate(orgManageLocationsUrls.add.addressInfo)
    }
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />

      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {/* Error summary */}
            {addLocationTypeError && (
              <ErrorSummary errorList={[addLocationTypeError]} />
            )}

            {/* Select add location type */}
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
