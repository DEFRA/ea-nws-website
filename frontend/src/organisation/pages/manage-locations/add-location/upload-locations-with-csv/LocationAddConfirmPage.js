import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import { backendCall } from '../../../../../common/services/BackendService'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationAddConfirmPage () {
  const navigate = useNavigate()
  const location = useLocation()

  const locationsValid = location?.state?.valid || 0
  const fileName = location?.state?.fileName || ''
  const authToken = useSelector((state) => state.session.authToken)

  const upload = async () => {
    const dataToSend = { authToken, fileName }
    const { data, errorMessage } = await backendCall(
      dataToSend,
      'api/bulk_uploads/save_locations',
      navigate
    )
    if (!errorMessage) {
      navigate(orgManageLocationsUrls.view.dashboard, {
        state: {
          added: data.valid
        }
      })
    } else {
      // go to some sort of error page (part of next DOR)
    }
  }

  const cancel = () => {
    navigate('#') // TODO: Should link to settings page
  }

  return (
    <>
      <BackLink onClick={() => navigate(-2)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-column-two-thirds'>
          <h1 className='govuk-heading-l'>
            {locationsValid} locations can be added
          </h1>{' '}
          <Button
            text='Add and continue'
            className='govuk-button'
            onClick={upload}
          />{' '}
          <Button
            text='Cancel upload'
            className='govuk-button govuk-button--warning'
            onClick={cancel}
          />
        </div>
      </main>
    </>
  )
}
