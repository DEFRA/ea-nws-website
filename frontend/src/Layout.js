import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './common/components/gov-uk/Footer'
import Header from './common/components/gov-uk/Header'
import PhaseBanner from './common/components/gov-uk/PhaseBanner'
import './common/css/custom.css'

function Layout () {
  return (
    <div className='page-container'>
      <Header />
      <div className='govuk-width-container body-container'>
        <PhaseBanner />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
