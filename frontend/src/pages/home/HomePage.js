import * as React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'

export default function HomePage () {
  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <PhaseBanner />
        <h1 className='govuk-heading-l'>Home</h1>
        <Link
          // this needs updated when we have the page
          to='/home'
          className='govuk-button govuk-button--secondary'
        >
          Add new location
        </Link>
        &nbsp; &nbsp;
        <Link
          // this needs updated when we have the page
          to='/home'
          className='govuk-button govuk-button--secondary'
        >
          Unsubscribe from flood alerts
        </Link>
        &nbsp; &nbsp;
        <Link
          to='/managecontacts'
          className='govuk-button govuk-button--secondary'
        >
          Your email addresses and numbers
        </Link>
      </div>
      <Footer />
    </>
  )
}
