import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../../../common/components/gov-uk/Radio'
import { backendCall } from '../../../../../../common/services/BackendService'
import { webToGeoSafeLocation } from '../../../../../../common/services/formatters/LocationFormatter'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'
import LocationInformation from './duplicate-location-components/LocationInformation'

export default function DuplicateLocationComparisonPage () {
  const location = useLocation()
  const navigate = useNavigate()
  const [existingOrNew, setExistingOrNew] = useState('')
  const [error, setError] = useState('')
  const existingLocation = location?.state?.existingLocation
  const newLocation = location?.state?.newLocation
  const numDuplicates = location?.state?.numDuplicates
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)

  // remove error if user changes selection
  useEffect(() => {
    if (error) {
      setError('')
    }
  }, [existingOrNew])

  const handleSubmit = async () => {
    if (existingOrNew === '') {
      setError(
        'Select if you want to keep the existing location or use the new location'
      )
    } else {
      // update location then navigate
      if (existingOrNew === 'New') {
        const locationToUpdate = webToGeoSafeLocation(newLocation)
        // change the location ID to the existing ID in geosafe
        locationToUpdate.id = existingLocation.id
        const dataToSend = { authToken, orgId, location: locationToUpdate }
        await backendCall(
          dataToSend,
          'api/location/update',
          navigate
        )
      }
      // need to remove the invalid location from elasticache
      const locationIdToRemove = newLocation.id
      await backendCall(
        { orgId, locationId: locationIdToRemove },
        'api/bulk_uploads/remove_invalid_location',
        navigate
      )

      if (numDuplicates === 1) {
        // navigate to link contacts, for now navigate to locations dashboard
        navigate(orgManageLocationsUrls.view.dashboard)
      } else {
        navigate(orgManageLocationsUrls.add.manageDuplicateLocationsPage,
          {
            state:
            {
              text: existingOrNew === 'Existing' ? `Existing ${existingLocation.additionals.locationName} kept` : `${newLocation.additionals.locationName} replaced`
            }
          }
        )
      }
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>
              {newLocation.additionals.locationName} already exists in this account
            </h1>
            <div className='govuk-body'>
              <div className='govuk-!-margin-bottom-6'>
                Select if you want to keep the existing location or use the new
                location uploaded.
              </div>
              <div className='org-location-comparison'>
                <div className='govuk-grid-column-one-half govuk-!-padding-left-0'>
                  <div className='outline-1px org-location-comparison-box'>
                    <div className='org-location-information-header govuk-heading-m govuk-!-margin-bottom-0'>
                      Existing Location
                    </div>
                    <LocationInformation location={existingLocation} />
                    <div className={`org-location-information-footer ${error && 'error'}`}>
                      <p className='govuk-!-margin-0'>Keep existing location</p>
                      <Radio
                        label=''
                        name='ExistingOrNewRadio'
                        small='true'
                        onChange={(e) => setExistingOrNew('Existing')}
                      />
                    </div>
                  </div>
                </div>
                <div className='govuk-grid-column-one-half govuk-!-padding-right-0'>
                  <div className='outline-1px org-location-comparison-box'>
                    <div className='org-location-information-header govuk-heading-m govuk-!-margin-bottom-0'>
                      New Location
                    </div>
                    <LocationInformation location={newLocation} comparedLocation={existingLocation} />
                    <div className={`org-location-information-footer ${error && 'error'}`}>
                      <p className='govuk-!-margin-0'>Use new location</p>
                      <Radio
                        label=''
                        name='ExistingOrNewRadio'
                        small='true'
                        onChange={(e) => setExistingOrNew('New')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button
              className='govuk-button govuk-!-margin-top-6'
              text='Continue'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </main>
    </>
  )
}
