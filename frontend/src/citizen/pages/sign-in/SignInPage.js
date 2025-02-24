import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SignInPageLayout from '../../../common/layouts/sign-in/SignInPageLayout'
import { setSigninType } from '../../../common/redux/userSlice'

export default function SignInPage() {
  const navigate = useNavigate()

  const navigateToNextPage = ({ signinToken, email }) => {
    navigate('/signin/validate', {
      state: { signinToken, email }
    })
  }

  // Set signin type
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setSigninType('citizen'))
  }, [])

  return <SignInPageLayout navigateToNextPage={navigateToNextPage} />
}
