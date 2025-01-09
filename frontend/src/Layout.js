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
        <div className='govuk-width-container'>
          {location.pathname.includes('organisation')
            ? <OrganisationAccountNavigation currentPage={location.pathname} />
            : <CitizenAccountNavigation currentPage={location.pathname} />}
        </div>
      </div>
      <div
        className={`${
          location.pathname.includes('organisation') && auth
            ? 'custom-width-container'
            : 'govuk-width-container body-container'
        }`}
      >

        <PhaseBanner />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
