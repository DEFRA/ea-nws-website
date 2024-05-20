import { useNavigate } from 'react-router'
import Button from '../../gov-uk-components/Button'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
const userEmail = window.sessionStorage.getItem('userEmail')
const signInToken = window.sessionStorage.getItem('signInToken')
const backendCall = require('../../services/BackendService')

export default function SignOutAutomatically() {
  const navigate = useNavigate()
  const loggedOut = async () => {
    let raw = JSON.stringify({ signinToken: signInToken })
    const responseData = await backendCall(raw, 'signOutAutomatically')

    if (signInToken !== '' && userEmail !== '') {
      window.sessionStorage.setItem('authToken', responseData[''])
      window.sessionStorage.setItem('profile', responseData[''])
      window.sessionStorage.setItem('userEmail', responseData[''])
      return true
    }
  }

  function testloggedOut(loggedOut) {
    if (loggedOut === true) {
      console.log('user has been logged out')
    } else {
      console.log('There is no user to log out')
    }
  }

  testloggedOut(loggedOut)

  function redirect() {
    navigate('/SignInPage')
  }

  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <h2 class="govuk-heading-l">
          You've been signed out for security reasons
        </h2>
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
