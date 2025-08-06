import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import PrivateBetaPrivacyNoticePage from '../../../common/pages/private-beta/PrivateBetaPrivacyNoticePage'
import { backendCall } from '../../../common/services/BackendService'

export default function PrivacyNoticeLayout({ isOrg = false }) {
  const navigate = useNavigate()
  const [servicePhase, setServicePhase] = useState(false)

  async function getServicePhase() {
    const { data } = await backendCall('data', 'api/service/get_service_phase')
    setServicePhase(data)
  }

  useEffect(() => {
    getServicePhase()
  }, [])

  return (
    <>
      <Helmet>
        <title>
          {`Privacy notice - Get flood warnings${
            isOrg ? ' (professional)' : ''
          } -
          GOV.UK`}
        </title>
      </Helmet>
      {servicePhase === 'beta' ? (
        <>
          <PrivateBetaPrivacyNoticePage />
        </>
      ) : (
        <>
          <BackLink onClick={() => navigate(-1)} />
          <main className='govuk-main-wrapper govuk-!-padding-top-4'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-three-quarters'>
                <div className='govuk-body'>
                  <h1 className='govuk-heading-l' id='main-content'>
                    Privacy notice
                  </h1>
                  <p>
                    The Environment Agency is the data controller for the Get
                    flood warnings service in England.
                  </p>
                  <p>
                    Our{' '}
                    <a
                      className='govuk-link'
                      href='https://www.gov.uk/government/organisations/environment-agency/about/personal-information-charter'
                    >
                      personal information charter
                    </a>{' '}
                    explains what we do with personal data in general, your
                    rights and how to contact our data protection officer.
                  </p>
                  {isOrg && (
                    <p>
                      Personal data rules that apply to the account holder also
                      apply to any colleagues or other people added to the
                      account.
                    </p>
                  )}

                  <h2 className='govuk-heading-m govuk-!-margin-top-6'>
                    What we do with your personal data in this service
                  </h2>
                  <p>We may use this to:</p>
                  <ul className='govuk-list govuk-list--bullet'>
                    <li>send you flood warnings</li>
                    <li>
                      send you service announcements or administrative messages
                    </li>
                    <li>
                      help emergency services and local councils respond to
                      flooding
                    </li>
                    <li>
                      support our work on flood warning and flood risk
                      management
                    </li>
                  </ul>

                  <h2 className='govuk-heading-m govuk-!-margin-top-6'>
                    Personal data we collect and how long we keep it
                  </h2>
                  {isOrg ? (
                    <>
                      <p>
                        We collect personal data when you, or someone in your
                        organisation, adds it to your organisation's account.
                      </p>
                      <p>We collect your:</p>
                      <ul className='govuk-list govuk-list--bullet'>
                        <li>name</li>
                        <li>contact details</li>
                        <li>locations you need flood warnings for</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <p>This depends on whether:</p>
                      <ul className='govuk-list govuk-list--bullet'>
                        <li>
                          you{' '}
                          <a
                            href='#if-you-signup-for-flood-warnings'
                            class='govuk-link'
                          >
                            sign up for flood warnings
                          </a>
                        </li>
                        <li>
                          we{' '}
                          <a
                            href='#we-automatically-opt-you-in'
                            className='govuk-link'
                          >
                            automatically opt you in
                          </a>{' '}
                          to get flood warnings
                        </li>
                      </ul>
                    </>
                  )}

                  {!isOrg && (
                    <>
                      <h2
                        className='govuk-heading-m govuk-!-margin-top-6'
                        id='if-you-signup-for-flood-warnings'
                      >
                        If you sign up to the Get flood warnings service
                      </h2>
                      <p>
                        We collect your personal data from you directly when you
                        sign up.
                      </p>
                      <p>
                        Personal data rules that apply to the account holder
                        also apply to any family and friends added to the
                        account.
                      </p>
                      <p>During sign up, we collect your:</p>
                      <ul className='govuk-list govuk-list--bullet'>
                        <li>name</li>
                        <li>contact details</li>
                        <li>locations you added (to get flood warnings)</li>
                      </ul>
                    </>
                  )}
                  <p>
                    If you remove your data or delete the account, we’ll store
                    your personal data for 7 years. This is so we have a log of
                    any flood messages we sent you, in case we need to refer
                    back to this.
                  </p>
                  <p>
                    If you do not complete sign up, we’ll delete your
                    partially-created account after one week. We’ll then store
                    your data for 7 years so we have a record that we did not
                    send you any flood messages.
                  </p>

                  {!isOrg && (
                    <>
                      <h3 className='govuk-heading-s govuk-!-margin-top-6'>
                        Extra rules if you delete your account
                      </h3>
                      <p>
                        If you delete your account, we may keep a separate
                        record of your details.
                      </p>
                      <p>
                        This is so we do not{' '}
                        <a
                          href='#we-automatically-opt-you-in'
                          className='govuk-link'
                        >
                          automatically opt you in
                        </a>{' '}
                        for warnings for 6 years.
                      </p>
                      <p>
                        After 6 years expires, we keep your details for a
                        further 7 years, so that we have a record that you were
                        opted out of warnings for this period.
                      </p>

                      <h2
                        className='govuk-heading-m govuk-!-margin-top-6'
                        id='we-automatically-opt-you-in'
                      >
                        If we automatically opt you in for warnings
                      </h2>
                      <p>
                        The Environment Agency has a legal duty to send
                        emergency warnings to people at risk of flooding so they
                        can protect themselves, their family and property.
                      </p>
                      <p>
                        We may gather and use your phone number to send you
                        these emergency warnings.
                      </p>

                      <h3 className='govuk-heading-s govuk-!-margin-top-6'>
                        How we get your phone number
                      </h3>
                      <p>We work with phone companies to gather numbers.</p>
                      <p>
                        We send phone companies a list of addresses in flood
                        risk areas where no one is signed up for our flood
                        warning service.
                      </p>
                      <p>
                        In return, they send us phone numbers in those areas, so
                        that we can alert these numbers in an emergency.
                      </p>
                      <p>
                        The phone companies do not tell us your name or exact
                        address, only if your phone number is registered at an
                        address in areas at risk.
                      </p>
                      <p>
                        (We only ask the phone companies for numbers if there
                        are 10 or more addresses in that flood area not signed
                        up for our flood warning service.)
                      </p>

                      <h3 className='govuk-heading-s govuk-!-margin-top-6'>
                        How we use your number
                      </h3>
                      <p>
                        We use your number to send you flood warnings until
                        either:
                      </p>
                      <ul className='govuk-list govuk-list--bullet'>
                        <li>
                          you{' '}
                          <a href='#how-to-opt-out' className='govuk-link'>
                            opt out
                          </a>
                        </li>
                        <li>
                          the phone company{' '}
                          <a
                            href='#phone-company-stops-providing-number'
                            className='govuk-link'
                          >
                            stops providing us
                          </a>{' '}
                          with your number
                        </li>
                      </ul>

                      <h3
                        className='govuk-heading-s govuk-!-margin-top-6'
                        id='how-to-opt-out'
                      >
                        How to opt out
                      </h3>
                      <p>To opt out, you can do any of the following:</p>
                      <ul className='govuk-list govuk-list--bullet'>
                        <li>
                          text ‘REMOVE’ to 60006, using the phone that received
                          the original text
                        </li>
                        <li>
                          call Floodline on 0345 988 1188 (
                          <a
                            class='govuk-link'
                            href='https://www.gov.uk/call-charges'
                          >
                            call charges
                          </a>{' '}
                          may apply)
                        </li>
                        <li>
                          send an email, including your phone number, to {''}
                          <Link
                            class='govuk-link'
                            to='mailto:enquiries@environment-agency.gov.uk'
                          >
                            enquiries@environment-agency.gov.uk
                          </Link>
                        </li>
                      </ul>

                      <h3
                        className='govuk-heading-s govuk-!-margin-top-6'
                        id='if-you-opt-out'
                      >
                        If you opt out
                      </h3>
                      <p>
                        If you opt out, we’ll keep a record of your phone number
                        and any flood warnings we’ve sent you for 6 years. This
                        is so that we do not opt you back in during this time.
                      </p>
                      <p>
                        After 6 years expires, we’ll store your number for a
                        further 7 years so we have a record that you opted out.
                      </p>
                      <p>
                        We may automatically opt you back in during this 7 years
                        but you can opt out again, if you wish.
                      </p>

                      <h3
                        className='govuk-heading-s govuk-!-margin-top-6'
                        id='phone-company-stops-providing-number'
                      >
                        If the phone company stops providing us with your number
                      </h3>
                      <p>
                        Phone companies may stop providing us with your number
                        if:
                      </p>
                      <ul className='govuk-list govuk-list--bullet'>
                        <li>you sign up for warnings</li>
                        <li>you change or cancel your number</li>
                        <li>you move house</li>
                        <li>
                          {' '}
                          we change the areas that we provide warnings for
                        </li>
                        <li>
                          we stop asking the phone companies for numbers in your
                          area
                        </li>
                      </ul>
                      <p>
                        If they stop providing us with your number, we’ll store
                        your number for 7 years.
                      </p>
                      <p>
                        We may automatically opt you back in during this 7 years
                        but you can opt out, if you wish.
                      </p>
                    </>
                  )}

                  <h2 className='govuk-heading-m govuk-!-margin-top-6'>
                    Cookies and analytics
                  </h2>
                  <p>
                    We collect some anonymous data using cookies. Read our{' '}
                    <Link
                      class='govuk-link'
                      to={isOrg ? '/organisation/cookies' : '/cookies'}
                    >
                      cookies notice
                    </Link>{' '}
                    to find out how we use cookies.
                  </p>

                  <h2 className='govuk-heading-m govuk-!-margin-top-6'>
                    Lawful basis we use to gather and keep your data
                  </h2>
                  <p>
                    We have a legal duty under the{' '}
                    <a
                      class='govuk-link'
                      href='https://www.gov.uk/guidance/preparation-and-planning-for-emergencies-responsibilities-of-responder-agencies-and-others'
                      target='blank'
                    >
                      Civil Contingencies Act
                    </a>{' '}
                    to warn people who may be at risk of flooding. The lawful
                    basis for processing your personal data is that we need to
                    carry out a task in the public interest.
                  </p>

                  <h2 className='govuk-heading-m govuk-!-margin-top-6'>
                    Where your data is used and stored
                  </h2>
                  <p>
                    We design, build and run our systems to make sure that your
                    data is as safe as possible at all stages, both while we use
                    and store it.
                  </p>
                  <p>
                    Your personal information is used and stored securely on
                    servers in the UK.
                  </p>

                  <h2 className='govuk-heading-m govuk-!-margin-top-6'>
                    Who we share your data with
                  </h2>
                  <h3 className='govuk-heading-s govuk-!-margin-top-6'>
                    Legal obligations to share
                  </h3>
                  <p>
                    We may share your data or disclose information because of a
                    law, regulation or court order and to protect our interests
                    and legal rights.
                  </p>
                  <h3 className='govuk-heading-s govuk-!-margin-top-6'>
                    Third party service providers
                  </h3>
                  <p>
                    We may share your information with our agents or
                    representatives, so they can manage your account. Our agents
                    or representatives will only use your personal data in line
                    with what we have set out in this privacy notice.
                  </p>
                  <p>We will not:</p>
                  <ul className='govuk-list govuk-list--bullet'>
                    <li>sell or rent your data to third parties</li>
                    <li>
                      share your data with third parties for marketing purposes
                    </li>
                  </ul>

                  <h2 className='govuk-heading-m govuk-!-margin-top-6'>
                    Changes to this policy
                  </h2>
                  <p>
                    We may change this privacy notice. If we do, we’ll amend the
                    ‘last updated’ date at the bottom of this page. Any changes
                    to this privacy notice will apply to you and your data
                    immediately.
                  </p>
                  <p>Last updated: 10 July 2025</p>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  )
}
