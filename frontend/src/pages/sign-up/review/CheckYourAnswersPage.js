import { React } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../gov-uk-components/Button'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import PhaseBanner from '../../../gov-uk-components/PhaseBanner'
import AccountDetailsTable from './AccountDetailsTable'
import ContactReviewTable from './ContactReviewTable'
import FloodMessageReviewTable from './FloodMessageReviewTable'
import LocationReviewTable from './LocationReviewTable'
export default function CheckYourAnswersPage() {
  const session = useSelector((state) => state.session)
  const profile = session.profile
  const registration = session.registrations
  const contactPreferences = session.contactPreferences
  const navigate = useNavigate()

  const handleButton = () => {
    if (signUpAccountValidation) {
      navigate('/signup/success')
    }
  }

  const signUpAccountValidation = () => {
    return (
      profile.emails[0] &&
      profile.firstname &&
      profile.lastname &&
      profile.pois.length !== 0
    )
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          <Link
            to='/declaration'
            className='govuk-back-link govuk-!-padding-top-0'
          >
            Back
          </Link>
          <main className='govuk-main-wrapper'>
            <div className='govuk-grid-row '>
              <div className='govuk-grid-column-three-quarters'>
                <h2 className='govuk-heading-l'>Check your answers</h2>
                <LocationReviewTable locations={profile.pois} />
                <br />
                <FloodMessageReviewTable registration={registration} />
                <br />
                <ContactReviewTable
                  profile={profile}
                  contactPreferences={contactPreferences}
                />
                <br />
                <AccountDetailsTable profile={profile} />
              </div>
            </div>
            <Button
              onClick={handleButton}
              className='govuk-button'
              text='Finish sign up'
            />
          </main>
        </div>
        <Footer />
      </div>
    </>
  )
}
