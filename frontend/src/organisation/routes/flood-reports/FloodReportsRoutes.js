import LiveFloodWarningsPage from '../../pages/flood-reports/LiveFloodWarningsPage'
import ReportsOverviewPage from '../../pages/flood-reports/ReportsOverviewPage'

const urlOrg = '/organisation'

const orgFloodReportsUrls = {
  overview: urlOrg + '/reports',
  live: urlOrg + '/reports/live-warnings'
}

const orgFloodReportsRoutes = [
  {
    path: orgFloodReportsUrls.overview,
    component: <ReportsOverviewPage />
  },
  {
    path: orgFloodReportsUrls.live,
    component: <LiveFloodWarningsPage />
  }
]
export { orgFloodReportsRoutes, orgFloodReportsUrls }
