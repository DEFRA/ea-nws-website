import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../components/custom/BackLink'

export default function PrivateBetaPrivacyNoticePage () {
  const navigate = useNavigate()

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <div className='govuk-body'>
              <h1 className='govuk-heading-l'>Privacy notice</h1>
              <p>
                Read the{' '}
                <a
                  className='govuk-link'
                  href='https://forms.office.com/e/8PmLxa5Wux'
                >
                  privacy notice
                </a>{' '}
                to find out how we'll deal with personal data during this
                testing phase.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
