import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../components/custom/BackLink'
import ContactDetails from '../../layouts/footer-link-layouts/ContactDetails'

export default function ContactUsLayout({ email }) {
  const navigate = useNavigate()

  const authToken = useSelector((state) => state.session.authToken)

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-body govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l '>Contact us</h1>
            {authToken ? (
              <p> Get in touch with us, if you need help.</p>
            ) : (
              <p>
                {' '}
                Get in touch with us at Floodline, if you need help signing up.
              </p>
            )}

            <h2 className='govuk-heading-m  govuk-!-margin-bottom-0'>
              Floodline
            </h2>
            <p>
              <ContactDetails />
            </p>

            {authToken && (
              <>
                <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>
                  Email queries
                </h3>
                <p>
                  Email:{' '}
                  <Link
                    className='govuk-link'
                    onClick={() => {
                      window.location = `mailto:${email}`
                    }}
                  >
                    {email}
                  </Link>
                  <br />
                  Monday to Friday, 8am to 6pm
                </p>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
