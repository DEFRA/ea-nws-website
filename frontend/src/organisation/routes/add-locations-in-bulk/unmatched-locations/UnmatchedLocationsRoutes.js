import DoNotAddLocationsPage from '../../../pages/add-locations-in-bulk/unmatched-locations/dont-match-locations/DoNotAddLocationsPage'
import FindUnmatchedLocationsPage from '../../../pages/add-locations-in-bulk/unmatched-locations/FindUnmatchedLocationsPage'

const unmatchedlocationsRoutes = [
    { path: '/organisation/unmatchedlocations/donotadd', component: <DoNotAddLocationsPage /> },
    { path: '/organisation/unmatchedlocations/find', component: <FindUnmatchedLocationsPage /> },
]

export default unmatchedlocationsRoutes



