import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'

export default function ContactUsLayout() {
  const navigate = useNavigate()
  const authToken = useSelector((state) => state.session.authToken)
  console.log(authToken)

  return (
    <>
      <div className="page-container">
        <Header />
        <div className="govuk-width-container body-container">
          <PhaseBanner />
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              {!authToken && (
                <Link onClick={() => navigate(-1)} className="govuk-back-link">
                  Back
                </Link>
              )}
              <div className="govuk-body">
                <h1 className="govuk-heading-l">Contact us</h1>
                {!authToken ? (
                  <p>
                    Get in touch with us Floodline, if you need help signing up.
                  </p>
                ) : (
                  <p>
                    Get in touch with us Floodline, if you need help with making
                    changes to your account
                  </p>
                )}
                <h2 className="govuk-heading-m">Floodline</h2>
                <p>
                  Telephone: 0345 988 1188
                  <br />
                  Textphone: 0345 602 6340
                  <br />
                  24 hour service
                  <br />
                  <a className="govuk-link">Find out about call charges</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
