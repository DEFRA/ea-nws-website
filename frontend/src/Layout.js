import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import CitizenAccountNavigation from './common/components/custom/CitizenAccountNavigation'
import OrganisationAccountNavigation from './common/components/custom/OrganisationAccountNavigation'
import Footer from './common/components/gov-uk/Footer'
import Header from './common/components/gov-uk/Header'
import PhaseBanner from './common/components/gov-uk/PhaseBanner'
import './common/css/custom.css'

function Layout () {
  const location = useLocation()
  const auth = useSelector((state) => state.session.authToken)

  return (
    <div className='page-container'>
      <Header />
      <div className='sub-navigation'>
        {location.pathname.includes('organisation')
          ? <div className='custom-width-container'><OrganisationAccountNavigation currentPage={location.pathname} /></div>
          : <div className='govuk-width-container'><CitizenAccountNavigation currentPage={location.pathname} /></div>}
      </div>
      {location.pathname.includes('organisation')
        ? <PhaseBanner type='org' />
        : <PhaseBanner />}
      <div
        className={`${
          location.pathname.includes('organisation') && auth
            ? 'custom-width-container body-container'
            : 'govuk-width-container body-container'
        }`}
      >

        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
