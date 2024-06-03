import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import { clearAuth } from '../../redux/userSlice'
import SignOutLayout from './SignOutPageLayout'
export default function SignOutManually() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const session = useSelector((state) => state.session)

  function loggedOut() {
    if (session.authToken !== null) {
      dispatch(clearAuth())
      return true
    } else {
      return false
    }
  }

  if (loggedOut() === true) {
    console.log('User removed')
  } else {
    console.log('no user to remove')
  }
  function redirect() {
    navigate('/signin')
  }

  return (
    <>
      <Header />
      <SignOutLayout text={"You've signed out"} redirect={redirect} />
      <Footer />
    </>
  )
}
