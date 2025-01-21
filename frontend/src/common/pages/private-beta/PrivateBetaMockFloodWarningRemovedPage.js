import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../components/custom/BackLink'

export default function PrivateBetaMockFloodWarningRemovedPage () {
  const navigate = useNavigate()

  return (
    <>

      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-body govuk-grid-column-three-quarters govuk-!-margin-left-3 private-beta-mock-banner'
               style={{backgroundColor: '#F1F0EF', borderColor: '#A8ABAD', height: '75px', lineHeight: '75px' }}>
            The flood warning was removed
          </div>
          <div className='govuk-grid-column-two-thirds'>
            <div className='govuk-body'>
              <h1 className='govuk-heading-l'>
                Eastern River near Highford and
                surrounding areas
              </h1>
              <p>
                The Eastern River has been falling steadily over the last few days and we do
                not expect any further flooding to properties at Highford Aquadrome and
                nearby businesses. No further rainfall is currently forecast however there is
                standing water in low lying areas surrounding the caravans which may take a
                few days to recede.
              </p>
              <p>
                Flood warning area, Eastern River near Highford and surrounding areas
              </p>
              <h2 className='govuk-heading-m'>Contact Floodline for advice</h2>
              <p>
                <span className='govuk-!-font-weight-bold'>
                  Floodline helpline<br/>
                </span>
                Telephone: 0345 988 1188
                <br />
                Textphone: 0345 602 6340
                <br />
                Open 24 hours a day, 7 days a week
                <br />
                <a href='https://www.gov.uk/call-charges' className='govuk-link'>Find out more about call charges</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
