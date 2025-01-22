import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import CitizenAccountNavigation from './common/components/custom/CitizenAccountNavigation'
import OrganisationAccountNavigation from './common/components/custom/OrganisationAccountNavigation'
import Footer from './common/components/gov-uk/Footer'
import Header from './common/components/gov-uk/Header'
import PhaseBanner from './common/components/gov-uk/PhaseBanner'
import './common/css/custom.css'
import { backendCall } from './common/services/BackendService'

function Layout () {
  const location = useLocation()
  const auth = useSelector((state) => state.session.authToken)
  const [servicePhase, setServicePhase] = useState(false)

  async function getServicePhase () {
    const { data } = await backendCall(
      'data',
      'api/service/get_service_phase'
    )
    setServicePhase(data)
  }

  useEffect(() => {
    getServicePhase()
  }, [])

  return (
    <div className='page-container'>
      <Header />
      <div className='sub-navigation'>
        {location.pathname.includes('organisation') && auth
          ? <div className='custom-width-container'><OrganisationAccountNavigation currentPage={location.pathname} /></div>
          : <div className='govuk-width-container'><CitizenAccountNavigation currentPage={location.pathname} /></div>}
      </div>
      <div className={(servicePhase === 'beta' ? 'private-beta-watermark govuk-!-padding-bottom-9' : 'govuk-!-padding-bottom-9')}>
        {location.pathname.includes('organisation') && auth
          ? <PhaseBanner type='org' phase={servicePhase} />
          : <PhaseBanner phase={servicePhase} />}
        <div
          className={`${
            location.pathname.includes('organisation') && auth
              ? 'custom-width-container body-container'
              : 'govuk-width-container body-container'
          }`}
        >
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
