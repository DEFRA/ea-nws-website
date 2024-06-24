import React from 'react'
import Button from '../../gov-uk-components/Button'
import { useNavigate } from 'react-router'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'
import Header from '../../gov-uk-components/Header'
import Footer from '../../gov-uk-components/Footer'
export default function SignOutLayout ({ text }) {
  const navigate = useNavigate()
  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <PhaseBanner />
        <h2 className='govuk-heading-l'>{text}</h2>
        <p className='govuk-body'>You can sign back in if you need to.</p>
        <Button text='Sign in' className='govuk-button' onClick={navigate('/signin')} />

        <h3 className='govuk-heading-s'>More about flooding</h3>

        <p className='govuk-body'>
          Find out how to{' '}
          <a href='https://www.gov.uk/flood' className='govuk-link'>
            protect yourself and your property online from flooding
          </a>
          .
        </p>

        <p className='govuk-body'>
          <a href='/signup/feedback' className='govuk-link'>
            What do you think of this service?
          </a>
          {' '} Takes 30 seconds
        </p>
      </div>
      <Footer />
    </>
  )
}
