import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import SignOutLayout from '../../layouts/sign-out/SignOutPageLayout'
import { clearAuth } from '../../redux/userSlice'
export default function SignOutManuallyPage () {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearAuth())
  })

  let signin_link = '/signin'
  const currentRoute = window.location.pathname
  if (currentRoute.includes('/organisation/')) {
    signin_link = '/organisation/signin'
  }

  return (
    <SignOutLayout
      text={"You've been signed out for security reasons"}
      signin_link={signin_link}
    />
  )
}
