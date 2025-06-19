import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../../../../common/components/gov-uk/Button'
import { setProfile } from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import { updateAdditionals } from '../../../../common/services/ProfileServices'
import AccountDetailsTable from './AccountDetailsTable'
import ContactReviewTable from './ContactReviewTable'
import FloodMessageReviewTable from './FloodMessageReviewTable'
import LocationReviewTable from './LocationReviewTable'

export default function CheckYourAnswersPage() {
  const session = useSelector((state) => state.session)
  const profile = useSelector((state) => state.session.profile)
  const contacts = {
    emails: profile?.emails,
    unverifiedEmails: profile?.unverified?.emails,
    mobilePhones: profile?.mobilePhones,
    unverifiedMobiles: profile?.unverified?.mobilePhones,
    homePhones: profile?.homePhones,
    unverifiedHomePhones: profile?.unverified?.homePhones
  }
  const registration = useSelector((state) => state.session.registrations)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleButton = async (event) => {
    event.preventDefault()
    if (signUpAccountValidation()) {
      const updatedProfile = updateAdditionals(profile, [
        { id: 'signupComplete', value: { s: 'true' } },
        { id: 'lastAccessedUrl', value: { s: '/signup/review' } }
      ])
      dispatch(setProfile(updatedProfile))
      const dataToSend = {
        profile: updatedProfile,
        authToken: session.authToken
      }
      await backendCall(dataToSend, 'api/profile/update', navigate)

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
      <Helmet>
        <title>Check your answers - Get flood warnings - GOV.UK</title>
      </Helmet>
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            <h1 className='govuk-heading-l' id='main-content'>
              Check your answers
            </h1>
            <LocationReviewTable locations={profile.pois} />
            <FloodMessageReviewTable registration={registration} />
            <ContactReviewTable contacts={contacts} />
            <AccountDetailsTable profile={profile} />
          </div>
        </div>
        <Button
          onClick={handleButton}
          className='govuk-button'
          text='Finish sign up'
        />
      </main>
    </>
  )
}
