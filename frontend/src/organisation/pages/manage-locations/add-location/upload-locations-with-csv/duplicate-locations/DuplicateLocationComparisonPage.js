import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../../../common/components/gov-uk/Radio'
import AlertType from '../../../../../../common/enums/AlertType'
import LocationDataType from '../../../../../../common/enums/LocationDataType'
import {
    setNotFoundLocations,
    setNotInEnglandLocations
} from '../../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../../common/services/BackendService'
import {
  getFloodAreas,
  getFloodAreasFromShape,
  getGroundwaterFloodRiskRatingOfLocation,
  getRiversAndSeaFloodRiskRatingOfLocation
} from '../../../../../../common/services/WfsFloodDataService'
import { webToGeoSafeLocation } from '../../../../../../common/services/formatters/LocationFormatter'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'
import { useVerifyLocationInFloodArea } from '../../not-flood-area/verfiyLocationInFloodAreaAndNavigate'
import LocationInformation from './duplicate-location-components/LocationInformation'

export default function DuplicateLocationComparisonPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const verifyLocationInFloodAreaAndNavigate = useVerifyLocationInFloodArea()
  const [existingOrNew, setExistingOrNew] = useState('')
  const [error, setError] = useState('')
  const existingLocation = location?.state?.existingLocation
  const newLocation = location?.state?.newLocation
  const numDuplicates = location?.state?.numDuplicates
  const flow = location?.state?.flow || null
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)
  const existingOrNewRadiosId = 'existing-or-new-radios'

  const notFoundLocations = useSelector(
    (state) => state.session.notFoundLocations
  )
  const notInEnglandLocations = useSelector(
    (state) => state.session.notInEnglandLocations
  )

  const [partnerId, setPartnerId] = useState(false)

  async function getPartnerId() {
    const { data } = await backendCall('data', 'api/service/get_partner_id')
    setPartnerId(data)
  }

  useEffect(() => {
    getPartnerId()
  }, [])

  // remove error if user changes selection
  useEffect(() => {
    if (error) {
      setError('')
    }
  }, [existingOrNew])

  const navigateToNextPage = (url) => {
    navigate(url, {
      state: {
        text:
          existingOrNew === 'Existing'
            ? `Existing ${existingLocation.additionals.locationName} kept`
            : `${newLocation.additionals.locationName} replaced`
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (existingOrNew === '') {
      setError(
        'Select if you want to keep the existing location or use the new location'
      )
    } else {
      // update location then navigate
      if (existingOrNew === 'New') {
        if (
          newLocation.additionals.other.location_data_type ===
          LocationDataType.X_AND_Y_COORDS
        ) {
          const TAs = await getFloodAreas(
            newLocation.coordinates.latitude,
            newLocation.coordinates.longitude
          )
          newLocation.additionals.other.targetAreas = []
          TAs.forEach((area) => {
            newLocation.additionals.other.targetAreas.push({
              TA_CODE: area.properties?.TA_CODE,
              TA_Name: area.properties?.TA_Name,
              category: area.properties?.category
            })
          })
          newLocation.additionals.other.riverSeaRisk =
            await getRiversAndSeaFloodRiskRatingOfLocation(
              newLocation.coordinates.latitude,
              newLocation.coordinates.longitude
            )
          newLocation.additionals.other.groundWaterRisk =
            await getGroundwaterFloodRiskRatingOfLocation(
              newLocation.coordinates.latitude,
              newLocation.coordinates.longitude
            )
        } else if (newLocation?.geometry?.geoJson) {
          const TAs = await getFloodAreasFromShape(
            newLocation?.geometry?.geoJson
          )
          newLocation.additionals.other.targetAreas = []
          TAs.forEach((area) => {
            newLocation.additionals.other.targetAreas.push({
              TA_CODE: area.properties?.TA_CODE,
              TA_Name: area.properties?.TA_Name,
              category: area.properties?.category
            })
          })
          newLocation.additionals.other.riverSeaRisk = 'unavailable'
          newLocation.additionals.other.groundWaterRisk = 'unavailable'
        } else {
          newLocation.additionals.other.targetAreas = []
          newLocation.additionals.other.riverSeaRisk = 'unavailable'
          newLocation.additionals.other.groundWaterRisk = 'unavailable'
        }

        // Set alert types
        newLocation.additionals.other.alertTypes = []
        const categoryToType = (type) => {
          const typeMap = {
            'Flood Warning': 'warning',
            'Flood Warning Groundwater': 'warning',
            'Flood Warning Rapid Response': 'warning',
            'Flood Alert': 'alert',
            'Flood Alert Groundwater': 'alert'
          }
          return typeMap[type] || []
        }
        newLocation.additionals.other.targetAreas.some(
          (area) => categoryToType(area.category) === 'warning'
        ) &&
          newLocation.additionals.other.alertTypes.push(
            AlertType.SEVERE_FLOOD_WARNING,
            AlertType.FLOOD_WARNING,
            AlertType.REMOVE_FLOOD_SEVERE_WARNING,
            AlertType.REMOVE_FLOOD_WARNING
          )

        newLocation.additionals.other.targetAreas.some(
          (area) => categoryToType(area.category) === 'alert'
        ) &&
          newLocation.additionals.other.alertTypes.push(AlertType.FLOOD_ALERT)

        const locationToUpdate = webToGeoSafeLocation(
          JSON.parse(JSON.stringify(newLocation))
        )
        // change the location ID to the existing ID in geosafe
        locationToUpdate.id = existingLocation.id
        const dataToSend = { authToken, orgId, location: locationToUpdate }
        await backendCall(dataToSend, 'api/location/update', navigate)
        // update registrations as the new location will have all alerts enabled by default
        const registerData = {
          authToken,
          locationId: locationToUpdate.id,
          partnerId,
          params: {
            channelVoiceEnabled: true,
            channelSmsEnabled: true,
            channelEmailEnabled: true,
            channelMobileAppEnabled: true,
            partnerCanView: true,
            partnerCanEdit: true,
            alertTypes: newLocation.additionals.other.alertTypes
          }
        }

        await backendCall(
          registerData,
          'api/location/update_registration',
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
        if (notFoundLocations > 1) {
          flow?.includes('not-found') &&
            dispatch(setNotFoundLocations(notFoundLocations - 1))
          navigateToNextPage(
            orgManageLocationsUrls.unmatchedLocations.notFound.dashboard
          )
        } else if (notInEnglandLocations > 1) {
          flow?.includes('not-in-england') &&
            dispatch(setNotInEnglandLocations(notInEnglandLocations - 1))
          navigateToNextPage(
            orgManageLocationsUrls.unmatchedLocations.notInEngland.dashboard
          )
        } else if (
          newLocation.additionals.other?.location_data_type ===
            LocationDataType.SHAPE_POLYGON ||
          newLocation.additionals.other?.location_data_type ===
            LocationDataType.SHAPE_LINE
        ) {
          await verifyLocationInFloodAreaAndNavigate(
            orgManageLocationsUrls.add.linkLocationToContacts
          )
        } else {
          navigate(orgManageLocationsUrls.add.contactLinkInfo)
        }
      } else {
        navigateToNextPage(
          orgManageLocationsUrls.add.manageDuplicateLocationsPage
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
      <Helmet>
        <title>Duplicate location comparison - Manage locations - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            {error && <ErrorSummary errorList={[{text: error, componentId: existingOrNewRadiosId}]} />}
            <h1 className='govuk-heading-l' id='main-content'>
              {newLocation.additionals.locationName} already exists in this
              account
            </h1>
            <div className='govuk-body'>
              <div className='govuk-!-margin-bottom-6'>
                Select if you want to keep the existing location or use the new
                location uploaded.
              </div>
              <div id={existingOrNewRadiosId} className='org-location-comparison'>
                <div className='govuk-grid-column-one-half govuk-!-padding-left-0'>
                  <div className='outline-1px org-location-comparison-box'>
                    <div className='org-location-information-header govuk-heading-m govuk-!-margin-bottom-0'>
                      Existing Location
                    </div>
                    <LocationInformation location={existingLocation} />
                    <div
                      className={`org-location-information-footer ${
                        error && 'error'
                      }`}
                    >
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
                    <LocationInformation
                      location={newLocation}
                      comparedLocation={existingLocation}
                    />
                    <div
                      className={`org-location-information-footer ${
                        error && 'error'
                      }`}
                    >
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
