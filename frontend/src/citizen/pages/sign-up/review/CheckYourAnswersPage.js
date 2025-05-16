import { React } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import { setProfile } from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import { updateAdditionals } from '../../../../common/services/ProfileServices'
import AccountDetailsTable from './AccountDetailsTable'
import ContactReviewTable from './ContactReviewTable'
import FloodMessageReviewTable from './FloodMessageReviewTable'
import LocationReviewTable from './LocationReviewTable'

export default function CheckYourAnswersPage () {
  const session = useSelector((state) => state.session)
  const profile = useSelector((state) => state.session.profile)
  const registration = useSelector((state) => state.session.registrations)
  const contactPreferences = useSelector(
    (state) => state.session.contactPreferences
  )
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleButton = async (event) => {
    event.preventDefault()
    if (signUpAccountValidation) {
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

      <BackLink to='/declaration' />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row '>
          <div className='govuk-grid-column-three-quarters'>
            <h1 className='govuk-heading-l'>Check your answers</h1>
            <LocationReviewTable locations={profile.pois} />
            <FloodMessageReviewTable registration={registration} />
            <ContactReviewTable
              profile={profile}
              contactPreferences={contactPreferences}
            />
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
