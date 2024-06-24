import { useDispatch } from 'react-redux'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import { clearAuth } from '../../redux/userSlice'
import SignOutLayout from '../../common-layouts/sign-out/SignOutPageLayout'
import { useEffect } from 'react'
export default function SignOutManuallyPage () {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearAuth())
  })

  return (
    <>
      <Header />
      <SignOutLayout text={"You've signed out"} />
      <Footer />
    </>
  )
}
