import { useDispatch } from 'react-redux'
import { clearAuth } from '../../redux/userSlice'
import SignOutLayout from '../../common-layouts/signOut/SignOutPageLayout'
import { useEffect } from 'react'
export default function SignOutManuallyPage () {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearAuth())
  })

  return (
    <SignOutLayout text={"You've been signed out for security reasons"} />
  )
}
