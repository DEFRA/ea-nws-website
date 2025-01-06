import { useNavigate } from 'react-router-dom'
import SignInPageLayout from '../../../common/layouts/sign-in/SignInPageLayout'

export default function SignInPage () {
  const navigate = useNavigate()

  const navigateToNextPage = ({ signinToken, email }) => {
    navigate('/signin/validate', {
      state: { signinToken, email }
    })
  }

  return (
    <SignInPageLayout navigateToNextPage={navigateToNextPage} />
  )
}
