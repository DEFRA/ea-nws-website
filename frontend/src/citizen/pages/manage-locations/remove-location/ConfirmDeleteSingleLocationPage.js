import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import InsetText from '../../../../common/components/gov-uk/InsetText'
import { setProfile } from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import { removeLocation } from '../../../../common/services/ProfileServices'
import CitizenAccountNavigation from '../../../../common/components/custom/CitizenAccountNavigation'

export default function ConfirmDeleteSingleLocationPage () {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const session = useSelector((state) => state.session)
  const [error, setError] = useState('')

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
          removedLocation: location.state.name
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
      <CitizenAccountNavigation currentPage={useLocation().pathname} />
      <BackLink onClick={() => navigate(-1)} />
      {error && <ErrorSummary errorList={[error]} />}
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h2 className='govuk-heading-l'>
              Are you sure you want to remove this location?
            </h2>
            <InsetText text={location.state?.name} />
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
              onClick={() => navigate(-1)}
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
    </>
  )
}
