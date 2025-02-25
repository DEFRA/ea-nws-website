import { useLocation, useNavigate } from 'react-router'
import Button from '../../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../../common/components/gov-uk/NotificationBanner'
import { orgManageContactsUrls } from '../../../../../routes/manage-contacts/ManageContactsRoutes'
import ViewContactSubNavigation from './ViewContactSubNavigation'

export default function ContactHeader ({ contactName, currentPage }) {
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
      <strong className='govuk-tag govuk-tag--green govuk-!-margin-bottom-3'>
        Contact
      </strong>
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
          <Button
            text='Delete contact'
            className='govuk-button govuk-button--secondary'
            onClick={() => navigate(orgManageContactsUrls.delete)}
          />
        </div>
      </div>

      {/* view contact navigation */}
      <div className='govuk-!-margin-top-2 govuk-!-margin-bottom-9'>
        <ViewContactSubNavigation currentPage={currentPage} type='sub' />
      </div>
    </>
  )
}
