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
import { handleResponse } from '../../services/HandleResponse'

export default function ConfirmDeleteContactDetailsPage () {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // [TODO] we need to perform a check if this is null
  // most likely would be null if the user has logged out etc
  // but we should take the user to an error page or something similar
  const session = useSelector((state) => state.session)

  const removeContact = async () => {
    const updatedProfile = removeContactFromProfile(
      session.profile,
      location.state.contact
    )
    const data = JSON.stringify({
      authToken: session.authToken,
      profile: updatedProfile
    })
    const response = await backendCall(data, 'profile/update')
    const responseData = handleResponse(response, navigate)

    if (responseData) {
      dispatch(setProfile(updatedProfile))
      navigate('/managecontacts', {
        state: {
          removedType: location.state.type,
          removedContact: location.state.contact
        }
      })
    }
  }

  const removeContactFromProfile = (profile, valueToRemove) => {
    const updatedProfile = { ...profile }
    const propertiesToCheck = ['emails', 'mobilePhones', 'homePhones']

    propertiesToCheck.forEach((property) => {
      if (Array.isArray(updatedProfile[property])) {
        updatedProfile[property] = updatedProfile[property].filter(
          (item) => item !== valueToRemove
        )
      }
    })
    return updatedProfile
  }

  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <PhaseBanner />
        <Link to='/managecontacts' className='govuk-back-link'>
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
              <Link to='/managecontacts' className='govuk-body govuk-link'>
                Cancel
              </Link>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
