import OrganisationAccountNavigation from '../../../../common/components/custom/OrganisationAccountNavigation'
import LiveMap from './monitoring-components/LiveMap'

export default function LiveFLoodMonitoringPage() {
  return (
    <>
      <OrganisationAccountNavigation />

      <div class='govuk-width-container'>
        <a href='#' class='govuk-back-link'>
          Back
        </a>
        <main class='govuk-main-wrapper'>
          <div class='govuk-grid-row'>
            <div class='govuk-grid-column-one-thirds'>
              <h2 class='govuk-heading-l'>column</h2>
            </div>
            <div class='govuk-grid-column-two-thirds'>
              <LiveMap />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
