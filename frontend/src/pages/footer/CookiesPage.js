import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'

export default function CookiesPage() {
  const navigate = useNavigate()

  return (
    <>
      <div className="page-container">
        <Header />
        <div className="govuk-width-container body-container">
          <PhaseBanner />
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <Link onClick={() => navigate(-1)} className="govuk-back-link">
                Back
              </Link>
              <div className="govuk-body">
                <h1 className="govuk-heading-l">Cookies</h1>
                <p>coming soon</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
