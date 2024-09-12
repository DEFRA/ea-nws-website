import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackLink from '../components/custom/BackLink'

export default function ErrorPage () {
  const navigate = useNavigate()

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 class='govuk-heading-l'>Sorry, there is a problem with the service</h1>
            <p class='govuk-body'>Try again later.</p>
            <p class='govuk-body'>If you're in England, Scotland or Wales you can register, update your details or cancel your account by calling Floodline.</p>
            <h3 className='govuk-heading-s'>Floodline</h3>
            <ul class='govuk-list'><li>Telephone: 0345 988 1188</li><li>Textphone: 0345 602 6340</li><li>24 hour service</li></ul>
          </div>
        </div>
      </main>
    </>
  )
}
