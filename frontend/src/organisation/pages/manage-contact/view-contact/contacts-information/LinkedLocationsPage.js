import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import { orgManageContactsUrls } from '../../../../routes/manage-contacts/ManageContactsRoutes'
import ContactHeader from './contact-information-components/ContactHeader'
import { setLinkContacts } from '../../../../../common/redux/userSlice'

export default function LinkedLocationsPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentContact = useSelector((state) => state.session.orgCurrentContact)
  const contactName = currentContact?.firstname + ' ' + currentContact?.lastname

  const linkToLocations = () => {
    const linkContacts = [currentContact.id]
    dispatch(setLinkContacts(linkContacts))
    navigate(orgManageLocationsUrls.view.dashboard)
  }

  const linkedLocationsSection = (
    <>
      <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
        Linked locations
      </h2>
      <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
      
      <Button
        text='Link to locations'
        className='govuk-button govuk-button--secondary'
        onClick={linkToLocations}
      />
    </>
  )

  const navigateBack = (e) => {
    e.preventDefault()
    navigate(orgManageContactsUrls.view.dashboard)
  }

  return (
    <>

      <BackLink onClick={(e) => navigateBack(e)} />
      <main className='govuk-main-wrapper govuk-body govuk-!-margin-top-0'>
        <ContactHeader
          contactName={contactName}
          currentPage={orgManageContactsUrls.view.viewLinkedLocations}
        />
        {linkedLocationsSection}
      </main>
    </>
  )
}
