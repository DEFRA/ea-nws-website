import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../common/components/gov-uk/Radio'
import { clearCurrentLocation } from '../../../../common/redux/userSlice'
import { orgManageLocationsUrls } from '../../../routes/manage-locations/ManageLocationsRoutes'

export default function AddLocationOptionsPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // Clear the current location when adding a new one
  dispatch(clearCurrentLocation())
  const [addLocationType, setAddLocationType] = useState('')
  const [addLocationTypeError, setAddLocationTypeError] = useState('')
  const addLocationOptions = [
    {
      value: 'BulkCoordinates',
      label:
        'Upload locations using a postcode or X and Y coordinates in a CSV file'
    },
    {
      value: 'BulkShapefile',
      label: 'Upload a location as a shapefile in a ZIP file'
    },
    { value: 'Manual', label: 'Manually add locations' },
    { value: 'PredefinedBoundaries', label: 'Select predefined boundaries' }
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
          navigate(orgManageLocationsUrls.add.addLocationsWithShapefile)
          break
        case addLocationOptions[2].value:
          navigate(orgManageLocationsUrls.add.name)
          break
        case addLocationOptions[3].value:
          navigate(orgManageLocationsUrls.add.predefinedBoundary.select)
          break
      }
    }
  }

  return (
    <>
      <OrganisationAccountNavigation
        currentPage={orgManageLocationsUrls.view.dashboard}
      />
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
              <p>
                There are different ways you can add locations to this account.
              </p>
              <p>
                If you want to add locations using a postcode or X and Y
                coordinates you can either bulk upload these locations in a CSV
                file or add the locations manually.
              </p>
              <p>
                If you want to add your location as a polygon or a line your
                organisation has created, you need to upload your location as a
                shapefile in a ZIP file.
              </p>
              <p>
                You can also add locations as boundaries, for example a county
                or police boundary, so your organisation can get flood messages
                for that area.
                <br />
                Boundaries are predefined areas so you need to select them
                manually in this account.
              </p>
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
