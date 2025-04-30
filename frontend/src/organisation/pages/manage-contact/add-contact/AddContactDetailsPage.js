import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import UserType from '../../../../common/enums/UserType'
import ContactDetailsLayout from '../../../layouts/manage-contact/ContactDetailsLayout'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function AddContactDetailsPage() {
  const navigate = useNavigate()
  const userType = useSelector((state) => state.session.orgCurrentContact.role)
  const navigateToNextPage = () => {
    if (userType === UserType.Admin) {
      navigate(orgManageContactsUrls.add.email)
    } else {
      navigate(orgManageContactsUrls.add.channels)
    }
  }

  return (
    <>
      <ContactDetailsLayout navigateToNextPage={navigateToNextPage} />
    </>
  )
}
