import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../components/custom/BackLink'
import Button from '../../components/gov-uk/Button'
import ErrorSummary from '../../components/gov-uk/ErrorSummary'
import Radio from '../../components/gov-uk/Radio'
import TextArea from '../../components/gov-uk/TextArea'
import { backendCall } from '../../services/BackendService'

export default function OrganisationServiceSelectionPage () {
  const navigate = useNavigate()
  


  return (
    <>

      <BackLink onClick={() => navigate(-1)} />
      {/* Main body */}
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            <h1 className='govuk-heading-l'>
              Select service
            </h1>
            <div className='govuk-body'>
              <div class='govuk-grid-column-one-half govuk-!-padding-left-0'>
                <div className='outline-1px'>
                  <div className='org-service-selection-header govuk-heading-m govuk-!-margin-bottom-0'>
                    Standard
                  </div>
                  
                  <div className='org-service-selection-footer'>
                  <Button
                    text='Instant sign up'
                    className='govuk-button'
                    // onClick={handleButton}
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
