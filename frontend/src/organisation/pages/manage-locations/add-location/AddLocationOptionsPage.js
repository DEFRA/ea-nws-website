import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../common/components/gov-uk/Radio'
import LocationDataType from '../../../../common/enums/LocationDataType'
import {
  clearCurrentLocation,
  setCurrentLocationDataType
} from '../../../../common/redux/userSlice'
import { orgManageLocationsUrls } from '../../../routes/manage-locations/ManageLocationsRoutes'

export default function AddLocationOptionsPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // Clear the current location when adding a new one
  dispatch(clearCurrentLocation())
  const [addLocationType, setAddLocationType] = useState('')
  const [addLocationTypeError, setAddLocationTypeError] = useState('')
  const addLocationOptions = [
    {
      value: 'Manual',
      label: 'Add locations one at a time',
      hint: 'Using postcodes, coordinates or find on a map'
    },
    {
      value: 'BulkCoordinates',
      label: 'Bulk-upload multiople locations in a file',
      hint: 'Using postcodes or coordinates in a CSV file'
    },
    {
      value: 'PredefinedBoundaries',
      label: 'Choose predefined boundaries',
      hint: 'Like counties, police forces and other areas'
    },
    {
      value: 'BulkShapefile',
      label: 'Upload a location as a polyglon or line',
      hint: "You'll need to do this as a shapefile in a ZIP file"
    }
  ]

  useEffect(() => {
    setAddLocationTypeError('')
  }, [addLocationType])

  const handleButton = (event) => {
    event.preventDefault()
    if (!addLocationType) {
      setAddLocationTypeError('Select how you want to add locations')
    } else {
      switch (addLocationType) {
        case addLocationOptions[0].value:
          navigate(orgManageLocationsUrls.add.addressInfo)
          dispatch(setCurrentLocationDataType(LocationDataType.X_AND_Y_COORDS))
          break
        case addLocationOptions[1].value:
          navigate(orgManageLocationsUrls.add.addLocationsWithShapefile)
          // Note: Data type for shape file is decided once we know if it is a polygon or a line
          break
        case addLocationOptions[2].value:
          navigate(orgManageLocationsUrls.add.name)
          dispatch(setCurrentLocationDataType(LocationDataType.X_AND_Y_COORDS))
          break
        case addLocationOptions[3].value:
          navigate(orgManageLocationsUrls.add.predefinedBoundary.select)
          dispatch(setCurrentLocationDataType(LocationDataType.BOUNDARY))
          break
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>
          How do you want to add locations? - Manage locations - Get flood
          warnings (professional) - GOV.UK
        </title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {addLocationTypeError && (
              <ErrorSummary errorList={[addLocationTypeError]} />
            )}

            <h1 className='govuk-heading-l' id='main-content'>
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
                      hint={option.hint}
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
