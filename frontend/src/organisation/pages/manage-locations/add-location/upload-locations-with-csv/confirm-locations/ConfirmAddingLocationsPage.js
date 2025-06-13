import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../../../../../common/components/custom/LoadingSpinner'
import Button from '../../../../../../common/components/gov-uk/Button'
import Details from '../../../../../../common/components/gov-uk/Details'
import { backendCall } from '../../../../../../common/services/BackendService'
import { geoSafeToWebLocation } from '../../../../../../common/services/formatters/LocationFormatter'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ConfirmAddingLocationsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const validLocations = location?.state?.valid || 0
  const duplicateLocations = location?.state?.duplicates || 0
  const notFoundLocations = useSelector(
    (state) => state.session.notFoundLocations
  )
  const notInEnglandLocations = useSelector(
    (state) => state.session.notInEnglandLocations
  )

  const totalLocations =
    validLocations +
    duplicateLocations +
    notFoundLocations +
    notInEnglandLocations
  const fileName = location?.state?.fileName || ''
  const orgId = useSelector((state) => state.session.orgId)
  const authToken = useSelector((state) => state.session.authToken)
  const [saveLocations, setSaveLocations] = useState(false)
  const [stage, setStage] = useState('Adding locations')

  useEffect(() => {
    if (saveLocations) {
      const upload = async () => {
        const dataToSend = { authToken, orgId, fileName }
        await backendCall(
          dataToSend,
          'api/bulk_uploads/save_locations',
          navigate
        )
      }
      upload()
      const interval = setInterval(async function getStatus() {
        if (getStatus.isRunning) return
        getStatus.isRunning = true
        const dataToSend = { authToken }
        const { data } = await backendCall(
          dataToSend,
          'api/bulk_uploads/save_locations_status',
          navigate
        )
        if (data) {
          if (data?.stage !== stage) {
            setStage(data.stage)
          }
          if (data?.status === 'complete') {
            if (data?.data) {
              if (duplicateLocations > 0) {
                if (duplicateLocations === 1) {
                  const location = await getDupLocation()

                  // Get the existing location (note type is 'valid')
                  const existingLocation = geoSafeToWebLocation(
                    await getLocation(
                      orgId,
                      location.additionals.locationName,
                      'valid'
                    )
                  )

                  // Set the new, duplicate location
                  const newLocation = location

                  if (existingLocation && newLocation) {
                    // Now compare the two and let the use choose one
                    navigate(
                      orgManageLocationsUrls.add
                        .duplicateLocationComparisonPage,
                      {
                        state: {
                          existingLocation,
                          newLocation,
                          numDuplicates: duplicateLocations
                        }
                      }
                    )
                  }
                } else {
                  navigate(
                    orgManageLocationsUrls.add.duplicateLocationsOptionsPage,
                    {
                      state: {
                        addedLocations: data.data.valid,
                        numDuplicates: duplicateLocations
                      }
                    }
                  )
                }
              } else if (notFoundLocations > 0) {
                navigate(
                  orgManageLocationsUrls.unmatchedLocations.notFound.dashboard,
                  {
                    state: {
                      addedLocations: data.data.valid
                    }
                  }
                )
              } else if (notInEnglandLocations > 0) {
                navigate(
                  orgManageLocationsUrls.unmatchedLocations.notInEngland
                    .dashboard,
                  {
                    state: {
                      addedLocations: data.data.valid
                    }
                  }
                )
              }
            }
          }
        }
        getStatus.isRunning = false
      }, 2000)
      return () => {
        clearInterval(interval)
      }
    }
  }, [saveLocations])

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

  const getDupLocation = async () => {
    const dataToSend = { orgId }
    const { data } = await backendCall(
      dataToSend,
      'api/bulk_uploads/get_invalid_locations',
      navigate
    )
    const locations = []
    if (data) {
      const duplicates = data.filter(
        (location) =>
          location.error.includes('duplicate') && location?.error?.length === 1
      )
      duplicates.forEach((location) => {
        locations.push(geoSafeToWebLocation(location))
      })
    }
    return locations[0]
  }

  const handleCancel = async (event) => {
    event.preventDefault()
    navigate(orgManageLocationsUrls.view.dashboard)
  }

  const detailsMessage = (
    <div className='govuk-body'>
      <h1 className='govuk-heading-s'>Location partly matches an address</h1>
      <p>
        A location is recognised as an address but some of the information does
        not match ours, for example the street name or postcode.
      </p>
      <p>
        To find the correct address if it's partly matched, you can search from
        a drop-down list, match it to an address and then add it to your
        locations.
      </p>
      <h2 className='govuk-heading-s'>Address not found</h2>
      <p>
        A location is not recognised, for example it may be a new address or
        uses a building name instead of a street address. Or it may be because
        the information is incorrectly typed or formatted.
      </p>
      <p>
        To find an address you can drop a pin on a map to select the address
        location. This can then be added to your locations.
      </p>
    </div>
  )

  return (
    <>
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l' id='main-content'>
              {validLocations} of {totalLocations} location
              {totalLocations === 1 ? '' : 's'} can be added
            </h1>
            <div className='govuk-body'>
              <div className='govuk-inset-text'>
                {duplicateLocations > 0 && (
                  <div>
                    <strong>{duplicateLocations}</strong> location
                    {duplicateLocations === 1 ? '' : 's'} already exist
                    {duplicateLocations === 1 ? 's' : ''} with the same name in
                    this account. You can choose to keep the existing location
                    {duplicateLocations === 1 ? '' : 's'} or replace them with
                    the new location{duplicateLocations === 1 ? '' : 's'}{' '}
                    uploaded.
                  </div>
                )}
                {notFoundLocations > 0 && (
                  <div>
                    {/* Only need a break if there is text above */}
                    {duplicateLocations > 0 && <br />}
                    <div>
                      <strong>{notFoundLocations}</strong> location
                      {notFoundLocations === 1 ? '' : 's'} need
                      {notFoundLocations === 1 ? 's' : ''} to be found manually
                      in this account before{' '}
                      {notFoundLocations === 1 ? 'it' : 'they'} can be added.
                    </div>
                  </div>
                )}
                {notInEnglandLocations > 0 && (
                  <div>
                    {/* Only need a break if there is text above */}
                    {(duplicateLocations > 0 || notFoundLocations > 0) && (
                      <br />
                    )}
                    <div>
                      <strong>{notInEnglandLocations}</strong> location
                      {notInEnglandLocations === 1 ? '' : 's'} cannot be added
                      because{' '}
                      {notInEnglandLocations === 1 ? 'it is' : 'they are'} not
                      in England. You can check{' '}
                      {notInEnglandLocations === 1 ? '' : 'each of'} the
                      location's details and change{' '}
                      {notInEnglandLocations === 1 ? 'it' : 'them'} if you think
                      this is not correct.
                    </div>
                  </div>
                )}
              </div>
              <Details
                title='Why are some locations not found?'
                text={detailsMessage}
              />
              {validLocations > 0 && (
                <p>
                  You can do this after you add the {validLocations} location
                  {validLocations === 1 ? '' : 's'} that can be added now.
                </p>
              )}
            </div>
            <br />
            {/* TODO: add a loading spinner on click as saving can take a long time */}
            <Button
              text={
                validLocations > 0
                  ? `Add ${validLocations} location${
                      validLocations === 1 ? '' : 's'
                    }`
                  : 'Continue'
              }
              className='govuk-button govuk-button'
              onClick={(event) => {
                event.preventDefault()
                setSaveLocations(true)
              }}
            />
            &nbsp; &nbsp;
            <Button
              text='Cancel upload'
              className='govuk-button govuk-button--warning inline-block'
              onClick={handleCancel}
            />
          </div>
        </div>
      </main>
      {saveLocations && (
        <div className='popup-dialog'>
          <div className='popup-dialog-container govuk-!-padding-bottom-6'>
            <LoadingSpinner
              loadingText={<p className='govuk-body-l'>{`${stage}...`}</p>}
            />
          </div>
        </div>
      )}
    </>
  )
}
