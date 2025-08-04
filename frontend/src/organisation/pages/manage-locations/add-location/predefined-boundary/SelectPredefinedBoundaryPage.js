import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import Select from '../../../../../common/components/gov-uk/Select'
import AlertType from '../../../../../common/enums/AlertType'
import LocationDataType from '../../../../../common/enums/LocationDataType'
import store from '../../../../../common/redux/store'
import {
  setConsecutiveBoundariesAdded,
  setCurrentLocation,
  setCurrentLocationDataType,
  setCurrentLocationGeocode,
  setCurrentLocationName,
  setCurrentLocationType,
  setPredefinedBoundaryFlow,
  setSelectedBoundary,
  setSelectedBoundaryType
} from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import {
  getBoundaryTypes,
  getFloodAreasFromShape
} from '../../../../../common/services/WfsFloodDataService'
import {
  geoSafeToWebLocation,
  webToGeoSafeLocation
} from '../../../../../common/services/formatters/LocationFormatter'
import { formatSentenceCase } from '../../../../../common/utils/FormatSentenceCase'
import Map from '../../../../components/custom/Map'
import PredefinedBoundaryKey from '../../../../components/custom/PredefinedBoundaryKey'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function SelectPredefinedBoundaryPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [boundaryTypeError, setBoundaryTypeError] = useState('')
  const [boundaryError, setBoundaryError] = useState('')
  const [boundaryTypes, setBoundaryTypes] = useState([])
  const [boundaries, setBoundaries] = useState([])
  const [boundariesAlreadyAdded, setBoundariesAlreadyAdded] = useState([])
  const selectedBoundaryType = useSelector(
    (state) => state.session.selectedBoundaryType
  )
  const selectedBoundary = useSelector(
    (state) => state.session.selectedBoundary
  )
  const consecutiveBoundariesAdded = useSelector(
    (state) => state.session.consecutiveBoundariesAdded
  )
  const authToken = useSelector((state) => state.session.authToken)
  const boundaryTypeId = 'BoundaryType'
  const boundaryId = 'Boundary'

  const [partnerId, setPartnerId] = useState(false)

  async function getPartnerId() {
    const { data } = await backendCall('data', 'api/service/get_partner_id')
    setPartnerId(data)
  }

  async function getBoundarysAlreadyAdded() {
    const { data: locationsData, errorMessage } = await backendCall(
      { authToken },
      'api/elasticache/list_locations',
      navigate
    )
    const locations = locationsData?.map(geoSafeToWebLocation) || []

    const boundaryLocations = locations.filter(
      (loc) =>
        loc.additionals.other.location_data_type === LocationDataType.BOUNDARY
    )

    setBoundariesAlreadyAdded(boundaryLocations)
  }

  // Get boundary types
  useEffect(() => {
    const getBoundaryTypesList = async () => {
      const boundaryTypesList = await getBoundaryTypes()
      setBoundaryTypes(boundaryTypesList)
    }
    getBoundaryTypesList()
    getBoundarysAlreadyAdded()
    getPartnerId()
  }, [])

  useEffect(() => {
    setBoundaryTypeError('')
  }, [selectedBoundaryType])

  useEffect(() => {
    setBoundaryError('')
  }, [selectedBoundary])

  const onBoundaryTypeSelected = (boundaryType) => {
    dispatch(setSelectedBoundaryType(boundaryType))
  }

  const onBoundarySelected = (boundaryName) => {
    const boundarySelected = boundaries.find(
      (boundary) => boundary.properties.TA_Name === boundaryName
    )

    dispatch(setSelectedBoundary(boundarySelected))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!selectedBoundaryType) {
      setBoundaryTypeError('Select a boundary type')
    }

    if (!selectedBoundary) {
      setBoundaryError('Select a boundary')
    }

    if (selectedBoundaryType && selectedBoundary) {
      dispatch(setCurrentLocationName(selectedBoundary.properties.TA_Name))
      dispatch(setCurrentLocationGeocode(selectedBoundary.properties.TA_CODE))
      dispatch(setCurrentLocationType(selectedBoundaryType))
      dispatch(setCurrentLocationDataType(LocationDataType.BOUNDARY))
      // since we added to currentLocation we need to get that information to pass to the api
      const locationToAdd = store.getState().session.currentLocation

      // Set default alert types
      const newWebLocation = geoSafeToWebLocation(
        JSON.parse(JSON.stringify(locationToAdd))
      )
      // get the target areas
      const TAs = await getFloodAreasFromShape(selectedBoundary?.geometry)
      newWebLocation.additionals.other.targetAreas = []
      TAs.forEach((area) => {
        newWebLocation.additionals.other.targetAreas.push({
          TA_CODE: area.properties?.TA_CODE,
          TA_Name: area.properties?.TA_Name,
          category: area.properties?.category
        })
      })
      newWebLocation.additionals.other.riverSeaRisk = 'unavailable'
      newWebLocation.additionals.other.groundWaterRisk = 'unavailable'

      // Set alert types
      newWebLocation.additionals.other.alertTypes = []
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
      newWebLocation.additionals.other.targetAreas.some(
        (area) => categoryToType(area.category) === 'warning'
      ) &&
        newWebLocation.additionals.other.alertTypes.push(
          AlertType.SEVERE_FLOOD_WARNING,
          AlertType.FLOOD_WARNING,
          AlertType.REMOVE_FLOOD_SEVERE_WARNING,
          AlertType.REMOVE_FLOOD_WARNING
        )

      newWebLocation.additionals.other.targetAreas.some(
        (area) => categoryToType(area.category) === 'alert'
      ) &&
        newWebLocation.additionals.other.alertTypes.push(AlertType.FLOOD_ALERT)

      const newGeosafeLocation = webToGeoSafeLocation(newWebLocation)

      const dataToSend = { authToken, location: newGeosafeLocation }
      const { data } = await backendCall(
        dataToSend,
        'api/location/create',
        navigate
      )
      if (data) {
        const registerData = {
          authToken,
          locationId: data.id,
          partnerId,
          params: {
            channelVoiceEnabled: true,
            channelSmsEnabled: true,
            channelEmailEnabled: true,
            channelMobileAppEnabled: true,
            partnerCanView: true,
            partnerCanEdit: true,
            alertTypes: newWebLocation.additionals.other.alertTypes
          }
        }

        await backendCall(
          registerData,
          'api/location/register_to_partner',
          navigate
        )

        dispatch(setCurrentLocation(data))
        dispatch(setConsecutiveBoundariesAdded(consecutiveBoundariesAdded + 1))
        dispatch(setPredefinedBoundaryFlow(true))
        navigate(orgManageLocationsUrls.add.optionalInformation.optionalInfo)
      }
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    dispatch(setSelectedBoundaryType(null))
    dispatch(setSelectedBoundary(null))
    dispatch(setPredefinedBoundaryFlow(false))
    navigate(-1)
  }

  return (
    <>
      <Helmet>
        <title>
          Select a predefined boundary for this location - Manage locations -
          Get flood warnings (professional) - GOV.UK
        </title>
      </Helmet>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {(boundaryTypeError || boundaryError) && (
              <ErrorSummary
                errorList={[
                  { text: boundaryTypeError, componentId: boundaryTypeId },
                  { text: boundaryError, componentId: boundaryId }
                ]}
              />
            )}
            <h1 className='govuk-heading-l' id='main-content'>
              Add predefined boundary
            </h1>
            <div className='govuk-body'>
              <p>Select a boundary to add to this account.</p>
              <div className='govuk-grid-row'>
                <div className='govuk-grid-column-one-third'>
                  <br />
                  <Select
                    id={boundaryTypeId}
                    name='BoundaryType'
                    label='Boundary type'
                    options={boundaryTypes}
                    onSelect={onBoundaryTypeSelected}
                    error={boundaryTypeError}
                    initialSelectOptionText={
                      selectedBoundaryType
                        ? formatSentenceCase(selectedBoundaryType)
                        : 'Select type'
                    }
                    snakeCaseText={true}
                  />
                  <Select
                    id={boundaryId}
                    name='Boundary'
                    label='Boundary'
                    options={boundaries
                      .slice() // create a shallow copy to avoid mutating orignal values
                      .sort((a, b) =>
                        a.properties.TA_Name.localeCompare(b.properties.TA_Name)
                      )
                      .map((boundary) => {
                        return boundary.properties.TA_Name
                      })}
                    onSelect={onBoundarySelected}
                    error={boundaryError}
                    initialSelectOptionText={
                      selectedBoundary
                        ? selectedBoundary.properties.TA_Name
                        : 'Select boundary'
                    }
                    disabledOptions={boundariesAlreadyAdded.map((boundary) => {
                      return boundary.additionals.locationName
                    })}
                    value={selectedBoundary?.properties?.TA_Name}
                  />
                  <Button
                    className='govuk-button govuk-!-margin-top-4'
                    text='Add predefined boundary'
                    onClick={(event) => handleSubmit(event)}
                  />
                </div>
                <div className='govuk-grid-column-two-thirds'>
                  <Map
                    type='boundary'
                    showFloodWarningAreas={false}
                    showFloodAlertAreas={false}
                    zoomLevel={1}
                    boundaryList={(val) => setBoundaries(val)}
                    boundariesAlreadyAdded={boundariesAlreadyAdded.map(
                      (boundary) => {
                        return boundary.additionals.locationName
                      }
                    )}
                  />
                  <div>
                    <PredefinedBoundaryKey />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
