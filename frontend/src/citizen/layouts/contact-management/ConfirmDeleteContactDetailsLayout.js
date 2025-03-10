import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import InsetText from '../../../common/components/gov-uk/InsetText'
import { setProfile } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import {
  removeUnverifiedContact,
  removeVerifiedContact
} from '../../../common/services/ProfileServices'

export default function ConfirmDeleteContactDetailsLayout ({
  NavigateToPreviousPage,
  navigateToNextPage
}) {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const session = useSelector((state) => state.session)
  const removeContact = async (event) => {
    event.preventDefault()
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
      navigateToNextPage(location.state.type, location.state.contact)
    }
  }

  const handleCancelLink = (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  return (
    <>

      <BackLink onClick={handleCancelLink} />
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
              style={{ cursor: 'pointer' }}
            >
              Cancel
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
