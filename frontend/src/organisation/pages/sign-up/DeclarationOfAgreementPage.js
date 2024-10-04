import React, { useState } from 'react'
import BackLink from '../../../common/components/custom/BackLink'
import { useNavigate } from 'react-router'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Button from '../../../common/components/gov-uk/Button'
import Checkbox from '../../../common/components/gov-uk/CheckBox'

export default function DeclarationOfAgreement () {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isChecked, setIsChecked] = useState(false)

  const handleSubmit = () => {
    if (!isChecked) {
      setError('You must tick to confirm that you’ve read and are authorised to agree to these terms and conditions on behalf of your organisation')
    } else { navigate('/organisation/sign-up/review') }
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'> Check the terms and conditions</h1>
            <h2 className='govuk-heading-m'>What we will do</h2>
            <p className='govuk-body'>
              We make all reasonable efforts to send flood warnings for locations added to your organisation’s account,
              but we cannot guarantee they will be sent or arrive.
            </p>

            <p className='govuk-body'> We may send warnings at any time of day or night.</p>
            <h2 className='govuk-heading-m'>What we will not do</h2>
            <p className='govuk-body'> We do not accept responsibility:</p>

            <ul className='govuk-list govuk-list--bullet'>
              <li>
                <p className='govuk-body'>if you fail to receive a warning</p>
              </li>
              <li>
                <p className='govuk-body'>for any loss, damage or costs to your organisation due
                  to flooding or us sending or not sending flood warnings, unless we must by law
                </p>
              </li>
            </ul>
            <p className='govuk-body'>
              We do not guarantee that our online or phone services will be available.
            </p>

            <h2 className='govuk-heading-m'>What you're responsible for</h2>
            <p className='govuk-body'>You need to:</p>
            <ul className='govuk-list govuk-list--bullet'>
              <li>
                <p className='govuk-body'> give correct organisation contact details</p>
              </li>
              <li>
                <p className='govuk-body'> confirm you can act on behalf of your organisation</p>
              </li>
            </ul>
            <p className='govuk-body'>Your organisation needs to:</p>
            <ul className='govuk-list govuk-list--bullet'>
              <li>
                <p className='govuk-body'>set up the service, using an administrator sign-in</p>
              </li>
              <li>
                <p className='govuk-body'>add and maintain locations your organisation need warnings for</p>
              </li>
              <li>
                <p className='govuk-body'>manage types of warnings your organisation needs</p>
              </li>
              <li>
                <p className='govuk-body'>maintain user details, such as email addresses and telephone numbers</p>
              </li>
              <li>
                <p className='govuk-body'>keep an offline copy of all locations entered into our service,
                  in case data in our service is lost
                </p>
              </li>
            </ul>

            <h2 className='govuk-heading-m'>How we use personal information</h2>
            <p className='govuk-body'>We may use this to: </p>
            <ul className='govuk-list govuk-list--bullet'>
              <li>
                <p className='govuk-body'>send warnings for requested locations</p>
              </li>
              <li>
                <p className='govuk-body'>send a small number of administrative messages</p>
              </li>
              <li>
                <p className='govuk-body'>help with our work on flood warning and flood risk management</p>
              </li>
              <li>
                <p className='govuk-body'>help emergency services and local councils respond to flooding</p>
              </li>
              <li>
                <p className='govuk-body'>reply to requests for information under the
                  <a
                    href='https://www.gov.uk/make-a-freedom-of-information-request'
                    className='govuk-link'
                  >
                    {' '}
                    Freedom of Information Act {' '}
                  </a>
                  or
                  <a
                    href='
https://ico.org.uk/for-organisations/eir-and-access-to-information/guide-to-the-environmental-information-regulations/what-are-the-eir/'
                    className='govuk-link'
                  >
                    {' '}
                    Environmental Information Regulations
                  </a>
                  , if the
                  <a
                    href='https://www.gov.uk/data-protection'
                    className='govuk-link'
                  >
                    {' '}
                    Data Protection Act {' '}
                  </a>
                  allows
                </p>
              </li>
            </ul>
            <p className='govuk-body'>
              We may give personal information to our agents or representatives,
              so they can do any of these things for us.
              And we may share this information with other organisations,
              if the laws says we must.
            </p>
            <p className='govuk-body'>The Environment Agency manages the flood warning systems. Our
              <a
                href='/organisation/privacy'
                className='govuk-link'
              >
                {' '}
                privacy notice {' '}
              </a>
              explains more about how we treat personal information.
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
                label='I’ve read and am authorised to agree to these terms and conditions   on behalf of my organisation.'
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
