import SignInValidatePageLayout from '../../../common/layouts/sign-in/SignInValidatePageLayout'
import { useNavigate } from 'react-router-dom'

export default function SignInValidatePage () {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    // TODO to be updated to new organisation home page
    navigate('/home')
  }

  const NavigateToPreviousPage = () => {
    navigate('/organisation/signin')
  }

  return (
    <SignInValidatePageLayout NavigateToNextPage={NavigateToNextPage} NavigateToPreviousPage={NavigateToPreviousPage} />
  )
}
