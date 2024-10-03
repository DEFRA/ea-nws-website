import SubNavigation from '../../../../../../common/components/custom/SubNavigation'

export default function ViewLocationSubNavigation({ currentPage }) {
  const pages = [
    { title: 'Location details', link: '/location/view-location' },
    { title: 'Flood areas and message settings', link: '/' },
    { title: 'Linked contacts', link: '/' }
  ]

  return <SubNavigation pages={pages} currentPage={currentPage} />
}
