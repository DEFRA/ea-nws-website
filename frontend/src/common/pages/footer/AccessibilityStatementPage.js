import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../components/custom/BackLink'
import { backendCall } from '../../services/BackendService'

export default function AccessibilityStatementPage () {
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
        <title>Accessibility statement - Get flood warnings - GOV.UK</title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <div className='govuk-body'>
              <h1 className='govuk-heading-l'>Accessibility statement</h1>
              <p>This is not available yet.</p>
              {servicePhase === 'beta' && (
                <p>We'll publish our accessibility statement after this testing phase finishes.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
