import { useNavigate } from 'react-router-dom'
import Button from '../gov-uk-components/Button'
export default function DialogModal() {
  const navigate = useNavigate()
  //change the redirect to close the dialog box

  const handleclick = () => {
    navigate(-1)
  }

  return (
    <>
      <dialog open>
        <h1 class="govuk-heading-xl">youre about to be signed out</h1>
        <p class="govuk-body">
          for secuirty reasons we will sign you out in 2 minuets
        </p>
        <Button
          text="Stay signed in"
          className="govuk-button"
          onClick={handleclick}
        />
        <p class="govuk-body">
          <a href="signout/manually" class="govuk-link">
            Sign out
          </a>
          .
        </p>
      </dialog>
    </>
  )
}
