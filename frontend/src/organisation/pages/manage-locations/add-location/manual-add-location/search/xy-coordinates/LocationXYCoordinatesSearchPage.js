import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../../../../../common/components/gov-uk/Input'
import {
  setCurrentLocationCoordinates,
  setCurrentLocationEasting,
  setCurrentLocationNorthing
} from '../../../../../../../common/redux/userSlice'
import { convertCoordinatesToEspg4326 } from '../../../../../../../common/services/CoordinatesFormatConverter'
import {
  getSurroundingFloodAreas,
  isLocationInFloodArea
} from '../../../../../../../common/services/WfsFloodDataService'
import { locationInEngland } from '../../../../../../../common/services/validations/LocationInEngland'
import { xCoordinateValidation } from '../../../../../../../common/services/validations/XCoordinateValidation'
import { yCoordinateValidation } from '../../../../../../../common/services/validations/YCoordinateValidation'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationXYCoordinatesSearchPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [xCoordinate, setXCoordinate] = useState('')
  const [xCoordinateError, setXCoordinateError] = useState('')
  const [yCoordinate, setYCoordinate] = useState('')
  const [yCoordinateError, setYCoordinateError] = useState('')

  useEffect(() => {
    if (xCoordinateError) {
      setXCoordinateError('')
    }
    if (yCoordinateError) {
      setYCoordinateError('')
    }
  }, [xCoordinate, yCoordinate])

  const handleSubmit = async () => {
    let error = false

    const xCoordinateValidationError = xCoordinateValidation(xCoordinate)
    if (xCoordinateValidationError) {
      setXCoordinateError(xCoordinateValidationError)
      error = true
    }

    const yCoordinateValidationError = yCoordinateValidation(yCoordinate)
    if (yCoordinateValidationError) {
      setYCoordinateError(yCoordinateValidationError)
      error = true
    }

    if (!error) {
      const { latitude, longitude } = convertCoordinatesToEspg4326(
        Number(xCoordinate),
        Number(yCoordinate)
      )

      const coordinates = { latitude, longitude }
      dispatch(setCurrentLocationCoordinates(coordinates))
      dispatch(setCurrentLocationEasting(Number(xCoordinate)))
      dispatch(setCurrentLocationNorthing(Number(yCoordinate)))

      if (await locationInEngland(latitude, longitude)) {
        const { warningArea, alertArea } = await getSurroundingFloodAreas(
          latitude,
          longitude
        )

        const isError = !warningArea && !alertArea

        const isInAlertArea =
          alertArea && isLocationInFloodArea(latitude, longitude, alertArea)

        const isInWarningArea =
          warningArea && isLocationInFloodArea(latitude, longitude, warningArea)

        navigateToNextPage(isInAlertArea, isInWarningArea, isError)
      } else {
        navigate(orgManageLocationsUrls.add.error.xyCoordinatesNotInEngland)
      }
    }
  }

  const navigateToNextPage = (isInAlertArea, isInWarningArea, isError) => {
    if (isInAlertArea && isInWarningArea) {
      navigate(
        '/organisation/manage-locations/add/location-in-area/xy-coordinates-search/all'
      )
    } else if (isInAlertArea) {
      navigate(
        '/organisation/manage-locations/add/location-in-area/xy-coordinates-search/alerts'
      )
    } else if (!isInAlertArea && !isInWarningArea) {
      navigate(
        '/organisation/manage-locations/add/location-in-area/xy-coordinates-search/no-alerts'
      )
    } else if (isError) {
      navigate('/error')
    }
  }

  const navigateBack = async (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {(xCoordinateError || yCoordinateError) && (
              <ErrorSummary errorList={[xCoordinateError, yCoordinateError]} />
            )}
            <h1 className='govuk-heading-l'>
              What are the X and Y coordinates?
            </h1>
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
