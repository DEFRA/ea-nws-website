import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import ErrorSummary from '../../gov-uk-components/ErrorSummary'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import InsetText from '../../gov-uk-components/InsetText'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'
import { setProfile } from '../../redux/userSlice'
import { backendCall } from '../../services/BackendService'
import { removeLocation } from '../../services/ProfileServices'

export default function ConfirmDeleteSingleLocationPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const session = useSelector((state) => state.session)
  const location = useLocation()
  const [error, setError] = useState('')

  useEffect(() => {
    console.log('name', location.state.name)
  }, [])

  const handleSubmit = async () => {
    const updatedProfile = removeLocation(session.profile, location.state.name)

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
      navigate('/home', {
        state: {
          removedAddress: location.state.name
        }
      })
    } else {
      setError(
        'An error occured trying to remove a location.  ' +
          location.state.name +
          ' has not been removed. Please try again later.'
      )
    }
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          <Link
            to={() => navigate(-1)}
            className='govuk-back-link govuk-!-margin-bottom-0 govuk-!-margin-top-0'
          >
            Back
          </Link>
          {error && <ErrorSummary errorList={[error]} />}
          <main className='govuk-main-wrapper govuk-!-padding-top-4'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-two-thirds'>
                <h2 className='govuk-heading-l'>
                  Are you sure you want to remove this location?
                </h2>
                <InsetText text={location.state.name} />
                <p className='govuk-!-margin-bottom-6'>
                  You'll no longer get any flood warnings or alerts for this
                  location.
                </p>
                <Button
                  className='govuk-button govuk-button--warning'
                  text='Remove this location'
                  onClick={handleSubmit}
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
