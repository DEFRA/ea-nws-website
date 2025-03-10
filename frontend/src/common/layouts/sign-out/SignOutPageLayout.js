import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Button from '../../components/gov-uk/Button'

export default function SignOutLayout ({ text }) {
  const navigate = useNavigate()
  const isOrganisation =
    useSelector((state) => state?.session?.organization) || null

  return (
    <>
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h2 className='govuk-heading-l'>{text}</h2>
            <p className='govuk-body'>You can sign back in if you need to.</p>
            <Button
              text='Sign in'
              className='govuk-button'
              onClick={(event) => {event.preventDefault(); navigate('/sign-in')}}
            />

            {/* Flood text only for citizen route */}
            {!isOrganisation && (
              <>
                <h3 className='govuk-heading-s'> More about flooding </h3>
                <p className='govuk-body'>
                  Find out how to{' '}
                  <a href='https://www.gov.uk/flood' className='govuk-link'>
                    protect yourself and your property online from flooding
                  </a>
                  .
                </p>
              </>
            )}

            <p className='govuk-body'>
              <a href='/signup/feedback' className='govuk-link'>
                What do you think of this service?
              </a>{' '}
              Takes 30 seconds
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
