import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../components/custom/BackLink'
import { backendCall } from '../../services/BackendService'
import PrivateBetaCookiesPage from '../private-beta/PrivateBetaCookiesPage'

export default function CookiesPage () {
  const navigate = useNavigate()
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
    <>
      <Helmet>
        <title>Cookies - GOV.UK</title>
      </Helmet>
      {servicePhase === 'beta'
        ? (
          <>
            <PrivateBetaCookiesPage />
          </>
          )
        : (
          <>
            <BackLink onClick={() => navigate(-1)} />
            <main className='govuk-main-wrapper govuk-!-padding-top-4'>
              <div className='govuk-grid-row'>
                <div className='govuk-grid-column-two-thirds'>
                  <div className='govuk-body'>
                    <h1 className='govuk-heading-l'>Cookies</h1>
                    <p>coming soon</p>
                  </div>
                </div>
              </div>
            </main>
          </>
          )}
    </>
  )
}
