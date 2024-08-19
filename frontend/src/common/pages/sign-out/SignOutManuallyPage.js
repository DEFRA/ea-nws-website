import { useDispatch } from 'react-redux'
import SignOutLayout from '../../layouts/sign-out/SignOutPageLayout'
import { clearAuth } from '../../redux/userSlice'

import { useEffect } from 'react'
export default function SignOutManuallyPage () {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearAuth())
  })

  return (
    <SignOutLayout text={"You've signed out"} />
  )
}
