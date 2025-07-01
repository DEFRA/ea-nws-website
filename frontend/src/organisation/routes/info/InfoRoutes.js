import FloodAreasPage from '../../pages/info/FloodAreasPage'
import FloodTypesPage from '../../pages/info/FloodTypesPage'
import HelpAndGuidancePage from '../../pages/info/HelpAndGuidancePage'

const urlOrgInfo = '/organisation/info'

// Info urls
const infoUrls = {
  floodTypes: urlOrgInfo + '/flood-types',
  floodAreas: urlOrgInfo + '/flood-areas',
  levels: urlOrgInfo + '/levels',
  help: urlOrgInfo + '/help'
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
  },
  {
    path: infoUrls.help,
    component: <HelpAndGuidancePage />
  }
]

export { infoRoutes, infoUrls }
