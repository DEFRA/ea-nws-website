import * as React from 'react'
import { useLocation } from 'react-router'
import AccountNavigation from '../../custom-components/AccountNavigation'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'


export default function HomePage () {
  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <PhaseBanner />
        <AccountNavigation currentPage={useLocation().pathname} />
        <h1 className='govuk-heading-l'>Home</h1>
      </div>
      <Footer />
    </>
  )
}
