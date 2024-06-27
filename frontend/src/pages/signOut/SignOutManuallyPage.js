import { useDispatch } from 'react-redux'
import { clearAuth } from '../../redux/userSlice'
import SignOutLayout from '../../common-layouts/signOut/signOutPageLayout'

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
