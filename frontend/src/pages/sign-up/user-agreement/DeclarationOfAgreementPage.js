import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../gov-uk-components/Button'
import Checkbox from '../../../gov-uk-components/CheckBox'
import ErrorSummary from '../../../gov-uk-components/ErrorSummary'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import PhaseBanner from '../../../gov-uk-components/PhaseBanner'
import { setProfile, setRegistrations } from '../../../redux/userSlice'
import { backendCall } from '../../../services/BackendService'
import { updateAdditionals } from '../../../services/ProfileServices'
export default function DeclarationOfAgreementPage () {
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(false)
  const session = useSelector((state) => state.session)
  const [error, setError] = useState('')
  const profile = session.profile
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (isChecked === false) {
      setError('Tick to confirm you agree with the terms and conditions')
    } else {
      const registrations = {
        params: {
          channelVoiceEnabled: profile.homePhones.length !== 0,
          channelSmsEnabled: profile.mobilePhones.length !== 0,
          channelEmailEnabled: profile.emails.length !== 0,
          // What is that?
          partnerCanView: false,
          partnerCanEdit: false,
          // TODO
          categories: [
            {
              domain: 'NFWS',
              code: 'FLOOD_ALERT'
            },
            {
              domain: 'NFWS',
              code: 'FLOOD_WARNING'
            },
            {
              domain: 'NFWS',
              code: 'SEVERE_FLOOD_WARNING'
            }
          ]
        }
      }
      dispatch(setRegistrations(registrations))
      const updatedProfile = updateAdditionals(session.profile, [
        { id: 'lastAccessedUrl', value: '/home' }
      ])
      dispatch(setProfile(updatedProfile))
      updateBackendProfile(updatedProfile)
      navigate('/signup/review')
    }
  }

  const updateBackendProfile = async (updatedProfile) => {
    const dataToSend = {
      profile: updatedProfile,
      authToken: session.authToken
    }
    await backendCall(dataToSend, 'api/profile/update', navigate)
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          <div className='govuk-body'>
            <Link onClick={() => navigate(-1)} className='govuk-back-link'>
              Back
            </Link>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 class='govuk-heading-l'>Check the terms and conditions</h1>
            <h3 class='govuk-heading-s'>What we will do</h3>
            <p>
              We make all reasonable efforts to send the flood warnings you have
              asked for, but we cannot guarantee they will be sent or arrive.
              Warnings may be sent at any time of day or night.
            </p>

            <h3 class='govuk-heading-s'>We do not:</h3>
            <ul class='govuk-list govuk-list--bullet'>
              <li>accept responsibility if you fail to receive a warning</li>
              <li>
                guarantee that our online or phone services will be available
              </li>
              <li>
                accept responsibility for any loss, damage or costs incurred by
                you caused by flooding, or by issuing or failing to issue
                warnings, except where the law says we must
              </li>
            </ul>

            <h3 class='govuk-heading-s'>You are responsible for:</h3>
            <ul class='govuk-list govuk-list--bullet'>
              <li>providing us with accurate contact details</li>
              <li>telling us about any changes to your contact information</li>
            </ul>

            <h3 class='govuk-heading-s'>
              How will we use your personal information
            </h3>
            <p>We may use the personal information you provide to:</p>
            <ul class='govuk-list govuk-list--bullet'>
              <li>send you warnings you've asked for</li>
              <li>
                send you a small number of services or administrative messages
              </li>
              <li>
                help emergency services and local councils respond to flooding
              </li>
              <li>
                help with out work on flood warning and local flood risk
                management
              </li>
            </ul>

            <p>
              We may give your information to our agents or representatives so
              they can do any of these things for us. And we may share you
              information with other organisations if the laws say we must.
            </p>

            <p>
              The Environment Agency manages the flood warning systems. Our
              <a
                href='https://www.fws.environment-agency.gov.uk/app/olr/privacy'
                class='govuk-link'
              >
                {' '}
                privacy notice (open new window)
              </a>
              explains how we treat your personal information.
            </p>

            <p>
              Natural Resources Wales use the same systems and will have access
              to your personal information if you ask for a service in Wales.
              Read how Natural Resources Wales
              <a
                href='https://www.gov.uk/government/organisations/environment-agency/about/personal-information-charter'
                class='govuk-link'
              >
                {' '}
                Treat your personal information (opens new window)
              </a>
            </p>

            <div
              className={
                error
                  ? 'govuk-form-group govuk-form-group--error'
                  : 'govuk-form-group'
              }
            >
              {error && <p className='govuk-error-message'>{error}</p>}
              <Checkbox
                onChange={() => setIsChecked(!isChecked)}
                checked={isChecked}
                label='I agree to the terms and conditions'
                value='T&C'
              />
            </div>
            <Button
              className='govuk-button'
              text='Continue'
              onClick={handleSubmit}
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
