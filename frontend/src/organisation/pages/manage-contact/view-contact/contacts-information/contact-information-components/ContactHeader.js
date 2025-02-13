import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import Popup from '../../../../../../common/components/custom/Popup'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import NotificationBanner from '../../../../../../common/components/gov-uk/NotificationBanner'
import { backendCall } from '../../../../../../common/services/BackendService'
import { orgManageContactsUrls } from '../../../../../routes/manage-contacts/ManageContactsRoutes'
import ViewContactSubNavigation from './ViewContactSubNavigation'

export default function ContactHeader ({ contactName, currentPage }) {
  const location = useLocation()
  const navigate = useNavigate()

  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)
  const contactId = useSelector((state) => state.session.orgCurrentContact.id)

  const [showPopup, setShowPopup] = useState(false)
  const [error, setError] = useState(false)

  const handleDelete = async () => {
    const removeContactIDs = [contactId]

    const dataToSend = { authToken, orgId, removeContactIDs }
    const { errorMessage } = await backendCall(
      dataToSend,
      'api/organization/remove_contacts',
      navigate
    )

    if (!errorMessage) {
      navigate(orgManageContactsUrls.view.dashboard, {
        state: {
          successMessage: `${contactName} deleted`
        }
      })
    } else {
      setError(errorMessage)
    }
  }

  return (
    <>
      {location.state && (
        <NotificationBanner
          className='govuk-notification-banner govuk-notification-banner--success'
          title='Success'
          text={location.state.successMessage}
        />
      )}
      {error && <ErrorSummary errorList={[error]} />}
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
            onClick={() => setShowPopup(true)}
          />
        </div>
      </div>

      {/* view contact navigation */}
      <div className='govuk-!-margin-top-2 govuk-!-margin-bottom-9'>
        <ViewContactSubNavigation currentPage={currentPage} type='sub' />
      </div>

      {showPopup && (
        <>
          <Popup
            onDelete={() => handleDelete()}
            onClose={() => setShowPopup(false)}
            title='Delete contact'
            popupText={
              <>
                If you continue {contactName} will be deleted from this account
                and will not get flood messages.
              </>
            }
            buttonText='Delete contact'
            buttonClass='govuk-button--warning'
          />
        </>
      )}
    </>
  )
}
