import { useNavigate } from 'react-router'
import AlternativeContactDetailsLayout from '../../layouts/alternative-contact/AlternativeContactDetailsLayout'

export default function AlternativeContactDetailsPage() {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate('/') // Todo in future US - go to organisation T&Cs
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
