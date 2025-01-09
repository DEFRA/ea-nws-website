import { useNavigate } from 'react-router'
import AlternativeContactDetailsLayout from '../../layouts/alternative-contact/AlternativeContactDetailsLayout'

export default function AlternativeContactDetailsPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate('/organisation/sign-up/declaration')
  }

  const NavigateToPreviousPage = () => {
    navigate('/organisation/sign-up/main-admin')
  }

  return (
    <AlternativeContactDetailsLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
