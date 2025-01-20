import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../components/custom/BackLink'

export default function PrivateBetaCookiesPage () {
  const navigate = useNavigate()

  return (
    <>

      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <div className='govuk-body'>
              <h1 className='govuk-heading-l'>Cookies policy</h1>
              <p>
                Find out how we'll use{' '}
                <a className='govuk-link' href='https://forms.office.com/e/5uZuYasK7K'>cookies</a>{' '}
                during this testing phase.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
