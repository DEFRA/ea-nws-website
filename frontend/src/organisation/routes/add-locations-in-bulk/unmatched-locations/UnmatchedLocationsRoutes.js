import DoNotAddLocationsPage from '../../../pages/add-locations-in-bulk/unmatched-locations/dont-match-locations/DoNotAddLocationsPage'
import FindUnmatchedLocationsPage from '../../../pages/add-locations-in-bulk/unmatched-locations/find-unmactched-locations/FindUnmatchedLocationsPage'

const unmatchedLocationsRoutes = [
  { path: '/organisation/unmatchedlocations/donotadd', component: <DoNotAddLocationsPage /> },
  { path: '/organisation/unmatchedlocations/find', component: <FindUnmatchedLocationsPage /> }
]

export default unmatchedLocationsRoutes
