import SubNavigation from './SubNavigation'

export default function CitizenAccountNavigation ({ currentPage }) {
  const pages = [
    { title: 'Locations and message preferences', link: '/home' },
    { title: 'Email addresses and numbers', link: '/managecontacts' },
    { title: 'Account', link: '/account' },
    { title: 'Contact', link: '/contact' }
  ]

  return <SubNavigation pages={pages} currentPage={currentPage} />
}
