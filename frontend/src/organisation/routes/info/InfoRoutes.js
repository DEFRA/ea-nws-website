import FloodTypesPage from '../../pages/info/FloodTypesPage'

const urlOrgInfo = '/organisation/info'

// Info urls
const infoUrls = {
  floodTypes: urlOrgInfo + '/flood-types',
  floodAreas: urlOrgInfo + '/flood-areas'
}

// Info routes
const infoRoutes = [
  {
    path: infoUrls.floodTypes,
    component: <FloodTypesPage />
  }
]

export { infoRoutes, infoUrls }
