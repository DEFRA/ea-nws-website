import FloodAreasPage from '../../pages/info/FloodAreasPage'
import FloodTypesPage from '../../pages/info/FloodTypesPage'
import HelpAndGuidancePage from '../../pages/info/HelpAndGuidancePage'
import ServicePreviewPage from '../../pages/info/ServicePreviewPage'

const urlOrgInfo = '/organisation/info'

// Info urls
const infoUrls = {
  floodTypes: urlOrgInfo + '/flood-types',
  floodAreas: urlOrgInfo + '/flood-areas',
  levels: urlOrgInfo + '/levels',
  help: urlOrgInfo + '/help',
  preview: urlOrgInfo + '/preview'
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
  },
  {
    path: infoUrls.preview,
    component: <ServicePreviewPage />
  }
]

export { infoRoutes, infoUrls }
