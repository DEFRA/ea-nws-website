import { Helmet } from 'react-helmet'
import BackLink from '../../../../common/components/custom/BackLink'

export default function FloodWarningsRemovedDashboardPage() {
  return (
    <>
      <Helmet>
        <title>Flood Warnings Removed in Last 24 Hours - Next Warning Service GOV.UK</title>
      </Helmet>
      <BackLink />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full govuk-body'>
            <br />
            <h1 className='govuk-heading-l'>
              Flood warnings removed in the last 24 hours
            </h1>
          </div>
        </div>
      </main>
    </>
  )
}
