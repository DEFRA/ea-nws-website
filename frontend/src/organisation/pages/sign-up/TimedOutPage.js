import React from 'react'
import { useNavigate } from 'react-router'
import Button from '../../../common/components/gov-uk/Button'

export default function TimedOutPage () {
  const navigate = useNavigate()

  const handleSignIn = () => {
    navigate('/sign-in')
  }

  return (
    <>
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid'>
            <h1 className='govuk-heading-l'>
              You timed out before you could finish signing up
            </h1>
            <div className='govuk-body'>
              <p className='govuk-body'>
                We created an account for you but it's not completely set up
                yet.{' '}
              </p>
              <p className='govuk-body'>
                Sign in to complete setting up your account.
              </p>

              <Button
                text='Sign in'
                className='govuk-button'
                onClick={handleSignIn}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
