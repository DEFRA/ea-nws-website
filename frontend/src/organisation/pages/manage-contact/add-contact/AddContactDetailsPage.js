import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import ContactDetailsLayout from '../../../layouts/manage-contact/ContactDetailsLayout'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function AddContactDetailsPage() {
  const navigate = useNavigate()
  const addingAdmin = useSelector((state) => state.session.addingAdminFlow)
  const navigateToNextPage = () => {
    if (addingAdmin) {
      navigate(orgManageContactsUrls.add.email)
    } else {
      navigate(orgManageContactsUrls.add.channels)
    }
  }

  return (
    <>
      <Helmet>
        <title>Add User Details - GOV.UK</title>
      </Helmet>
      <ContactDetailsLayout navigateToNextPage={navigateToNextPage} />
    </>
  )
}
