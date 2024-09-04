import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'

export default function LocationAddUploadFilePage () {
  const navigate = useNavigate()

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />

      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            <h1 className='govuk-heading-l'>Upload file</h1>
          </div>
        </div>
      </main>
    </>
  )
}
