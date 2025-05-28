import {
    faCheck
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../components/custom/BackLink'
import Button from '../../components/gov-uk/Button'

export default function OrganisationServiceSelectionPage () {
  const navigate = useNavigate()

  const panelItem = (
    itemText
  ) => {
    return (
      <>
        <FontAwesomeIcon
          icon={faCheck}
        />
        {' '}{itemText}
        <hr className='org-service-selection-hr govuk-!-margin-top-2 govuk-!-margin-bottom-2' />
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Select Service - GOV.UK</title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      {/* Main body */}
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            <h1 className='govuk-heading-l'>
              Select service
            </h1>
            <div className='govuk-body'>
              <div className='govuk-grid-column-one-half govuk-!-padding-left-0 org-service-selection-container'>
                <div className='outline-1px'>
                  <div className='org-service-selection-header govuk-heading-m govuk-!-margin-bottom-0'>
                    Standard
                  </div>
                  <div>
                    <span className='govuk-caption-m govuk-!-font-size-19 govuk-!-padding-left-4 govuk-!-margin-top-4'>
                      Recommended for
                    </span>
                    <span className='govuk-heading-m govuk-!-padding-left-4 govuk-!-padding-bottom-6'>
                      Homes or small businesses
                    </span>
                    <div className='govuk-caption-m govuk-!-font-size-19 govuk-!-padding-left-4 govuk-!-margin-top-4 govuk-!-margin-bottom-4 govuk-!-padding-right-4' style={{ color: '#0b0c0c', paddingBottom: '28px' }}>
                      {panelItem('Instant sign up')}
                      {panelItem('Best for up to 10 locations')}
                      <FontAwesomeIcon
                        icon={faCheck}
                      />
                      {' '}Up to:<br />
                      <br />
                      <span className='govuk-!-margin-left-4'>
                        5 email addresses for email warnings<br />
                      </span>
                      <span className='govuk-!-margin-left-4'>
                        5 numbers for text warnings<br />
                      </span>
                      <span className='govuk-!-margin-left-4'>
                        5 numbers for phone call warnings
                      </span>
                      <hr className='org-service-selection-hr govuk-!-margin-top-2 govuk-!-margin-bottom-2' />
                      {panelItem('1 account holder')}
                    </div>
                  </div>
                  <div className='org-service-selection-footer govuk-!-padding-left-4'>
                    <Button
                      text='Instant sign up'
                      className='govuk-button govuk-!-margin-bottom-1 '
                      onClick={(event) => { event.preventDefault(); navigate('/signup/register-location/search') }}
                    />
                  </div>
                </div>
              </div>
              <div className='govuk-grid-column-one-half govuk-!-padding-left-0 org-service-selection-container'>
                <div className='outline-1px'>
                  <div className='org-service-selection-header govuk-heading-m govuk-!-margin-bottom-0'>
                    Professional
                  </div>
                  <div>
                    <span className='govuk-caption-m govuk-!-font-size-19 govuk-!-padding-left-4 govuk-!-margin-top-4'>
                      Recommended for
                    </span>
                    <span className='govuk-heading-m govuk-!-padding-left-4'>
                      Organisations, local authorities and<br />
                      other category 1 or 2 responders
                    </span>
                    <div className='govuk-caption-m govuk-!-font-size-19 govuk-!-padding-left-4 govuk-!-margin-top-4 govuk-!-margin-bottom-4 govuk-!-padding-right-4' style={{ color: '#0b0c0c' }}>
                      {panelItem('Account usually opened in 3 to 5 days')}
                      {panelItem('Unlimited locations')}
                      {panelItem('Unlimited users who can get flood messages')}
                      {panelItem('Unlimited admins')}
                      {panelItem('Live monitoring with maps')}
                      {panelItem('Historic flood data')}
                      {panelItem('Reports')}
                    </div>
                  </div>
                  <div className='org-service-selection-footer govuk-!-padding-left-4'>
                    <Button
                      text='Apply (approval takes 3 to 5 days)'
                      className='govuk-button govuk-!-margin-bottom-1 '
                      onClick={(event) => { event.preventDefault(); navigate('/signup/organisation-service-confirm') }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
