import { orgFloodReportsUrls } from '../../../organisation/routes/flood-reports/FloodReportsRoutes'
import { orgManageContactsUrls } from '../../../organisation/routes/manage-contacts/ManageContactsRoutes'
import { orgManageLocationsUrls } from '../../../organisation/routes/manage-locations/ManageLocationsRoutes'
import SubNavigation from './SubNavigation'

export default function OrganisationAccountNavigation ({ currentPage }) {
  const pages = [
    {
      title: 'Live flood warnings',
      link: orgManageLocationsUrls.monitoring.view
    },
    { title: 'Locations', link: orgManageLocationsUrls.view.dashboard },
    { title: 'Users', link: orgManageContactsUrls.view.dashboard },
    { title: 'Reports', link: orgFloodReportsUrls.overview }
  ]

  return <SubNavigation pages={pages} currentPage={currentPage} type='org' />
}
