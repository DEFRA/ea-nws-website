import { React } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../../../gov-uk-components/Button'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import PhaseBanner from '../../../gov-uk-components/PhaseBanner'
import AccountDetailsTable from './AccountDetailsTable'
import ContactReviewTable from './ContactReviewTable'
import FloodMessageReviewTable from './FloodMessageReviewTable'
import LocationReviewTable from './LocationReviewTable'
export default function CheckYourAnswersPage () {
  const session = useSelector((state) => state.session)
  const profile = session.profile
  const registration = session.registrations
  const contactPreferences = session.contactPreferences
  
  const handleButton = () => {
    console.log('Button clicked, functionality to implement')
  }

  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <PhaseBanner />
        <Link to='/home' className='govuk-link'>
          Back
        </Link>
        <main className='govuk-main-wrapper'>
          <div className='govuk-grid-row '>
            <div className='govuk-grid-column-three-quarters'>
              <h2 className='govuk-heading-l'>Check your answers</h2>
              <LocationReviewTable locations={profile.pois} />
              <FloodMessageReviewTable registration={registration} />
              <ContactReviewTable
                profile={profile}
                contactPreferences={contactPreferences}
              />
              <AccountDetailsTable profile={profile} />
            </div>
          </div>
          <Button onClick={handleButton} className='govuk-button' text='Finish sign up'/>
        </main>
      </div>
      <Footer />
    </>
  )
}
