import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import { clearAuth } from '../../redux/userSlice'
import SignOutLayout from './SignOutPageLayout'
export default function SignOutAutomatically() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const session = useSelector((state) => state.session)

  const loggedOut = () => {
    if (session.authToken !== null) {
      dispatch(clearAuth())
      console.log('user removed')
      return true
    } else {
      return false
    }
  }

  function redirect() {
    navigate('/signin')
  }

  return (
    <>
      <Header />
      <SignOutLayout
        text={"You've been signed out for security reasons"}
        redirect={redirect}
      />
      <Footer />
    </>
  )
}
