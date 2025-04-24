import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'
import ContactDetailsLayout from '../../../layouts/manage-contact/ContactDetailsLayout'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function AddContactDetailsPage () {
  const navigate = useNavigate()
  const location = useLocation()
  const userType = location?.state?.type || 'contact'
  const navigateToNextPage = () => {
    if (userType === 'admin') {
      navigate(orgManageContactsUrls.add.email, {
        state: {
          type: userType
        }
      })
    } else {
      navigate(orgManageContactsUrls.add.channels, {
        state: {
          type: userType
        }
      })
    }
  }

  return (
    <>
      <ContactDetailsLayout navigateToNextPage={navigateToNextPage} />
    </>
  )
}
