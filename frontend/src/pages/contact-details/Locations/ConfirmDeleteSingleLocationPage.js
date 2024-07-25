import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../gov-uk-components/Button'
import ErrorSummary from '../../../gov-uk-components/ErrorSummary'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import InsetText from '../../../gov-uk-components/InsetText'
import PhaseBanner from '../../../gov-uk-components/PhaseBanner'
import { setProfile } from '../../../redux/userSlice'
import {
  removeUnverifiedContact,
  removeVerifiedContact
} from '../../../services/ProfileServices'

export default function ConfirmDeleteSingleLocationPage() {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const session = useSelector((state) => state.session)

  const removeLocation = async () => {
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
    /*const { errorMessage } = await backendCall(
      data,
      'api/profile/update',
      navigate
    )
    if (!errorMessage) {*/
    dispatch(setProfile(updatedProfile))
    navigate('/home', {
      state: {
        removedAddress: location.state.address,
        removedAddressFail: false
      }
    })
    //}
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container'>
          <PhaseBanner />
          <Link to={() => navigate(-1)} className='govuk-back-link'>
            Back
          </Link>
          {location.state !== null && location.state.removedAddressFail ? (
            <ErrorSummary
              errorList={[
                'An error occured trying to remove a location.  ' +
                  location.state.removedAddress +
                  ' has not been removed.'
              ]}
            />
          ) : null}
          <main className='govuk-main-wrapper'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-two-thirds'>
                <h2 className='govuk-heading-l'>
                  Are you sure you want to remove this location?
                </h2>
                <InsetText text={location.state.address} />
                <p>
                  You'll no longer get any flood warnings or alerts for this
                  location.
                </p>
                <Button
                  className='govuk-button govuk-button--warning'
                  text='Remove this location'
                  onClick={removeLocation}
                />
                &nbsp; &nbsp;
                <Link
                  to='/home'
                  className='govuk-body govuk-link'
                  style={{
                    display: 'inline-block',
                    padding: '8px 10px 7px'
                  }}
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
