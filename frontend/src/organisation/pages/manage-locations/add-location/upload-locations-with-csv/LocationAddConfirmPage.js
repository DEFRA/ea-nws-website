import { React, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import BackLink from '../../../../../common/components/custom/BackLink'
import LoadingSpinner from '../../../../../common/components/custom/LoadingSpinner'
import Button from '../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import { backendCall } from '../../../../../common/services/BackendService'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationAddConfirmPage () {
  const navigate = useNavigate()
  const location = useLocation()

  const authToken = useSelector((state) => state.session.authToken)
  const locationsValid = location?.state?.valid || 0
  const fileName = location?.state?.fileName || ''
  const orgId = useSelector((state) => state.session.orgId)
  const [error, setError] = useState(null)
  const [saveLocations, setSaveLocations] = useState(false)
  const [stage, setStage] = useState('Adding locations')

  useEffect(() => {
    if (saveLocations) {
      const upload = async () => {
        const dataToSend = { authToken, orgId, fileName }
        await backendCall(
          dataToSend,
          'api/bulk_uploads/save_locations',
          navigate
        )
      }
      upload()
      const interval = setInterval(async function getStatus () {
        if (getStatus.isRunning) return
        getStatus.isRunning = true
        const dataToSend = { authToken }
        const { data, errorMessage } = await backendCall(
          dataToSend,
          'api/bulk_uploads/save_locations_status',
          navigate
        )
        if (data) {
          if (data?.stage !== stage) {
            setStage(data.stage)
          }
          if (data?.status === 'complete') {
            if (data?.data) {
              navigate(orgManageLocationsUrls.add.contactLinkInfo, {
                state: {
                  added: data.data.valid
                }
              })
            }
          }
        }
        if (errorMessage) {
          setError(errorMessage)
        }
        getStatus.isRunning = false
      }, 2000)
      return () => {
        clearInterval(interval)
      }
    }
  }, [saveLocations])

  const cancel = (event) => {
    event.preventDefault()
    navigate(-2)
  }

  return (
    <>
      <BackLink onClick={() => navigate(-2)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-8'>
        <div className='govuk-grid-column-two-thirds'>
          {error && <ErrorSummary errorList={[error]} />}
          <h1 className='govuk-heading-l govuk-!-margin-bottom-7'>
            {locationsValid} locations can be added
          </h1>{' '}
          <Button
            text='Add and continue'
            className='govuk-button'
            onClick={(event) => {
              event.preventDefault()
              setSaveLocations(true)
            }}
          />
          <Button
            text='Cancel upload'
            className='govuk-button govuk-button--warning govuk-!-margin-left-3'
            onClick={cancel}
          />
        </div>
      </main>
      {saveLocations && error === null &&
        <div className='popup-dialog'>
          <div className='popup-dialog-container govuk-!-padding-bottom-6'>
            <LoadingSpinner
              loadingText={<p className='govuk-body-l'>{`${stage}...`}</p>}
            />
          </div>
        </div>}
    </>
  )
}
