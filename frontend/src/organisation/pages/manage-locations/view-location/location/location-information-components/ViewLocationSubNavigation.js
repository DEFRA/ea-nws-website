import SubNavigation from '../../../../../../common/components/custom/SubNavigation'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ViewLocationSubNavigation ({ currentPage }) {
  const pages = [
    {
      title: 'Location details',
      link: orgManageLocationsUrls.view.individualLocation
    },
    {
      title: 'Message settings and flood areas',
      link: orgManageLocationsUrls.view.viewMessages
    },
    { title: 'Linked contacts', link: '/' }
  ]

  return <SubNavigation pages={pages} currentPage={currentPage} />
}
