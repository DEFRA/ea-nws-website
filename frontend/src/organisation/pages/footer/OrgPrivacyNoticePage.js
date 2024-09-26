import React from 'react'
import BackLink from '../../../common/components/custom/BackLink'
import { useNavigate } from 'react-router'

export default function OrgPrivacyNoticePage () {
  const navigate = useNavigate()
  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <h1 className='govuk-heading-l'>Privacy notice</h1>
    </>
  )
}
