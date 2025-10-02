import ReportsOverviewPage from '../../pages/flood-reports/ReportsOverviewPage'
import FloodWarningHistoryDashboardPage from '../../pages/flood-reports/flood-warning-history/FloodWarningHistoryDashboardPage'
import FloodWarningsRemovedDashboardPage from '../../pages/flood-reports/flood-warnings-removed/FloodWarningsRemovedDashboardPage'
import LiveFloodWarningsDashboardPage from '../../pages/flood-reports/live-warnings/LiveFloodWarningsDashboardPage'
import FloodMessagesSentSummaryPage from '../../pages/flood-reports/messages-sent-summary/FloodMessagesSentSummaryPage'

const urlOrgReports = '/organisation/reports'

const orgFloodReportsUrls = {
  overview: urlOrgReports,
  live: urlOrgReports + '/live-warnings',
  history: urlOrgReports + '/historic-warnings',
  removed: urlOrgReports + '/removed-warnings',
  summary: urlOrgReports + '/view-summary'
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
    path: orgFloodReportsUrls.removed,
    component: <FloodWarningsRemovedDashboardPage />
  },
  {
    path: orgFloodReportsUrls.history,
    component: <FloodWarningHistoryDashboardPage />
  },
  {
    path: orgFloodReportsUrls.summary,
    component: <FloodMessagesSentSummaryPage />
  }
]
export { orgFloodReportsRoutes, orgFloodReportsUrls }
