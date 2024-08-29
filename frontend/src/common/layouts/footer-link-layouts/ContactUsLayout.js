import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../components/custom/BackLink'
import CitizenAccountNavigation from '../../components/custom/CitizenAccountNavigation'

export default function ContactUsLayout () {
  const navigate = useNavigate()
  const location = useLocation()
  const authToken = useSelector((state) => state.session.authToken)

  return (
    <>
      {authToken && (
        <CitizenAccountNavigation currentPage={location.pathname} />
      )}
      {!authToken && <BackLink onClick={() => navigate(-1)} />}
      <main
        className={
          authToken
            ? 'govuk-main-wrapper'
            : 'govuk-main-wrapper govuk-!-padding-top-4'
        }
      >
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <div className='govuk-body'>
              <h1 className='govuk-heading-l'>Contact us</h1>
              {!authToken
                ? (
                  <p>
                    Get in touch with us Floodline, if you need help signing up.
                  </p>
                  )
                : (
                  <p>
                    Get in touch with us Floodline, if you need help with making
                    changes to your account
                  </p>
                  )}
              <h2 className='govuk-heading-m'>Floodline</h2>
              <p>
                Telephone: 0345 988 1188
                <br />
                Textphone: 0345 602 6340
                <br />
                24 hour service
                <br />
                <a className='govuk-link'>Find out about call charges</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
