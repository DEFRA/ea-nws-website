import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import ConfirmDeleteContactDetailsLayout from '../../layouts/contact-management/ConfirmDeleteContactDetailsLayout'

export default function RemoveContactFromReviewConfirmationPage () {
  const navigate = useNavigate()

  const navigateToNextPage = (type, contact) => {
    navigate('/managecontacts', {
      state: {
        removedType: type,
        removedContact: contact
      }
    })
  }

  const NavigateToPreviousPage = () => {
    navigate('/managecontacts')
  }

  return (
    <>
      <Helmet>
        <title>Are You Sure You Want to Remove Contact? - Next Warning Service GOV.UK</title>
      </Helmet>
      <ConfirmDeleteContactDetailsLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={NavigateToPreviousPage}
      />
    </>
  )
}
