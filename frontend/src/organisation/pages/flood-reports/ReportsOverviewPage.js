import React from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../common/components/custom/OrganisationAccountNavigation'
import { orgFloodReportsUrls } from '../../routes/flood-reports/FloodReportsRoutes'

export default function ReportsOverviewPage() {
  const navigate = useNavigate()

  return (
    <>
      <OrganisationAccountNavigation
        currentPage={orgFloodReportsUrls.overview}
      />
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full govuk-body'>
            <br />
            <br />
            <h1 className='govuk-heading-l'>Reports</h1>
            <h2 className='govuk-heading-m'>Flood warnings</h2>
            <p>
              {' '}
              <Link to={orgFloodReportsUrls.live} className='govuk-link'>
                Live flood warnings
              </Link>
            </p>
            <p>
              <Link to='#' className='govuk-link'>
                Warnings removed in last 24 hours
              </Link>
            </p>
            <p>
              <Link to='#' className='govuk-link'>
                Historic warnings
              </Link>
            </p>
            <br />
            <h2 className='govuk-heading-m'>Your locations</h2>
            <p>
              <Link to='#' className='govuk-link'>
                Locations dashboard
              </Link>{' '}
              has a filter to produce reports
            </p>
            <p>
              <Link
                to='/organisation/reports/view-summary'
                className='govuk-link'
              >
                Summary of flood messages sent to your locations
              </Link>
            </p>
            <br />
            <h2 className='govuk-heading-m'>Your contacts</h2>
            <p>
              <Link to='#' className='govuk-link'>
                Contacts dashboard
              </Link>{' '}
              has a filter to produce reports
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
