import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import Select from '../../../../../common/components/gov-uk/Select'
import AlertType from '../../../../../common/enums/AlertType'
import store from '../../../../../common/redux/store'
import {
  setConsecutiveBoundariesAdded, setCurrentLocation, setCurrentLocationGeometry, setCurrentLocationName,
  setCurrentLocationType,
  setLocationBoundaries,
  setPredefinedBoundaryFlow,
  setSelectedBoundary,
  setSelectedBoundaryType
} from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import { getBoundaryTypes, getFloodAreasFromShape } from '../../../../../common/services/WfsFloodDataService'
import { geoSafeToWebLocation, webToGeoSafeLocation } from '../../../../../common/services/formatters/LocationFormatter'
import Map from '../../../../components/custom/Map'
import PredefinedBoundaryKey from '../../../../components/custom/PredefinedBoundaryKey'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function SelectPredefinedBoundaryPage () {
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
  const locationBoundaries = useSelector(
    (state) => state.session.locationBoundaries
  )
  const consecutiveBoundariesAdded = useSelector(
    (state) => state.session.consecutiveBoundariesAdded
  )
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)

  const [partnerId, setPartnerId] = useState(false)

  async function getPartnerId () {
    const { data } = await backendCall('data', 'api/service/get_partner_id')
    setPartnerId(data)
  }

  // Get boundary types
  useEffect(() => {
    const getBoundaryTypesList = async () => {
      const boundaryTypesList = await getBoundaryTypes()
      setBoundaryTypes(boundaryTypesList)
    }
    getBoundaryTypesList()
    getPartnerId()
  }, [])

  useEffect(() => {
    setBoundaryTypeError('')
  }, [selectedBoundaryType])

  useEffect(() => {
    setBoundaryError('')
  }, [selectedBoundary])

  useEffect(() => {
    if (locationBoundaries) {
      setBoundariesAlreadyAdded(
        locationBoundaries
          .filter((locationBoundary) => {
            return locationBoundary.boundary_type === selectedBoundaryType
          })
          .map((locationBoundary) => {
            return locationBoundary.boundary
          })
      )
    } else {
      setBoundariesAlreadyAdded([])
    }
  }, [selectedBoundaryType, locationBoundaries])

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
      const locationBoundary = {
        boundary_type: selectedBoundaryType,
        boundary: selectedBoundary
      }
      locationBoundaries
        ? dispatch(
          setLocationBoundaries([...locationBoundaries, locationBoundary])
        )
        : dispatch(setLocationBoundaries([locationBoundary]))
      dispatch(
        setCurrentLocationGeometry({
          geoJson: JSON.stringify(locationBoundary.boundary)
        })
      )
      // This might change at a later date, but store in the additional name field for now
      dispatch(setCurrentLocationName(locationBoundary.boundary.properties.TA_Name))
      dispatch(setCurrentLocationType(locationBoundary.boundary_type))
      // since we added to currentLocation we need to get that information to pass to the api
      const locationToAdd = store.getState().session.currentLocation

      // Set default alert types
      const newWebLocation = geoSafeToWebLocation(locationToAdd)
      newWebLocation.additionals.other.alertTypes = [AlertType.SEVERE_FLOOD_WARNING, AlertType.FLOOD_WARNING, AlertType.FLOOD_ALERT]
      // get the target areas
      const TAs = await getFloodAreasFromShape(newWebLocation?.geometry?.geoJson)
      newWebLocation.additionals.other.targetAreas = []
      TAs.forEach((area) => {
        newWebLocation.additionals.other.targetAreas.push({
          TA_CODE: area.properties?.TA_CODE,
          TA_Name: area.properties?.TA_Name,
          category: area.properties?.category
        })
      })
      
      const newGeosafeLocation = webToGeoSafeLocation(newWebLocation)

      const dataToSend = { authToken, orgId, location: newGeosafeLocation }
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
            alertTypes: [AlertType.SEVERE_FLOOD_WARNING, AlertType.FLOOD_WARNING, AlertType.FLOOD_ALERT]
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
        // TODO: This needs to navigate to optional info page once it has been developed
        navigate(orgManageLocationsUrls.add.optionalInformation.addActionPlan)
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
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {(boundaryTypeError || boundaryError) && (
              <ErrorSummary errorList={[boundaryTypeError, boundaryError]} />
            )}
            <h1 className='govuk-heading-l'>Add predefined boundary</h1>
            <div className='govuk-body'>
              <p>Select a boundary to add to this account.</p>
              <div className='govuk-grid-row'>
                <div className='govuk-grid-column-one-third'>
                  <br />
                  <Select
                    name='BoundaryType'
                    label='Boundary type'
                    options={boundaryTypes}
                    onSelect={onBoundaryTypeSelected}
                    error={boundaryTypeError}
                    initialSelectOptionText={
                      selectedBoundaryType || 'Select type'
                    }
                  />
                  <Select
                    // key forces the boundary select to re-render after the boundary type is changed
                    // when boundary type is changed, the selected boundary is reset. we must force this
                    // re-render for the intial text option to show correctly
                    name='Boundary'
                    key={selectedBoundary}
                    label='Boundary'
                    options={boundaries.map((boundary) => {
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
                      return boundary.properties.TA_Name
                    })}
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
                        return boundary.id
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
