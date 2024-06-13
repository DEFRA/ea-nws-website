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

  if (session.authToken !== null) {
    dispatch(clearAuth())
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
