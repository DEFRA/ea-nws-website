import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function CookiesPage () {
  const navigate = useNavigate()

  return (
    <>
      <div className='govuk-grid-row'>
        <div className='govuk-grid-column-two-thirds'>
          <Link onClick={() => navigate(-1)} className='govuk-back-link'>
            Back
          </Link>
          <div className='govuk-body'>
            <h1 className='govuk-heading-l'>Cookies</h1>
            <p>coming soon</p>
          </div>
        </div>
      </div>
    </>
  )
}
