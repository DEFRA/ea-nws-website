import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../../../../common/components/gov-uk/Input'
import {
  getLocationAdditional,
  getLocationOther,
  setCurrentLocationCoordinates,
  setCurrentLocationEasting,
  setCurrentLocationNorthing
} from '../../../../../../common/redux/userSlice'
import { convertCoordinatesToEspg4326 } from '../../../../../../common/services/CoordinatesFormatConverter'
import { locationInEngland } from '../../../../../../common/services/validations/LocationInEngland'
import { xCoordinateValidation } from '../../../../../../common/services/validations/XCoordinateValidation'
import { yCoordinateValidation } from '../../../../../../common/services/validations/YCoordinateValidation'

export default function LocationXYCoordinatesSearchLayout ({
  navigateToNextPage,
  navigateToNotInEngland,
  flow
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentXCoordinate = useSelector((state) =>
    getLocationOther(state, 'x_coordinate')
  )
  const currentYCoordinate = useSelector((state) =>
    getLocationOther(state, 'y_coordinate')
  )
  const [xCoordinate, setXCoordinate] = useState(currentXCoordinate || '')
  const [xCoordinateError, setXCoordinateError] = useState('')
  const [yCoordinate, setYCoordinate] = useState(currentYCoordinate || '')
  const [yCoordinateError, setYCoordinateError] = useState('')

  useEffect(() => {
    if (xCoordinateError) {
      setXCoordinateError('')
    }
    if (yCoordinateError) {
      setYCoordinateError('')
    }
  }, [xCoordinate, yCoordinate])

  const LocationDetails = () => {
    const locationName = useSelector((state) =>
      getLocationAdditional(state, 'locationName')
    )
    const locationFullAddress = useSelector((state) =>
      getLocationOther(state, 'full_address')
    )
    const locationXcoordinate = useSelector((state) =>
      getLocationOther(state, 'x_coordinate')
    )
    const locationYcoordinate = useSelector((state) =>
      getLocationOther(state, 'y_coordinate')
    )

    return (
      <div className='govuk-inset-text'>
        <strong>{locationName}</strong>
        {locationFullAddress && (
          <>
            <br />
            {locationFullAddress}
          </>
        )}
        <br />
        {locationXcoordinate && locationYcoordinate && (
          <>
            <br />
            {locationXcoordinate}, {locationYcoordinate}
          </>
        )}
      </div>
    )
  }

  const handleSubmit = async () => {
    const xCoordinateValidationError = xCoordinateValidation(xCoordinate)
    if (xCoordinateValidationError) {
      setXCoordinateError(xCoordinateValidationError)
    }

    const yCoordinateValidationError = yCoordinateValidation(yCoordinate)
    if (yCoordinateValidationError) {
      setYCoordinateError(yCoordinateValidationError)
    }

    if (!xCoordinateValidationError && !yCoordinateValidationError) {
      const { latitude, longitude } = convertCoordinatesToEspg4326(
        Number(xCoordinate),
        Number(yCoordinate)
      )

      if (await locationInEngland(latitude, longitude)) {
        const coordinates = { latitude, longitude }
        dispatch(setCurrentLocationCoordinates(coordinates))
        dispatch(setCurrentLocationEasting(Number(xCoordinate)))
        dispatch(setCurrentLocationNorthing(Number(yCoordinate)))

        navigateToNextPage()
      } else {
        navigateToNotInEngland()
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
      <main className='govuk-main-wrapper govuk-!-padding-top-8'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            {(xCoordinateError || yCoordinateError) && (
              <ErrorSummary errorList={[xCoordinateError, yCoordinateError]} />
            )}
            <h1 className='govuk-heading-l'>
              What are the X and Y coordinates?
            </h1>

            {flow?.includes('unmatched-locations') && <LocationDetails />}

            <div className='govuk-body'>
              <Input
                name='X coordinate'
                hint="A number representing how far east or west a location is (also known as an 'easting'), for example: 362105."
                inputType='text'
                value={xCoordinate}
                onChange={(val) => setXCoordinate(val)}
                error={xCoordinateError}
                isNameBold
                className='govuk-input govuk-input--width-20'
              />
              <Input
                name='Y coordinate'
                hint="A number representing how far north or south a location is (also known as a 'northing'), for example: 387217."
                inputType='text'
                value={yCoordinate}
                onChange={(val) => setYCoordinate(val)}
                error={yCoordinateError}
                isNameBold
                className='govuk-input govuk-input--width-20'
              />
              <Button
                text='Continue'
                className='govuk-button'
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
