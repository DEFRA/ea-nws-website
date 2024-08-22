import SubNavigation from './SubNavigation'

export default function CitizenAccountNavigation({ currentPage }) {
  const pages = [
    { title: 'Home', link: '/home' },
    { title: 'Your email addresses and numbers', link: '/managecontacts' },
    { title: 'Your account', link: '/account' },
    { title: 'Contact us', link: '/contact' }
  ]

  return <SubNavigation pages={pages} currentPage={currentPage} />
}
