import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import Button from '../../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../../common/components/gov-uk/NotificationBanner'
import UserType from '../../../../../../common/enums/UserType'
import { backendCall } from '../../../../../../common/services/BackendService'
import { orgManageContactsUrls } from '../../../../../routes/manage-contacts/ManageContactsRoutes'
import ViewUserSubNavigation from './ViewUserSubNavigation'

export default function UserHeader({ contactId, contactName, userType, currentPage }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeAdmin, setActiveAdmin] = useState(false)
  const orgId = useSelector((state) => state.session.orgId)
  const profileId = useSelector((state) => state.session.profileId)

  async function getActiveAdmin () {
    const { data } = await backendCall({orgId: orgId, userId: contactId}, 'api/elasticache/get_active_admins')
    setActiveAdmin(data)
  }

  useEffect(() => {
    getActiveAdmin()
  }, [])

  const handleSubmit = () => {
    if (userType !== UserType.Admin) {
      navigate(orgManageContactsUrls.admin.promote)
    } else {
      navigate(orgManageContactsUrls.admin.remove)
    }
  }

  return (
    <>
      {location.state?.successMessage && (
        <NotificationBanner
          className='govuk-notification-banner govuk-notification-banner--success'
          title='Success'
          text={location.state.successMessage}
        />
      )}
      {userType === UserType.PendingAdmin ? (
        <strong className='govuk-tag govuk-tag--orange govuk-!-margin-bottom-3'>
          Pending admin
        </strong>
      ) : userType === UserType.Admin ? (
        <strong className='govuk-tag govuk-tag--purple govuk-!-margin-bottom-3'>
          Admin
        </strong>
      ) : (
        <strong className='govuk-tag govuk-tag--green govuk-!-margin-bottom-3'>
          Contact
        </strong>
      )}
      <div className='govuk-grid-row'>
        <div className='govuk-grid-column-one-half'>
          <h1 className='govuk-heading-l govuk-!-margin-bottom-1'>
            {contactName}
          </h1>
        </div>
        <div
          className='govuk-grid-column-one-half right'
          style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <>
            <Button
              text={
                userType === UserType.Admin
                  ? 'Remove as admin'
                  : 'Promote to admin'
              }
              disable={userType === UserType.Admin && (activeAdmin || profileId === contactId)}
              className='govuk-button govuk-button--secondary'
              onClick={() => {
                handleSubmit()
              }}
            />
            &nbsp; &nbsp;
          </>
          <Button
            text='Delete user'
            className='govuk-button govuk-button--secondary'
            disable={userType === UserType.Admin && (activeAdmin || profileId === contactId)}
            onClick={(event) => {
              event.preventDefault()
              navigate(orgManageContactsUrls.delete)
            }}
          />
        </div>
      </div>

      {/* view user navigation */}
      <div className='govuk-!-margin-top-2 govuk-!-margin-bottom-9'>
        <ViewUserSubNavigation currentPage={currentPage} type='sub' />
      </div>
    </>
  )
}
