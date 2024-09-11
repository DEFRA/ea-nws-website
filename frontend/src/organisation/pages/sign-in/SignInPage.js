import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SignInPageLayout from '../../../common/layouts/sign-in/SignInPageLayout'
import { setSigninType } from '../../../common/redux/userSlice'

export default function SignInPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSigninType('org'))
  })

  const NavigateToNextPage = ({ signinToken, email }) => {
    navigate('/organisation/signin/validate', {
      state: { signinToken, email }
    })
  }

  return (
    <SignInPageLayout NavigateToNextPage={NavigateToNextPage} />
  )
}
