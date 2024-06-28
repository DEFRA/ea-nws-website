import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function ValidateLandlinePhonePage() {
  const navigate = useNavigate()
  const session = useSelector((state) => state.session)

  const NavigateToNextPage = () => {
    if (session.contactPreferences.includes('Email')) {
      // navigate to email TODO - cameron add this once merged
    } else if (session.contactPreferences.includes('Mobile')) {
      navigate('/signup/contactpreferences/mobile/add')
    } else {
      navigate('/signup/accountname/add')
    }
  }

  const SkipValidation = () => {
    navigate('/signup/contactpreferences/landline/skipconfirmation')
  }
  const DifferentHomePhone = (homePhone) => {
    navigate('/signup/contactpreferences/landline/add', {
      state: {
        homePhone
      }
    })
  }

  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <PhaseBanner />
        <Link onClick={differentLandline} className="govuk-back-link">
          Back
        </Link>
        {error && <ErrorSummary errorList={[error]} />}
        <h2 class="govuk-heading-l">Check your email</h2>
        <div class="govuk-body">
          We're calling this number to read out a code:
          <InsetText text={homePhone} />
          <Input
            name="Enter code"
            inputType="text"
            error={error}
            className="govuk-input govuk-input--width-10"
            onChange={(val) => setCode(val)}
          />
          <Button
            className="govuk-button"
            text="Continue"
            onClick={handleSubmit}
          />
          &nbsp; &nbsp;
          <Link
            className="govuk-link"
            onClick={skipValidation}
            style={{
              display: 'inline-block',
              padding: '8px 10px 7px'
            }}
          >
            Skip and confirm later
          </Link>
          <br />
          <Link
            onClick={getNewCode}
            className="govuk-link"
            style={{
              display: 'inline-block'
            }}
          >
            Get a new code
          </Link>
          <br />
          <br />
          <Link
            onClick={differentLandline}
            className="govuk-link"
            style={{
              display: 'inline-block'
            }}
          >
            Enter a different telephone number
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}
