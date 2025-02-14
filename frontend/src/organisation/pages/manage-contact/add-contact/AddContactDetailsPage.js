import { useNavigate } from 'react-router'
import ContactDetailsLayout from '../../../layouts/manage-contact/ContactDetailsLayout'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function AddContactDetailsPage () {
  const navigate = useNavigate()
  const navigateToNextPage = () => navigate(orgManageContactsUrls.add.keywords)

  return (
    <>
      <ContactDetailsLayout navigateToNextPage={navigateToNextPage} />
    </>
  )
}
