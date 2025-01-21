import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import BackLink from '../../components/custom/BackLink'
export default function ContactUsLayout () {
  const navigate = useNavigate()

  const authToken = useSelector((state) => state.session.authToken)

  return (
    <>
      {!authToken && <BackLink onClick={() => navigate(-1)} />}
      <main
        className='govuk-main-wrapper govuk-!-padding-top-4'
      >
        <div className='govuk-grid-row'>
          <div className='govuk-body govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l '>Contact us</h1>
            <p> Get in touch with us, if you need help.</p>
            <h2 className='govuk-heading-m  govuk-!-margin-bottom-0'>Floodline</h2>
            <p>
              Telephone: 0345 988 1188
              <br />
              Textphone: 0345 602 6340
              <br />
              24 hour service
              <br />
              <Link to='https://www.gov.uk/call-charges'>
                Find out about call charges
              </Link>

            </p>
            <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>Email queries</h3>
            <p>
              Email: {' '}
              <Link
                onClick={() => { window.location = 'mailto:enquiries@environment-agency.gov.uk' }}
              >
                enquiries@environment-agency.gov.uk
              </Link>
              <br />
              Monday to Friday, 8am to 6pm
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
