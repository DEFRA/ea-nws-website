import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import NotificationBanner from '../../../../../../common/components/gov-uk/NotificationBanner'
import Radio from '../../../../../../common/components/gov-uk/Radio'
import WarningText from '../../../../../../common/components/gov-uk/WarningText'
import { backendCall } from '../../../../../../common/services/BackendService'
import { geoSafeToWebLocation, webToGeoSafeLocation } from '../../../../../../common/services/formatters/LocationFormatter'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function DuplicateLocationsOptionsPage () {
  const navigate = useNavigate()
  const [option, setOption] = useState('')
  const [error, setError] = useState('')
  const location = useLocation()
  const addedLocations = location?.state?.addedLocations || 0
  const duplicateLocations = location?.state?.numDuplicates
  const orgId = useSelector((state) => state.session.orgId)
  const [dupLocations, setDupLocations] = useState([])
  const authToken = useSelector((state) => state.session.authToken)

  useEffect(() => {
    const getDupLocations = async () => {
      const dataToSend = { orgId }
      const { data } = await backendCall(
        dataToSend,
        'api/bulk_uploads/get_invalid_locations',
        navigate
      )
      const locations = []
      if (data) {
        const duplicates = data.filter((location) => location.error.includes('duplicate'))
        duplicates.forEach((location) => {
          console.log(location)
          locations.push(geoSafeToWebLocation(location))
        })
      }
      setDupLocations(locations)
    }
    getDupLocations()
  }, [])

  const getLocation = async (orgId, locationName, type) => {
    const dataToSend = {
      orgId,
      locationName,
      type
    }
    const { data } = await backendCall(
      dataToSend,
      'api/locations/search',
      navigate
    )

    if (data && data.length === 1) {
      return data[0]
    } else {
      return null
    }
  }

  const options = [
    {
      value: 'KeepAll',
      label: 'Keep all existing locations already in this account'
    },
    {
      value: 'ReplaceAll',
      label:
        'Replace all the existing locations with the new locations uploaded'
    },
    {
      value: 'ViewDetails',
      label:
        "View the location's details and manually choose which ones to keep or replace"
    }
  ]

  // remove any errors if user changes search option
  useEffect(() => {
    setError('')
  }, [option])

  const handleSubmit = async () => {
    if (!option) {
      setError('Select what you want to do with the duplicate locations')
    } else {
      switch (option) {
        case options[0].value: {
          await Promise.all(dupLocations.map(async (location) => {
            const locationIdToRemove = location.id
            await backendCall(
              { orgId, locationId: locationIdToRemove },
              'api/bulk_uploads/remove_invalid_location',
              navigate
            )
          }))
          // change to link contacts
          navigate(orgManageLocationsUrls.view.dashboard,
            {
              state:
          { text: `${dupLocations.length} existing locations kept` }
            })
          break
        }
        case options[1].value: {
          await Promise.all(dupLocations.map(async (location) => {
            // get the exisitng location to use it's ID
            const existingLocation = await getLocation(orgId, location.additionals.locationName, 'valid')
            const locationToUpdate = webToGeoSafeLocation(location)
            // change the location ID to the existing ID in geosafe
            locationToUpdate.id = existingLocation.id
            // Update exisiting location in geosafe with new location
            const dataToSend = { authToken, orgId, location: locationToUpdate }
            await backendCall(
              dataToSend,
              'api/location/update',
              navigate
            )
            // remove location from invalid array
            const locationIdToRemove = location.id
            await backendCall(
              { orgId, locationId: locationIdToRemove },
              'api/bulk_uploads/remove_invalid_location',
              navigate
            )
          }))
          // change to link contacts
          navigate(orgManageLocationsUrls.view.dashboard,
            {
              state:
          { text: `${dupLocations.length} existing locations replaced` }
            })
          break
        }
        case options[2].value: {
          navigate(orgManageLocationsUrls.add.manageDuplicateLocationsPage)
          break
        }
        default:
          break
      }
    }
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      {addedLocations > 0 && (
        <NotificationBanner
          className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-bottom-10 govuk-!-margin-top-5'
          title='Success'
          text={`${addedLocations} locations added`}
        />
      )}
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>
              {duplicateLocations} locations already exist with the same
              name in this account
            </h1>
            <div
              className={
                error
                  ? 'govuk-form-group govuk-form-group--error'
                  : 'govuk-form-group'
              }
            >
              <fieldset className='govuk-fieldset'>
                <legend className='govuk-fieldset__legend'>
                  What do you want to do with the duplicate locations?
                </legend>
                {error && <p className='govuk-error-message'>{error}</p>}
                {options.map((option) => (
                  <Radio
                    key={option.value}
                    id={option.value}
                    name='optionsRadios'
                    label={option.label}
                    type='radio'
                    value={option.value}
                    onChange={() => setOption(option.value)}
                  />
                ))}
              </fieldset>
            </div>
            <WarningText text='Any new locations uploaded that are duplicates will not be saved to this account if you do not manage them now. The existing location with the same name will be kept in this account.' />
            <div className='govuk-body'>
              If you view the location's details, you can print a list of all
              the duplicate locations. If you want to then replace the existing
              locations with new ones, you'll need to either reupload them in a
              new CSV file or replace each one manually in this account.
            </div>
            <br />
            <Button
              text='Continue'
              className='govuk-button'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </main>
    </>
  )
}
