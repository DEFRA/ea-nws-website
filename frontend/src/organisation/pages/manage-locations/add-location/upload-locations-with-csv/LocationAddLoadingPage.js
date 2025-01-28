import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { Spinner } from '../../../../../common/components/custom/Spinner'
import {
  setNotFoundLocations,
  setNotInEnglandLocations
} from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationAddLoadingPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [status, setStatus] = useState('')
  const [stage, setStage] = useState('Scanning Upload')
  const [validLocations, setValidLocations] = useState(null)
  const [invalidLocations, setInvalidLocations] = useState(null)
  const [duplicateLocations, setDuplicateLocations] = useState(null)
  const location = useLocation()
  const orgId = useSelector((state) => state.session.orgId)
  const fileName = location.state?.fileName

  if (!fileName) {
    // theres not fileName so navigate back. will need to give an error
    navigate(-1)
  }

  // Each time the status changes check if it's complete and save the locations to elasticache and geosafe
  useEffect(() => {
    const continueToNextPage = () => {
      if (invalidLocations === 0) {
        navigate(orgManageLocationsUrls.add.confirm, {
          state: { fileName, valid: validLocations }
        })
      } else {
        navigate('/organisation/manage-locations/confirm', {
          state: {
            fileName,
            valid: validLocations,
            duplicates: duplicateLocations
          }
        })
      }
    }
    if (status === 'complete') {
      continueToNextPage()
    }
  }, [status])

  // Check the status of the processing and update state
  useEffect(() => {
    const interval = setInterval(async () => {
      const dataToSend = { orgId, fileName }
      const { data, errorMessage } = await backendCall(
        dataToSend,
        'api/bulk_uploads/process_status',
        navigate
      )
      if (data) {
        if (data?.stage !== stage) {
          setStage(data.stage)
        }
        if (data?.status !== status) {
          if (data?.data) {
            setValidLocations(data.data.valid.length)
            const duplicateLocations = data.data.invalid.filter(
              (invalid) =>
                Array.isArray(invalid.error) &&
                invalid.error.includes('duplicate')
            ).length
            setDuplicateLocations(duplicateLocations)
            const notInEnglandLocations = data.data.invalid.filter(
              (invalid) =>
                Array.isArray(invalid.error) &&
                invalid.error.includes('not in England')
            ).length
            dispatch(setNotInEnglandLocations(notInEnglandLocations))
            // Any other invalid locations are considered to be not found
            dispatch(
              setNotFoundLocations(
                data.data.invalid.length -
                  duplicateLocations -
                  notInEnglandLocations
              )
            )
            setInvalidLocations(data.data.invalid.length)
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

  // Only temporary to trigger file processing until scanning in AWS is implemented
  useEffect(() => {
    const startProcessing = async () => {
      const dataToSend = { Message: fileName }
      const { errorMessage } = await backendCall(
        dataToSend,
        'api/bulk_uploads/process_file',
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
