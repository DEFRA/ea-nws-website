import SignInPageLayout from '../../../common/layouts/sign-in/SignInPageLayout'
import { useNavigate } from 'react-router-dom'

export default function SignInPage () {
  const navigate = useNavigate()

  const NavigateToNextPage = ({ signinToken, email }) => {
    navigate('/organisation/signin/validate', {
      state: { signinToken, email }
    })
  }

  return (
    <SignInPageLayout NavigateToNextPage={NavigateToNextPage} />
  )
}
