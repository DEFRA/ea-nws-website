import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import Select from '../../../../../common/components/gov-uk/Select'
import {
  setSelectedBoundary,
  setSelectedBoundaryType
} from '../../../../../common/redux/userSlice'
import { getBoundaryTypes } from '../../../../../common/services/WfsFloodDataService'
import Map from '../../../../components/custom/Map'
import PredefinedBoundaryKey from '../../../../components/custom/PredefinedBoundaryKey'

export default function SelectPredefinedBoundaryPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [boundaryTypeError, setBoundaryTypeError] = useState('')
  const [boundaryError, setBoundaryError] = useState('')
  const [boundaryTypes, setBoundaryTypes] = useState([])
  const [boundaries, setBoundaries] = useState([])
  const selectedBoundaryType = useSelector(
    (state) => state.session.selectedBoundaryType
  )
  const selectedBoundary = useSelector(
    (state) => state.session.selectedBoundary
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

  const onBoundaryTypeSelected = (boundaryType) => {
    dispatch(setSelectedBoundaryType(boundaryType))
  }

  const onBoundarySelected = (boundaryName) => {
    const boundarySelected = boundaries.find(
      (boundary) => boundary.properties.NAME === boundaryName
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
                    key={selectedBoundary}
                    label='Boundary'
                    options={boundaries.map((boundary) => {
                      return boundary.properties.NAME
                    })}
                    onSelect={onBoundarySelected}
                    error={boundaryError}
                    initialSelectOptionText={
                      selectedBoundary
                        ? selectedBoundary.properties.NAME
                        : 'Select boundary'
                    }
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
