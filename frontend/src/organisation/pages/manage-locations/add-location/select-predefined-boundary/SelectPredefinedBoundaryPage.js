import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import Select from '../../../../../common/components/gov-uk/Select'
import {
  getBoundaries,
  getBoundaryTypes
} from '../../../../../common/services/WfsFloodDataService'
import Map from '../../../../components/custom/Map'

export default function SelectPredefinedBoundaryPage() {
  const navigate = useNavigate()

  const [boundaryTypeError, setBoundaryTypeError] = useState('')
  const [boundaryError, setBoundaryError] = useState('')
  const [boundaryTypes, setBoundaryTypes] = useState([])
  const [boundaryType, setBoundaryType] = useState('')
  const [boundaries, setBoundaries] = useState([])
  const [boundary, setBoundary] = useState('')

  // Get boundary types
  useEffect(() => {
    const asyncGetBoundaryTypes = async () => {
      setBoundaryTypes(await getBoundaryTypes())
    }
    asyncGetBoundaryTypes()
  }, [])

  useEffect(() => {
    setBoundaryTypeError('')
  }, [boundaryType])

  useEffect(() => {
    setBoundaryError('')
  }, [boundary])

  const onBoundaryTypeSelected = async (boundaryType) => {
    setBoundaryType(boundaryType)
    setBoundaries(await getBoundaries(boundaryType))
  }

  const onBoundarySelected = (boundary) => {
    setBoundary(boundary)
  }

  const handleSubmit = async () => {
    if (!boundaryType) {
      setBoundaryTypeError('Select a boundary type')
    }

    if (!boundary) {
      setBoundaryError('Select a boundary')
    }

    if (boundaryType && boundary) {
      // TODO: What do we do now??? Navigate somewhere?
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
                    initialSelectOptionText='Select type'
                  />
                  <Select
                    label='Boundary'
                    options={boundaries}
                    onSelect={onBoundarySelected}
                    error={boundaryError}
                    initialSelectOptionText='Select boundary'
                  />
                  <Button
                    className='govuk-button govuk-!-margin-top-4'
                    text='Add predefined boundary'
                    onClick={handleSubmit}
                  />
                </div>
                <div class='govuk-grid-column-two-thirds'>
                  <Map
                  // setCoordinates={setPinCoords}
                  // type='drop'
                  // showFloodWarningAreas={showFloodWarningAreas}
                  // showFloodAlertAreas={showFloodAlertAreas}
                  // showMarker={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
