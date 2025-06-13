import BackLink from '../../../../common/components/custom/BackLink'

export default function FloodWarningsRemovedDashboardPage() {
  return (
    <>
      <BackLink />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full govuk-body'>
            <br />
            <h1 className='govuk-heading-l' id='main-content'>
              Flood warnings removed in the last 24 hours
            </h1>
          </div>
        </div>
      </main>
    </>
  )
}
