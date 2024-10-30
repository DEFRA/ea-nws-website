import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import Select from '../../../../../common/components/gov-uk/Select'
import {
  setConsecutiveBoundariesAdded,
  setCurrentLocationGeometry,
  setCurrentLocationName,
  setLocationBoundaries,
  setSelectedBoundary,
  setSelectedBoundaryType
} from '../../../../../common/redux/userSlice'
import { getBoundaryTypes } from '../../../../../common/services/WfsFloodDataService'
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

  // Get boundary types
  useEffect(() => {
    const getBoundaryTypesList = async () => {
      const boundaryTypesList = await getBoundaryTypes()
      setBoundaryTypes(boundaryTypesList)
    }
    getBoundaryTypesList()
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
      (boundary) => boundary.properties.layer === boundaryName
    )

    dispatch(setSelectedBoundary(boundarySelected))
  }

  const handleSubmit = () => {
    if (!selectedBoundaryType) {
      setBoundaryTypeError('Select a boundary type')
    }

    if (!selectedBoundary) {
      setBoundaryError('Select a boundary')
    }

    // update profile to add location and navigate
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
      dispatch(
        setCurrentLocationName(
          locationBoundary.boundary_type +
            ', ' +
            locationBoundary.boundary.properties.layer
        )
      )
      dispatch(setConsecutiveBoundariesAdded(consecutiveBoundariesAdded + 1))
      navigate(orgManageLocationsUrls.add.predefinedBoundary.addAnother)
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    dispatch(setSelectedBoundaryType(null))
    dispatch(setSelectedBoundary(null))
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
              <div class='govuk-grid-row'>
                <div class='govuk-grid-column-one-third'>
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
                      return boundary.properties.layer
                    })}
                    onSelect={onBoundarySelected}
                    error={boundaryError}
                    initialSelectOptionText={
                      selectedBoundary
                        ? selectedBoundary.properties.layer
                        : 'Select boundary'
                    }
                    disabledOptions={boundariesAlreadyAdded.map((boundary) => {
                      return boundary.properties.layer
                    })}
                  />
                  <Button
                    className='govuk-button govuk-!-margin-top-4'
                    text='Add predefined boundary'
                    onClick={handleSubmit}
                  />
                </div>
                <div class='govuk-grid-column-two-thirds'>
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
