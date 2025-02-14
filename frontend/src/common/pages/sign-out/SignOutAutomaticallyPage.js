import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import SignOutLayout from '../../layouts/sign-out/SignOutPageLayout'
import { clearAuth } from '../../redux/userSlice'
import { backendCall } from '../../services/BackendService'

export default function SignOutManuallyPage () {
  const dispatch = useDispatch()
  const signinType = useSelector((state) => state.session.signinType)
  const profileId = useSelector((state) => state.session.profileId)
  const orgId = useSelector((state) => state.session.orgId)
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(['authToken'])

  useEffect(() => {
    const signout = async () => {
      // need to call the backend to remove data from elasticache once signed out
      await backendCall({ profileId, orgId }, 'api/sign_out')
    }
    if (signinType === 'org') {
      // need to call the backend to remove data from elasticache once signed out
      signout()
    }
    removeCookie('authToken', { path: '/' })
    dispatch(clearAuth())
  }, [])

  return <SignOutLayout text="You've been signed out for security reasons" />
}
