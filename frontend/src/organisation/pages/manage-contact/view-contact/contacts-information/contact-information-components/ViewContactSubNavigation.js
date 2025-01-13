import SubNavigation from '../../../../../../common/components/custom/SubNavigation'
import { orgManageContactsUrls } from '../../../../../routes/manage-contacts/ManageContactsRoutes'

export default function ViewContactSubNavigation({ currentPage }) {
  const pages = [
    {
      title: 'User details',
      link: orgManageContactsUrls.view.viewContact
    },
    { title: 'Linked locations', link: '/' }
  ]

  return <SubNavigation pages={pages} currentPage={currentPage} />
}
