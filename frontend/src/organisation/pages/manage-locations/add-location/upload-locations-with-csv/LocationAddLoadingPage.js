import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { Spinner } from '../../../../../common/components/custom/Spinner'
import { backendCall } from '../../../../../common/services/BackendService'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationAddLoadingPage () {
  const navigate = useNavigate()
  const [status, setStatus] = useState('')
  const [stage, setStage] = useState('Scanning Upload')
  const authToken = useSelector((state) => state.session.authToken)
  const location = useLocation()
  const fileName = location.state?.fileName

  if (!fileName) {
    //theres not fileName so naviagte back. will need to give an error
    navigate(-1)
  }

  // Each time the status changes check if it's complete and save the locations to elasticache and geosafe
  useEffect(() => {
    const dataToSend = { authToken, fileName }
    if (status === 'complete') {
      const { data, errorMessage } = async () => await backendCall(
        dataToSend,
        'api/bulk_uploads/save_locations',
        navigate
      )
      if (!errorMessage) {
        if (data.invalid === 0) {
          navigate(orgManageLocationsUrls.add.confirm, {
            state: { added: data.valid }
          })
        } else {
          /* navigate([url for page with options], {
            state: {
              added: data.valid
              notAdded: data.invalid
            }
          }) */
        }
      } else {
        // Navigate to error page
      }
    }
  }, [status])

  // Check the status of the processing and update state
  useEffect(() => {
    const interval = setInterval(async () => {
      const dataToSend = { fileName }
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
    const dataToSend = { Message: fileName }
      const { errorMessage } = async () => await backendCall(
        dataToSend,
        'api/bulk_uploads/process_file',
        navigate
      )
      if (!errorMessage) {
        console.log('File processing triggered')
      } else {
        console.log('file processing not triggered')
      }
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
