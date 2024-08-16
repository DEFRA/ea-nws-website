import { useNavigate } from 'react-router-dom'
import SignInPageLayout from '../../../common/layouts/sign-in/SignInPageLayout'

export default function SignInPage () {
  const navigate = useNavigate()

  const NavigateToNextPage = ({ signinToken, email }) => {
    navigate('/organisation/signin/validate', {
      state: { signinToken, email }
    })
  }

  return <SignInPageLayout NavigateToNextPage={NavigateToNextPage} />
}
