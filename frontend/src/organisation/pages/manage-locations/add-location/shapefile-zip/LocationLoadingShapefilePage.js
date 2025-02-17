import { centroid } from '@turf/turf'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { Spinner } from '../../../../../common/components/custom/Spinner'
import store from '../../../../../common/redux/store'
import {
  setCurrentLocationCoordinates,
  setCurrentLocationGeometry,
  setCurrentLocationName
} from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import { geoSafeToWebLocation } from '../../../../../common/services/formatters/LocationFormatter'
import { locationInEngland } from '../../../../../common/services/validations/LocationInEngland'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationLoadingShapefilePage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [status, setStatus] = useState('')
  const [stage, setStage] = useState('Scanning Upload')
  const [geojsonData, setGeojsonData] = useState(null)
  const location = useLocation()
  const orgId = useSelector((state) => state.session.orgId)
  const fileName = location.state?.fileName
  const [errors, setErrors] = useState(null)

  if (!fileName) {
    // theres not fileName so navigate back. will need to give an error
    navigate(-1)
  }

  const checkDuplicateLocation = async (locationName) => {
    const dataToSend = {
      orgId,
      locationName,
      type: 'valid'
    }
    const { data } = await backendCall(
      dataToSend,
      'api/locations/search',
      navigate
    )

    if (data.length > 0) {
      return data[0]
    } else {
      return null
    }
  }

  // Each time the status changes check if it's complete and save the locations to elasticache and geosafe
  useEffect(() => {
    const continueToNextPage = async () => {
      const bbox = geojsonData?.features[0]?.geometry?.bbox

      const inEngland =
        (await locationInEngland(bbox[1], bbox[0])) &&
        (await locationInEngland(bbox[3], bbox[2]))

      const existingLocation = await checkDuplicateLocation(
        geojsonData?.features[0]?.properties?.lrf15nm
      )

      // Calculate coords of centre of polygon to display the map properly
      const polygonCentre = centroid(geojsonData.features[0]?.geometry)

      const formattArea = (area) => {
        return area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
      const shapeArea = formattArea(
        Math.round(geojsonData.features[0]?.properties?.Shape_Area)
      )
      dispatch(
        setCurrentLocationCoordinates({
          latitude: polygonCentre.geometry.coordinates[1],
          longitude: polygonCentre.geometry.coordinates[0]
        })
      )
      dispatch(setCurrentLocationGeometry(geojsonData.features[0]))
      dispatch(setCurrentLocationName(geojsonData.fileName))

      const newLocation = store.getState().session.currentLocation

      if (inEngland && !existingLocation) {
        navigate(orgManageLocationsUrls.add.confirmLocationsWithShapefile, {
          state: { shapeArea }
        })
      } else if (inEngland && existingLocation) {
        navigate(orgManageLocationsUrls.add.duplicateLocationComparisonPage, {
          state: {
            existingLocation: geoSafeToWebLocation(existingLocation),
            newLocation: geoSafeToWebLocation(newLocation),
            numDuplicates: 1
          }
        })
      } else {
        navigate(orgManageLocationsUrls.add.error.shapefileNotInEngland, {
          state: { shapeArea }
        })
      }
    }

    if (status === 'complete') {
      continueToNextPage()
    } else if (status === 'rejected') {
      // navigate back to the upload page and pass the errors
      navigate(orgManageLocationsUrls.add.uploadLocationsWithShapefile, {
        state: {
          errors
        }
      })
    }
  }, [status])

  // Check the status of the processing and update state
  useEffect(() => {
    const interval = setInterval(async () => {
      const dataToSend = { orgId, fileName }
      const { data, errorMessage } = await backendCall(
        dataToSend,
        'api/shapefile/process_status',
        navigate
      )
      if (data) {
        if (data?.stage !== stage) {
          setStage(data.stage)
        }
        if (data?.status !== status) {
          if (data?.error) {
            setErrors(data.error)
          }
          if (data?.data) {
            setGeojsonData(data.data)
          }
          setStatus(data.status)
        }
        if (data?.error) {
          // redirect to page and show errors in the proccessed data
        }
      }
      if (errorMessage) {
        // redirect to error page, something went wrong
      }
    }, 2000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const startProcessing = async () => {
      const dataToSend = { Message: fileName }
      const { errorMessage } = await backendCall(
        dataToSend,
        'api/shapefile/process_file',
        navigate
      )
      if (errorMessage) {
        console.log(errorMessage)
      }
    }
    startProcessing()
  }, [])

  return (
    <>
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-column-full govuk-!-text-align-centre'>
          <h1 className='govuk-heading-l'>{stage}</h1>
          <div className='govuk-body'>
            <Spinner size='75' />
          </div>
        </div>
      </main>
    </>
  )
}
