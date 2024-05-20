import Header from '../../gov-uk-components/Header'
import Footer from '../../gov-uk-components/Footer'
import Button from '../../gov-uk-components/Button'
import routes from '../../routes/routes'
import { useNavigate } from 'react-router-dom'

export default function SignBackIn() {
  const navigate = useNavigate()
  function redirect() {
    navigate('/SignInPage')
    //window.location.href = "/SignInPage";
  }

  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <h1 class="govuk-heading-l">
          You need to sign back in to view this page
        </h1>
        <Button
          text={'sign in'}
          className={'govuk-button'}
          onClick={redirect}
        />
      </div>
      <Footer />
    </>
  )
}
