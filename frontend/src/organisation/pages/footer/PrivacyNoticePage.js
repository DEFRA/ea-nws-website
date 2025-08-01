import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import BackLink from '../../../common/components/custom/BackLink'
import PrivateBetaPrivacyNoticePage from '../../../common/pages/private-beta/PrivateBetaPrivacyNoticePage'
import { backendCall } from '../../../common/services/BackendService'

export default function PrivacyNoticePage () {
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
        <title>Privacy notice - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      {servicePhase === 'beta'
        ? (
          <>
            <PrivateBetaPrivacyNoticePage />
          </>
          )
        : (
          <>
            <BackLink onClick={() => navigate(-1)} />
            <h1 className='govuk-heading-l'>Privacy notice</h1>
          </>)}
    </>
  )
}
