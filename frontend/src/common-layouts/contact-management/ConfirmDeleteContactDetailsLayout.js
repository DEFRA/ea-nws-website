import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import InsetText from '../../gov-uk-components/InsetText'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'
import { setProfile } from '../../redux/userSlice'
import { backendCall } from '../../services/BackendService'
import {
  removeUnverifiedContact,
  removeVerifiedContact
} from '../../services/ProfileServices'

export default function ConfirmDeleteContactDetailsLayout({
  NavigateToPreviousPage,
  NavigateToNextPage
}) {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const session = useSelector((state) => state.session)
  const removeContact = async () => {
    let updatedProfile = removeVerifiedContact(
      session.profile,
      location.state.contact
    )
    updatedProfile = removeUnverifiedContact(
      updatedProfile,
      location.state.contact
    )

    const data = {
      authToken: session.authToken,
      profile: updatedProfile
    }

    // profile returned but we just need to make sure no error is returned
    const { errorMessage } = await backendCall(
      data,
      'api/profile/update',
      navigate
    )
    if (!errorMessage) {
      dispatch(setProfile(updatedProfile))
      NavigateToNextPage(location.state.type, location.state.contact)
    }
  }

  const handleCancelLink = (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          <Link onClick={handleCancelLink} className='govuk-back-link'>
            Back
          </Link>
          <main className='govuk-main-wrapper'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-two-thirds'>
                <h2 className='govuk-heading-l'>
                  Are you sure you want to remove this {location.state.type}?
                </h2>
                <InsetText text={location.state.contact} />
                <Button
                  className='govuk-button govuk-button--warning'
                  text='Remove'
                  onClick={removeContact}
                />
                &nbsp; &nbsp;
                <Link
                  onClick={handleCancelLink}
                  className='govuk-body govuk-link inline-link'
                >
                  Cancel
                </Link>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  )
}
