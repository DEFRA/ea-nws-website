import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import { getLocationAdditionals } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { orgManageContactsUrls } from '../../routes/manage-contacts/ManageContactsRoutes'
import { orgManageLocationsUrls } from '../../routes/manage-locations/ManageLocationsRoutes'

export default function DeleteLayout () {
  const navigate = useNavigate()
  const location = useLocation()

  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)
  const isLocation = location.pathname.includes(orgManageLocationsUrls.delete)
  const idToDelete = useSelector((state) =>
    isLocation
      ? state.session.currentLocation.id
      : state.session.orgCurrentContact.id
  )
  const nameToDelete = useSelector((state) =>
    isLocation
      ? getLocationAdditionals(state).locationName
      : state.session.orgCurrentContact.firstname +
        ' ' +
        state.session.orgCurrentContact.lastname
  )
  const [error, setError] = useState(false)

  const handleDelete = async () => {
    const dataToSend = isLocation
      ? { authToken, orgId, locationIds: [idToDelete] }
      : { authToken, orgId, removeContactIDs: [idToDelete] }

    const { errorMessage } = await backendCall(
      dataToSend,
      isLocation ? 'api/location/remove' : 'api/organization/remove_contacts',
      navigate
    )

    if (!errorMessage) {
      navigate(
        isLocation
          ? orgManageLocationsUrls.view.dashboard
          : orgManageContactsUrls.view.dashboard,
        {
          state: {
            successMessage: `${nameToDelete} deleted`
          }
        }
      )
    } else {
      setError(errorMessage)
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
        {error && <ErrorSummary errorList={[error]} />}
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l'>Delete {nameToDelete}</h1>
            <div className='govuk-body'>
              <p className='govuk-!-margin-bottom-8'>
                If you continue {nameToDelete} will be deleted from this account
                and will not get flood messages.
              </p>
              <Button
                text={`Delete ${isLocation ? 'location' : 'contact'}`}
                className='govuk-button govuk-button--warning'
                onClick={handleDelete}
              />
              <Link
                onClick={navigateBack}
                className='govuk-body govuk-link inline-link govuk-!-margin-left-1'
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
