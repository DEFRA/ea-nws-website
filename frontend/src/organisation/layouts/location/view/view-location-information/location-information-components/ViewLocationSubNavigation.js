import SubNavigation from '../../../../../../common/components/custom/SubNavigation'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ViewLocationSubNavigation ({ currentPage }) {
  const pages = [
    {
      title: 'Location details',
      link: orgManageLocationsUrls.view.viewLocation
    },
    {
      title: 'Flood areas and messages',
      link: orgManageLocationsUrls.view.viewMessages
    }
  ]

  return <SubNavigation pages={pages} currentPage={currentPage} />
}
