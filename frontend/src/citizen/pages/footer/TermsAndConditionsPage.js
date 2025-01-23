import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'

export default function TermsAndConditionsPage () {
  const navigate = useNavigate()

  return (
    <>

      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <div className='govuk-body'>
              <h1 className='govuk-heading-l'>Terms and conditions</h1>
              <h2 className='govuk-heading-m'>What we will do</h2>
              <p>
                We make all reasonable efforts to send the flood warnings you
                have asked for, but we cannot guarantee they will be sent or
                arrive. Warnings may be sent at any time of day or night.
              </p>
              <h2 className='govuk-heading-m'>We do not:</h2>
              <ul className='govuk-list govuk-list--bullet'>
                <li>
                  accept responsibility if you fail to receive a warning
                </li>
                <li>
                  guarantee that our online or phone services will be
                  available
                </li>
                <li>
                  accept responsibility for any lose, damage or costs incurred
                  by you caused by flooding, or by issuing or failing to issue
                  warnings, except where the law says we must
                </li>
              </ul>
              <h2 className='govuk-heading-m'>You are responsible for:</h2>
              <ul className='govuk-list govuk-list--bullet'>
                <li>providing us with accurate contact details</li>
                <li>
                  telling us about any changes to your contact information
                </li>
              </ul>
              <h2 className='govuk-heading-m'>
                How we will use your personal information
              </h2>
              <p>We may use the personal information you provide to:</p>
              <ul className='govuk-list govuk-list--bullet'>
                <li>send you warnings you’ve asked for</li>
                <li>
                  send you a small number of services or administrative
                  messages
                </li>
                <li>
                  help emergency services and local councils respond to
                  flooding
                </li>
                <li>
                  help with our work on flood warning and flood risk
                  management
                </li>
              </ul>
              <p>
                We may give your information to our agents or representatives,
                so they can do any of these things for us. And we may share
                your information with other organisations if the laws says we
                must.
              </p>
              <p>
                The Environment Agency manages the flood warning systems. Our{' '}
                <Link to='/privacy'>privacy notice </Link> explains how we
                treat your personal information.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
