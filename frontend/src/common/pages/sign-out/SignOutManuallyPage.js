import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import SignOutLayout from '../../layouts/sign-out/SignOutPageLayout'
import { clearAuth } from '../../redux/userSlice'

export default function SignOutManuallyPage () {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearAuth())
  })

  return <SignOutLayout text={"You've signed out"} />
}
