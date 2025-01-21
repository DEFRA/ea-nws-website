import { centroid } from '@turf/turf'
import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'

import Button from '../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import {
  getLocationAdditional,
  getLocationOther,
  setCurrentLocation,
  setCurrentLocationCoordinates,
  setCurrentLocationGeometry,
  setCurrentLocationName
} from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import FloodWarningKey from '../../../../components/custom/FloodWarningKey'
import Map from '../../../../components/custom/Map'

export default function ConfirmLocationLayout ({
  navigateToNextPage,
  navigateToPinDropFlow,
  layoutType = 'XandY'
}) {
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const currentLocation = useSelector((state) => state.session.currentLocation)
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)
  const locationName = useSelector((state) =>
    getLocationAdditional(state, 'locationName')
  )
  const currentAddress = useSelector((state) =>
    getLocationOther(state, 'full_address')
  )
  const formattedAddress = currentAddress ? currentAddress.split(',') : ''
  const xCoord = Math.round(
    useSelector((state) => getLocationOther(state, 'x_coordinate'))
  )
  const yCoord = Math.round(
    useSelector((state) => getLocationOther(state, 'y_coordinate'))
  )

  // Shapefile polygon specific values
  let shapeGeoData, shapeName, shapeArea, shapeLong, shapeLat
  if (layoutType === 'shape') {
    const { geojsonData } = location.state || {}
    const formattArea = (area) => {
      return area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    shapeGeoData = geojsonData
    shapeArea = formattArea(Math.round(shapeGeoData.features[0]?.properties?.Shape_Area))
    shapeName = shapeGeoData.fileName

    // Calculate coords of centre of polygon to display the map properly
    const polygonCentre = centroid(shapeGeoData.features[0]?.geometry)
    shapeLong = polygonCentre.geometry.coordinates[0]
    shapeLat = polygonCentre.geometry.coordinates[1]
  }

  useEffect(() => {
    if (layoutType === 'shape') {
      dispatch(
        setCurrentLocationCoordinates({
          latitude: shapeLat,
          longitude: shapeLong
        })
      )
    }
  }, [shapeLong, shapeLat])

  // Switch case to change the button/link logic depending on the location type
  const handleSubmit = async () => {
    if (layoutType === 'shape') {
      dispatch(
        setCurrentLocationGeometry({
          geoJson: JSON.stringify(shapeGeoData)
        })
      )
      dispatch(setCurrentLocationName(shapeName))
    }
    const dataToSend = { authToken, orgId, location: currentLocation }
    const { data, errorMessage } = await backendCall(
      dataToSend,
      'api/location/create',
      navigate
    )
    if (data) {
      // need to set the current location due to geosafe creating the ID.
      dispatch(setCurrentLocation(data))
      navigateToNextPage()
    } else {
      errorMessage
        ? setError(errorMessage)
        : setError('Oops, something went wrong')
    }
  }

  const handleNavigateToPinDropFlow = (event) => {
    event.preventDefault()
    navigateToPinDropFlow()
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>

      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-one-half'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l govuk-!-margin-top-5'>
              Confirm location
            </h1>

            {currentAddress && (
              <>
                <h2 className='govuk-heading-m govuk-!-margin-top-6'>
                  {locationName}
                </h2>
                <hr />
                <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                  Address
                </h3>
                <p>
                  {formattedAddress.map((line, index) => {
                    return (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    )
                  })}
                </p>
              </>
            )}

            {/* X and Y coordinates layout (default) */}
            {layoutType === 'XandY' && (
              <>
                <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-top-4 govuk-!-margin-bottom-0'>
                  X and Y Coordinates
                </h3>
                <p>
                  {xCoord}
                  {', '}
                  {yCoord}
                </p>

                <Link
                  onClick={(e) => handleNavigateToPinDropFlow(e)}
                  className='govuk-link'
                >
                  Move pin position
                </Link>

                <div className='govuk-!-margin-top-8'>
                  <Button
                    text='Confirm Location'
                    className='govuk-button'
                    onClick={handleSubmit}
                  />
                  <Link
                    onClick={navigateBack}
                    className='govuk-body govuk-link inline-link'
                  >
                    Cancel
                  </Link>
                </div>
              </>
            )}

            {/* Shapefile layout */}
            {layoutType === 'shape' && (
              <>
                <h2 className='govuk-heading-m govuk-!-margin-top-6'>
                  {shapeName}
                </h2>
                <hr />
                <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-top-4 govuk-!-margin-bottom-0'>
                  Polygon
                </h3>
                <p>{shapeArea} square metres</p>

                <div className='govuk-!-margin-top-8'>
                  <Button
                    text='Add and continue'
                    className='govuk-button'
                    onClick={handleSubmit}
                  />{' '}
                  <Button
                    text='Cancel upload'
                    className='govuk-button govuk-button--warning'
                    onClick={navigateBack}
                  />
                </div>
              </>
            )}
          </div>
          <div
            className='govuk-grid-column-one-half'
            style={{ marginTop: '95px' }}
          >
            <Map
              showMapControls={false}
              zoomLevel={14}
              shapefileData={layoutType === 'shape' ? shapeGeoData : null}
              type={layoutType === 'shape' ? 'shape' : null}
            />
            <div className='govuk-!-column-one-third'>
              <FloodWarningKey showShapefile={layoutType === 'shape'} />
            </div>
            <span className='govuk-caption-m govuk-!-font-size-16 govuk-!-font-weight-bold govuk-!-margin-top-4'>
              This is not a live flood map
            </span>
            <span className='govuk-caption-m govuk-!-font-size-16'>
              It shows fixed areas we provide flood warnings and alerts for
            </span>
          </div>
        </div>
      </main>
    </>
  )
}
