import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../components/custom/BackLink'
import ContactDetails from '../../layouts/footer-link-layouts/ContactDetails'

export default function PrivateBetaMockFloodAlertRemovedPage () {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Flood alert removed - Get flood warnings - GOV.UK</title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div
            className='govuk-body govuk-grid-column-three-quarters govuk-!-margin-left-3 private-beta-mock-banner'
            style={{
              backgroundColor: '#F1F0EF',
              borderColor: '#A8ABAD',
              height: '75px',
              lineHeight: '75px'
            }}
          >
            The flood alert was removed
          </div>
          <div className='govuk-grid-column-two-thirds'>
            <div className='govuk-body'>
              <h1 className='govuk-heading-l'>
                Eastern River and surrounding areas
              </h1>
              <p>
                The Eastern River has been falling steadily over the last few
                days and we do not expect any further flooding near Highford
                Aquadrome No further rainfall is currently forecast however
                there is standing water in low lying areas surrounding the
                caravans which may take a few days to recede.
              </p>
              <p>
                Yesterday's rain has caused river levels to rise a little again
                in Highford but rivers are still significantly lower than the
                past weekend. No more than an isolated shower is forecast for
                the next five days. The Eastern River should begin to fall by
                4pm. River levels in all communities will peak significantly
                lower than last Sunday. Minor flood impacts could affect fields
                and rural roads tomorrow Minor flood impacts should ease by the
                weekend. Please take care driving on routes that flood,
                including Green Road and Church Road, We continue to monitor the
                levels and forecast. We will re-issue this flood alert if new
                instances of flooding are possible.
              </p>
              <p>Flood alert area, Eastern River and surrounding areas</p>
              <h2 className='govuk-heading-m'>Contact Floodline for advice</h2>
              <p>
                <ContactDetails />
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
