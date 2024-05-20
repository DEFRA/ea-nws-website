import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Button from '../../gov-uk-components/Button'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import { clearAuth } from '../../redux/userSlice'

export default function SignOutManually() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const session = useSelector((state) => state.session)

  function loggedOut() {
    if (session.authToken !== null) {
      dispatch(clearAuth)
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
    navigate('/SignInPage')
  }

  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <h2 class="govuk-heading-l">You've signed out</h2>
        <p class="govuk-body">You can sign back in if you need to.</p>
        <Button
          text={'Sign in'}
          className={'govuk-button'}
          onClick={redirect}
        />

        <h3 class="govuk-heading-s">More about flooding</h3>

        <p class="govuk-body">
          Find out how to{' '}
          <a href="#" class="govuk-link">
            protect yourself and your property online from flooding
          </a>
          .
        </p>

        <p class="govuk-body">
          <a href="#" class="govuk-link">
            What do you think of this service?
          </a>
          {''} Takes 30 seconds
        </p>
      </div>
      <Footer />
    </>
  )
}
