import React, { useEffect, useState } from 'react'
import BackLink from '../../../common/components/custom/BackLink'
import { useNavigate } from 'react-router'
import { backendCall } from '../../../common/services/BackendService'
import PrivateBetaPrivacyNoticePage from '../../../common/pages/private-beta/PrivateBetaPrivacyNoticePage'

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
