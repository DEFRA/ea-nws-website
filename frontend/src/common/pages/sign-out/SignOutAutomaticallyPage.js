import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SignOutLayout from '../../layouts/sign-out/SignOutPageLayout'
import { clearAuth } from '../../redux/userSlice'
import { backendCall } from '../../services/BackendService'

export default function SignOutManuallyPage () {
  const dispatch = useDispatch()
  const signinType = useSelector((state) => state.session.signinType)
  const authToken = useSelector((state) => state.session.authToken)

  useEffect(() => {
    if (signinType === 'org') {
      // need to call the backend to remove data from elasticache once signed out
      backendCall({ authToken }, 'api/sign_out')
    }
    dispatch(clearAuth())
  })

  return <SignOutLayout text={"You've been signed out for security reasons"} />
}
