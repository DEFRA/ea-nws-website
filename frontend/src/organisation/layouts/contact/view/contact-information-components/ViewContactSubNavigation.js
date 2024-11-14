import SubNavigation from '../../../../../common/components/custom/SubNavigation'

export default function ViewContactSubNavigation ({ currentPage }) {
  const pages = [
    {
      title: 'Contact\'s details',
      link: '/organisation/manage-contacts/contact/view-contact'
    },
    { title: 'Linked locations', link: '/' }
  ]

  return <SubNavigation pages={pages} currentPage={currentPage} />
}
