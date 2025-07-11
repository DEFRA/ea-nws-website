import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import Checkbox from '../../../common/components/gov-uk/CheckBox'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import { setProfile } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { updateAdditionals } from '../../../common/services/ProfileServices'
import { orgSignUpUrls } from '../../routes/sign-up/SignUpRoutes'

export default function TermsAndConditionsPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.session.authToken)
  const profile = useSelector((state) => state.session.profile)
  const termsAndConditionsId = 'terms-and-conditions-checkbox'

  const [error, setError] = useState('')
  const [isChecked, setIsChecked] = useState(false)

  const organisationName = useSelector(
    (state) => state.session.organization.name
  )
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!isChecked) {
      setError(
        'You must tick to confirm that you’ve read and are authorised to agree to these terms and conditions on behalf of your organisation'
      )
    } else {
      // Save lastAccessedUrl so users are taken to next page if logging in after abandoning at this point
      const updatedProfile = updateAdditionals(profile, [
        { id: 'signupComplete', value: { s: 'false' } },
        {
          id: 'lastAccessedUrl',
          value: { s: orgSignUpUrls.review }
        }
      ])
      dispatch(setProfile(updatedProfile))

      const profileDataToSend = {
        profile: updatedProfile,
        authToken,
        signinType: 'org'
      }
      await backendCall(profileDataToSend, 'api/profile/update', navigate)

      navigate(orgSignUpUrls.review)
    }
  }

  return (
    <>
      <Helmet>
        <title>Check the terms and conditions - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-body govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[{text: error, componentId: termsAndConditionsId}]} />}

            <h1 className='govuk-heading-l' id='main-content'>
              Check the terms and conditions
            </h1>

            <p>
              These are the terms and conditions under which we, the Environment
              Agency, provide the ‘Get flood warnings (professional)’ service to
              your organisation. You must have the authority to accept these
              terms and conditions on behalf of your organisation. They are
              legally binding.
            </p>
            <h2 className='govuk-heading-m'>What we will and will not do</h2>
            <p>
              We make reasonable efforts to send flood warnings for locations
              added to your organisation’s account.
            </p>

            <p>
              {' '}
              However, we cannot guarantee they will be sent or arrive. For
              example, you may fail to receive a warning due to unplanned
              network disruption.
            </p>
            <p>
              We aim to develop and issue flood warnings based on the best
              available data and as early as possible before flooding is likely.
              But we cannot guarantee warnings are always accurate or complete
              due to the sometimes unpredictable nature of weather and flooding.
              In certain circumstances, we may not be able to give as much early
              notice as we would like.
            </p>
            <p>
              We’ll send flood warnings to email addresses and telephone numbers
              added by your administrators.
            </p>

            <p>We do not accept responsibility for any:</p>
            <ul className='govuk-list govuk-list--bullet'>
              <li>flood warnings that fail to send or arrive</li>
              <li>
                action your organisation takes or fails to take in response to a
                warning
              </li>
              <li>
                losses, damage or costs you have in connection with our service
                except when the law says we must
              </li>
            </ul>

            <p>We can not guarantee that this service:</p>
            <ul className='govuk-list govuk-list--bullet'>
              <li>will always be available (either online or by phone)</li>
              <li>is free of errors</li>
              <li>will never suffer from malicious software attacks</li>
            </ul>

            <h2 className='govuk-heading-m'>What you're responsible for</h2>
            <p>You need to:</p>
            <ul className='govuk-list govuk-list--bullet'>
              <li>
                maintain accurate details for your contacts who need flood
                warnings
              </li>
              <li>
                add and maintain locations your organisation needs warnings for
              </li>
              <li>
                choose which types of warnings your organisation wants to
                receive
              </li>
              <li>
                interpret and apply the flood warnings we send, to suit your
                needs
              </li>
            </ul>

            <h2 className='govuk-heading-m'>How we use personal information</h2>
            <p>
              Our
              <a
                href='/organisation/privacy'
                className='govuk-link'
                target='_blank'
              >
                {' '}
                privacy notice (opens new window)
              </a>{' '}
              explains more about how we treat personal information.
            </p>

            <h2 className='govuk-heading-m govuk-!-padding-top-3'>
              Accept terms and conditions
            </h2>
            <p>This agreement:</p>
            <ul className='govuk-list govuk-list--bullet'>
              <li>is governed by English law</li>
              <li>starts from the date you tick and accept</li>
            </ul>
            <div
              className={
                error
                  ? 'govuk-form-group govuk-form-group--error'
                  : 'govuk-form-group'
              }
            >
              {error && (
                <p className='govuk-error-message'>
                  <span className='govuk-visually-hidden'>Error:</span> {error}
                </p>
              )}
              <Checkbox
                id={termsAndConditionsId}
                onChange={() => setIsChecked(!isChecked)}
                checked={isChecked}
                label={`I warrant that I’m authorised to agree to these terms and conditions on behalf of ${organisationName}.`}
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
      </main>
    </>
  )
}
