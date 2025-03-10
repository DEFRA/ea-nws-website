import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import PrivateBetaPrivacyNoticePage from '../../../common/pages/private-beta/PrivateBetaPrivacyNoticePage'
import { backendCall } from '../../../common/services/BackendService'

export default function PrivacyNoticePage () {
  const navigate = useNavigate()
  const [servicePhase, setServicePhase] = useState(false)

  async function getServicePhase () {
    const { data } = await backendCall(
      'data',
      'api/service/get_service_phase'
    )
    setServicePhase(data)
  }

  useEffect(() => {
    getServicePhase()
  }, [])

  return (
    <>
      {servicePhase === 'beta'
        ? (
          <>
            <PrivateBetaPrivacyNoticePage />
          </>
          )
        : (
          <>
            <BackLink onClick={() => navigate(-1)} />
            <main className='govuk-main-wrapper govuk-!-padding-top-4'>
              <div className='govuk-grid-row'>
                <div className='govuk-grid-column-two-thirds'>
                  <div className='govuk-body'>
                    <h1 className='govuk-heading-l'>Privacy notice</h1>
                    <h2 className='govuk-heading-m'>Who we are</h2>
                    <p>
                      The Environment Agency is the data controller for the Flood
                      Warning System in England. Our{' '}
                      <a className='govuk-link'>personal information charter</a>{' '}
                      explains your rights and how we deal with your personal
                      information.
                    </p>
                    <p>
                      Natural Resources Wales use the same system and are the data
                      controller if you ask for a service in Wales. To read about how
                      Natural Resources Wales uses your personal information go to{' '}
                      <a className='govuk-link'>naturalresources.wales/privacy</a>.
                    </p>
                    <h2 className='govuk-heading-m'>What data we collect</h2>
                    <p>
                      If you register with us, the personal data we collect about you
                      includes:
                    </p>
                    <ul className='govuk-list govuk-list--bullet'>
                      <li>name</li>
                      <li>contact details</li>
                      <li>
                        address or locations of interest for which you would like to
                        receive warnings
                      </li>
                    </ul>
                    <h3 className='govuk-heading-s'>Cookies and analytics</h3>
                    <p>
                      Read our full{' '}
                      <Link to='cookies' className='govuk-link' style={{ cursor: 'pointer' }}>
                        cookie notice
                      </Link>{' '}
                      to find out how we use cookies.
                    </p>
                    <h2 className='govuk-heading-m'>
                      What we do with your personal data
                    </h2>
                    <p>We may use your personal information to:</p>
                    <ul className='govuk-list govuk-list--bullet'>
                      <li>send you the warnings you have signed up for</li>
                      <li>
                        send you a small number of service announcements or
                        administrative messages
                      </li>
                      <li>
                        help emergency services and local councils respond to flooding
                      </li>
                      <li>
                        help with our work on flood warning and flood risk management
                      </li>
                    </ul>
                    <h3 className='govuk-heading-s'>How we work with phone companies</h3>
                    <p>
                      We have a legal duty under the{' '}
                      <a className='govuk-link'>Civil Contingencies Act</a> to
                      maintain arrangements to warn people who may be at risk of
                      flooding. The lawful basis for processing your personal data is
                      to perform a task in the public interest that is set out in law.
                    </p>
                    <p>
                      We work with phone companies to obtain phone numbers for
                      addresses where there is no customer registered for the flood
                      warning service. We tell phone companies the unregistered
                      addresses at risk of flooding and they send us a list of the
                      phone numbers registered to those addresses. They do not give us
                      the names or addresses associated with those numbers.
                    </p>
                    <p>
                      The phone number will stop being sent flood warnings if the
                      phone companies no longer provide us with the phone number. This
                      might happen if:
                    </p>
                    <ul className='govuk-list govuk-list--bullet'>
                      <li>you change or cancel your phone number</li>
                      <li>you move house</li>
                      <li>we change the areas that we provide warnings to</li>
                    </ul>
                    <h2 className='govuk-heading-m'>
                      Where your data is processed and stored
                    </h2>
                    <p>
                      We design, build and run our systems to make sure that your data
                      is as safe as possible at all stages, both while it’s processed
                      and when it’s stored.
                    </p>
                    <p>
                      Your personal information is stored and processed securely on
                      servers in the UK and Ireland.
                    </p>
                    <h2 className='govuk-heading-m'>
                      Who your data might be shared with
                    </h2>
                    <h3 className='govuk-heading-s'>Third party service providers</h3>
                    <p>
                      We may share your information with our agents or
                      representatives, so they can manage your account. Our agents or
                      representatives will only use your personal data in line with
                      what we have set out in this privacy notice.
                    </p>
                    <p>We will not:</p>
                    <ul className='govuk-list govuk-list--bullet'>
                      <li>sell or rent your data to third parties</li>
                      <li>
                        share your data with third parties for marketing purposes
                      </li>
                    </ul>
                    <h3 className='govuk-heading-s'>Legal obligations</h3>
                    <p>
                      We may share your data or disclose information because of a law,
                      regulation or court order and to protect our interests and legal
                      rights.
                    </p>
                    <h2 className='govuk-heading-m'>How long we keep your data</h2>
                    <p>
                      We will keep your personal data for as long as your account is
                      active, and for 6 years from the date that your flood warnings
                      account is cancelled. This is in line with our retention policy.
                    </p>
                    <p>
                      We need to keep your details so that we can stop your phone
                      number from being automatically added to the service again after
                      you cancel your account. After 6 years, we will no longer have a
                      record that you cancelled your account and your phone number
                      could be automatically added again.
                    </p>
                    <h2 className='govuk-heading-m'>Changes to this policy</h2>
                    <p>
                      We may change this privacy notice. In that case, the ‘last
                      updated’ date at the bottom of this page will also change. Any
                      changes to this privacy notice will apply to you and your data
                      immediately.
                    </p>
                    <p>
                      We encourage you to review this privacy notice regularly to find
                      out how we are protecting your data.
                    </p>
                    <p>Last updated: 26 September 2022</p>
                  </div>
                </div>
              </div>
            </main>
          </>)}

    </>
  )
}
