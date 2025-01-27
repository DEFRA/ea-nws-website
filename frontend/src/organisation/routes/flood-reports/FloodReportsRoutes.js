import LiveFloodWarningsDashboardPage from '../../pages/flood-reports/LiveFloodWarningsDashboardPage'
import ReportsOverviewPage from '../../pages/flood-reports/ReportsOverviewPage'
import ViewLocationSummaryPage from '../../pages/flood-reports/ViewLocationSummaryPage'

const urlOrg = '/organisation'

const orgFloodReportsUrls = {
  overview: urlOrg + '/reports',
  live: urlOrg + '/reports/live-warnings',
  summary: urlOrg + '/reports/view-summary'
}

const orgFloodReportsRoutes = [
  {
    path: orgFloodReportsUrls.overview,
    component: <ReportsOverviewPage />
  },
  {
    path: orgFloodReportsUrls.live,
    component: <LiveFloodWarningsDashboardPage />
  },
  {
    path: orgFloodReportsUrls.summary,
    component: <ViewLocationSummaryPage />
  }
]
export { orgFloodReportsRoutes, orgFloodReportsUrls }
