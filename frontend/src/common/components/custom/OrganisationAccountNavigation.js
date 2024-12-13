import { orgManageContactsUrls } from '../../../organisation/routes/manage-contacts/ManageContactsRoutes'
import SubNavigation from './SubNavigation'

export default function OrganisationAccountNavigation ({ currentPage }) {
  const pages = [
    { title: 'Live flood warnings', link: '/' },
    { title: 'Locations', link: '/' },
    { title: 'Contacts', link: orgManageContactsUrls.view.dashboard },
    { title: 'Reports', link: '/' }
  ]

  return <SubNavigation pages={pages} currentPage={currentPage} type='org' />
}
