import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../components/custom/BackLink'

export default function CookiesPage () {
  const navigate = useNavigate()

  return (
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
  )
}
