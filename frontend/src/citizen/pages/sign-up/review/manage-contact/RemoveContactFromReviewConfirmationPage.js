import { useNavigate } from 'react-router-dom'
import ConfirmDeleteContactDetailsLayout from '../../../../layouts/contact-management/ConfirmDeleteContactDetailsLayout'
export default function RemoveContactFromReviewConfirmationPage () {
  const navigate = useNavigate()

  const NavigateToNextPage = (type, contact) => {
    navigate('/signup/review', {
      state: {
        removedType: type,
        removedContact: contact
      }
    })
  }

  const NavigateToPreviousPage = () => {
    navigate('/signup/review')
  }

  return (
    <ConfirmDeleteContactDetailsLayout
      NavigateToNextPage={() => NavigateToNextPage()}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
