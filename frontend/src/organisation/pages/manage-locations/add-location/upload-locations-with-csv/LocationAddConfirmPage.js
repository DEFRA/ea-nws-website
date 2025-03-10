import { React, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import BackLink from '../../../../../common/components/custom/BackLink'
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

  const upload = async (event) => {
    event.preventDefault()
    const dataToSend = { authToken, orgId, fileName }
    const { data, errorMessage } = await backendCall(
      dataToSend,
      'api/bulk_uploads/save_locations',
      navigate
    )
    if (!errorMessage) {
      navigate(orgManageLocationsUrls.add.contactLinkInfo, {
        state: {
          added: data.valid
        }
      })
    } else {
      errorMessage
        ? setError(errorMessage)
        : setError('Oops, something went wrong')
    }
  }

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
            onClick={upload}
          />
          <Button
            text='Cancel upload'
            className='govuk-button govuk-button--warning govuk-!-margin-left-3'
            onClick={cancel}
          />
        </div>
      </main>
    </>
  )
}
