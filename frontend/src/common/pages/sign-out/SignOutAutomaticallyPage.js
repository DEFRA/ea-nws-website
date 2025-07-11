import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import SignOutLayout from '../../layouts/sign-out/SignOutPageLayout'
import { clearAuth } from '../../redux/userSlice'
import { backendCall } from '../../services/BackendService'
import { getAdditionals } from '../../services/ProfileServices'

export default function SignOutManuallyPage() {
  const dispatch = useDispatch()
  const signinType = useSelector((state) => state.session.signinType)
  const profileId = useSelector((state) => state.session.profileId)
  const profile = useSelector((state) => state.session.profile)
  const authToken = useSelector((state) => state.session.authToken)
  const [signUpNotComplete, setSignUpNotComplete] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(['authToken'])

  useEffect(() => {
    const signout = async () => {
      // need to call the backend to remove data from elasticache once signed out
      await backendCall({ profileId, authToken }, 'api/sign_out')
    }
    if (signinType === 'org') {
      const isSignUpComplete = getAdditionals(profile, 'signupComplete')
      const lastAccessedUrl = getAdditionals(profile, 'lastAccessedUrl')

      if (isSignUpComplete === 'false' && lastAccessedUrl !== undefined) {
        setSignUpNotComplete(true)
      }

      // need to call the backend to remove data from elasticache once signed out
      signout()
    }
    removeCookie('authToken', { path: '/' })
    dispatch(clearAuth())
  }, [])

  const text = signUpNotComplete
    ? 'You timed out before you could finish signing up'
    : "You've been signed out for security reasons"

  return (
    <>
      <Helmet>
        <title>You've been signed out - Get flood warnings - GOV.UK</title>
      </Helmet>
      <SignOutLayout text={text} signUpNotComplete={signUpNotComplete} />
    </>
  )
}
