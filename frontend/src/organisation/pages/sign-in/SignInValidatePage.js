import { useNavigate } from 'react-router-dom'
import SignInValidatePageLayout from '../../../common/layouts/sign-in/SignInValidatePageLayout'

export default function SignInValidatePage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate('/organisation/home')
  }

  const NavigateToPreviousPage = () => {
    navigate('/organisation/signin')
  }

  return (
    <SignInValidatePageLayout navigateToNextPage={navigateToNextPage} NavigateToPreviousPage={NavigateToPreviousPage} />
  )
}
