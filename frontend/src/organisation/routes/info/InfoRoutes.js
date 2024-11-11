import FloodAreasPage from '../../pages/info/FloodAreasPage'
import FloodTypesPage from '../../pages/info/FloodTypesPage'

const urlOrgInfo = '/organisation/info'

// Info urls
const infoUrls = {
  floodTypes: urlOrgInfo + '/flood-types',
  floodAreas: urlOrgInfo + '/flood-areas',
  levels: urlOrgInfo + '/levels'
}

// Info routes
const infoRoutes = [
  {
    path: infoUrls.floodTypes,
    component: <FloodTypesPage />
  },
  {
    path: infoUrls.floodAreas,
    component: <FloodAreasPage />
  },
  {
    path: infoUrls.floodLevels
    // component: <FloodLevelsPage />
  }
]

export { infoRoutes, infoUrls }
