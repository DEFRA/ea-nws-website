import SignInValidatePageLayout from '../../../common/layouts/sign-in/SignInValidatePageLayout'
import { useNavigate } from 'react-router-dom'

export default function SignInValidatePage () {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate('/organisation/home')
  }

  const NavigateToPreviousPage = () => {
    navigate('/organisation/signin')
  }

  return (
    <SignInValidatePageLayout NavigateToNextPage={NavigateToNextPage} NavigateToPreviousPage={NavigateToPreviousPage} />
  )
}
