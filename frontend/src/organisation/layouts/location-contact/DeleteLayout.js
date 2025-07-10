import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
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

export default function DeleteLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)
  const isLocation = location.pathname.includes(orgManageLocationsUrls.delete)
  const contactId = useSelector((state) => state.session.orgCurrentContact.id)
  const currentLocation = useSelector((state) => state.session.currentLocation)
  const additionalData = useSelector((state) => getLocationAdditionals(state))
  const nameToDelete = useSelector((state) =>
    isLocation
      ? getLocationAdditionals(state).locationName
      : state.session.orgCurrentContact.firstname +
        ' ' +
        state.session.orgCurrentContact.lastname
  )
  const [error, setError] = useState(false)
  const [partnerId, setPartnerId] = useState(false)

  async function getPartnerId() {
    const { data } = await backendCall('data', 'api/service/get_partner_id')
    setPartnerId(data)
  }

  useEffect(() => {
    getPartnerId()
  }, [])

  const unregisterLocations = async (idsToDelete) => {
    for (const locationID of idsToDelete) {
      const unregisterData = {
        authToken,
        locationId: locationID,
        partnerId
      }

      await backendCall(
        unregisterData,
        'api/location/unregister_from_partner',
        navigate
      )
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    const idsToDelete = []
    if (isLocation) {
      idsToDelete.push(currentLocation.id)
      const children = additionalData.childrenIDs
      if (children && children.length > 0) {
        children.forEach((child) => idsToDelete.push(child?.id))
      }
      await unregisterLocations(idsToDelete)
    } else {
      idsToDelete.push(contactId)
    }

    const dataToSend = isLocation
      ? { authToken, orgId, locationIds: idsToDelete }
      : { authToken, orgId, removeContactIDs: idsToDelete }

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
            successMessage: [`${nameToDelete} deleted`]
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
      <Helmet>
        <title>
          Delete {nameToDelete} - Manage {isLocation ? 'locations' : 'users'} -
          Get flood warnings (professional) - GOV.UK
        </title>
      </Helmet>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        {error && <ErrorSummary errorList={[error]} />}
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l' id='main-content'>
              Delete {!isLocation && 'user'} {nameToDelete}
            </h1>
            <div className='govuk-body'>
              {isLocation ? (
                <p className='govuk-!-margin-bottom-8'>
                  If you continue {nameToDelete} will be deleted from this
                  account and will not get flood messages.
                </p>
              ) : (
                <>
                  <p>
                    If you continue, {nameToDelete} will be deleted from this
                    account.
                  </p>
                  <p className='govuk-!-margin-bottom-8'>
                    They'll no longer get flood messages, if they were receiving
                    any.
                  </p>
                </>
              )}
              <Button
                text={`Delete ${isLocation ? 'location' : 'user'}`}
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
