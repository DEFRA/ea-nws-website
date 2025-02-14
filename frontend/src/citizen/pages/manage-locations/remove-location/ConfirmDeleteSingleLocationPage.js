import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import InsetText from '../../../../common/components/gov-uk/InsetText'
import { setProfile } from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import { removeLocation } from '../../../../common/services/ProfileServices'

export default function ConfirmDeleteSingleLocationPage () {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const session = useSelector((state) => state.session)
  const [error, setError] = useState('')

  useEffect(() => {
    window.history.replaceState({}, location.pathname)
  }, [location])

  const handleSubmit = async () => {
    const data = {
      authToken: session.authToken,
      locationId: location.state.locationId,
      partnerId: location.state.partnerId
    }

    const { errorMessage } = await backendCall(
      data,
      'api/partner/unregister_location_from_partner',
      navigate
    )

    if (!errorMessage) {
      const updatedProfile = removeLocation(session.profile, location.state.name)

      const dataToSend = {
        authToken: session.authToken,
        profile: updatedProfile
      }

      const { errorMessage, data } = await backendCall(
        dataToSend,
        'api/profile/update',
        navigate
      )

      if (!errorMessage) {
        dispatch(setProfile(data.profile))
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

      <BackLink onClick={() => navigate(-1)} />
      {error && <ErrorSummary errorList={[error]} />}
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h2 className='govuk-heading-l'>
              Are you sure you want to remove this location?
            </h2>
            <InsetText text={location.state?.name} />
            <p className='govuk-!-margin-bottom-6 govuk-body'>
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
