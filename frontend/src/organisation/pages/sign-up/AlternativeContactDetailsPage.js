import { useNavigate } from 'react-router'
import AlternativeContactDetailsLayout from '../../layouts/alternative-contact/AlternativeContactDetailsLayout'

export default function AlternativeContactDetailsPage () {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate('/organisation/sign-up/terms-and-conditions')
  }

  const NavigateToPreviousPage = () => {
    navigate('/organisation/sign-up/main-admin')
  }

  return (
    <AlternativeContactDetailsLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
