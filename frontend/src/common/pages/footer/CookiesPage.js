import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../components/custom/BackLink'
import PrivateBetaCookiesPage from '../private-beta/PrivateBetaCookiesPage'
import { backendCall } from '../../services/BackendService'

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
      {servicePhase === 'beta'
        ? (
          <>
            <PrivateBetaCookiesPage/>
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
