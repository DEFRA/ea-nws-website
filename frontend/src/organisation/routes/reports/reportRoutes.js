import ViewLocationSummaryPage from '../../pages/reports/ViewLocationSummaryPage'

const urlReports = '/organisation/reports'

const orgViewReportsUrls = {
  ViewSummary: urlReports + '/view-summary'
}

const orgViewReportRoutes = [
  {
    path: orgViewReportsUrls.ViewSummary,
    component: <ViewLocationSummaryPage />
  }
]

export { orgViewReportRoutes, orgViewReportsUrls }
