import { useLocation, useNavigate } from 'react-router'
import Button from '../../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../../common/components/gov-uk/NotificationBanner'
import { orgManageContactsUrls } from '../../../../../routes/manage-contacts/ManageContactsRoutes'
import ViewUserSubNavigation from './ViewUserSubNavigation'

export default function UserHeader ({ contactName, userType, currentPage }) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <>
      {location.state && (
        <NotificationBanner
          className='govuk-notification-banner govuk-notification-banner--success'
          title='Success'
          text={location.state.successMessage}
        />
      )}
      {userType === 'Pending admin'
        ? (
          <strong className='govuk-tag govuk-tag--orange govuk-!-margin-bottom-3'>
            Pending admin
          </strong>
          )
        : userType === 'Admin'
          ? (
            <strong className='govuk-tag govuk-tag--purple govuk-!-margin-bottom-3'>
              Admin
            </strong>
            )
          : (
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
          {userType !== 'Admin' && (
            <>
              <Button
                text='Promote to admin'
                className='govuk-button govuk-button--secondary'
                onClick={() => {
                  navigate(orgManageContactsUrls.promoteToAdmin)
                }}
              />
              &nbsp; &nbsp;
            </>
          )}
          <Button
            text='Delete user'
            className='govuk-button govuk-button--secondary'
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
