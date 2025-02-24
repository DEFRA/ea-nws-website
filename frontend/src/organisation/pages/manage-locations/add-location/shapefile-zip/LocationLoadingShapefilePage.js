import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { Spinner } from '../../../../../common/components/custom/Spinner'
import { backendCall } from '../../../../../common/services/BackendService'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationLoadingShapefilePage () {
  const navigate = useNavigate()
  const [status, setStatus] = useState('')
  const [stage, setStage] = useState('Scanning Upload')
  const [geojsonData, setGeojsonData] = useState(null)
  const [duplicateLocation, setDuplicateLocation] = useState(false)
  const [notInEnglandLocation, setNotInEnglandLocation] = useState(false)
  const location = useLocation()
  const orgId = useSelector((state) => state.session.orgId)
  const fileName = location.state?.fileName
  const [errors, setErrors] = useState(null)

  if (!fileName) {
    // theres not fileName so navigate back. will need to give an error
    navigate(-1)
  }

  // Each time the status changes check if it's complete and save the locations to elasticache and geosafe
  useEffect(() => {
    const continueToNextPage = () => {
      if (duplicateLocation) {
        // TODO: EAN-1523 - navigate to duplicate page
      } else if (notInEnglandLocation) {
        // TODO: EAN-1523 - navigate to not in england page
      } else {
        navigate(orgManageLocationsUrls.add.confirmLocationsWithShapefile, {
          state: { geojsonData }
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
            setDuplicateLocation(
              Array.isArray(data.data?.properties?.error) &&
              data.data.properties.error.includes('duplicate') &&
              data.data.properties.error.length === 1
            )
            setNotInEnglandLocation(
              Array.isArray(data.data?.properties?.error) &&
              data.data.properties.error.includes('not in England')
            )
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
