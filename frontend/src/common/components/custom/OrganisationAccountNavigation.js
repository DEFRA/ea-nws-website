import { orgManageContactsUrls } from '../../../organisation/routes/manage-contacts/ManageContactsRoutes'
import { orgManageLocationsUrls } from '../../../organisation/routes/manage-locations/ManageLocationsRoutes'
import SubNavigation from './SubNavigation'

export default function OrganisationAccountNavigation ({ currentPage }) {
  const pages = [
    { title: 'Live flood warnings', link: '/' },
    { title: 'Locations', link: orgManageLocationsUrls.view.dashboard },
    { title: 'Contacts', link: orgManageContactsUrls.view.dashboard },
    { title: 'Reports', link: '/' }
  ]

  return <SubNavigation pages={pages} currentPage={currentPage} type='org' />
}
