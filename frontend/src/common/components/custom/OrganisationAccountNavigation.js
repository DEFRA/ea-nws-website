import { orgFloodReportsUrls } from '../../../organisation/routes/flood-reports/FloodReportsRoutes'
import SubNavigation from './SubNavigation'

export default function OrganisationAccountNavigation({ currentPage }) {
  const pages = [
    { title: 'Live flood warnings', link: '/' },
    { title: 'Locations', link: '/' },
    { title: 'Contacts', link: '/' },
    { title: 'Reports', link: orgFloodReportsUrls.overview }
  ]

  return (
    <>
      <SubNavigation pages={pages} currentPage={currentPage} type='org' />
    </>
  )
}
