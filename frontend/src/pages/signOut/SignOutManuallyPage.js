import { useDispatch } from 'react-redux'
import { clearAuth } from '../../redux/userSlice'
import SignOutLayout from '../../common-layouts/sign-out/SignOutPageLayout'

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
