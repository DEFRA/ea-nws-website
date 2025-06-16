import { React } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'
import KeywordsLayout from '../../../layouts/optional-info/KeywordsLayout'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function AddContactKeywordsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentContact = useSelector((state) => state.session.orgCurrentContact)

  const navigateToNextPage = () => {
    navigate(orgManageContactsUrls.add.notes)
  }

  const KeywordTitle = `Keywords for ${currentContact?.firstname} ${currentContact?.lastname} (optional)`

  const KeywordText = (
    <>
      <p className='govuk-!-margin-bottom-5'>
        Keywords are useful if you need to group users and then link them to
        locations.
      </p>
      <p className='govuk-!-margin-bottom-5'>
        For example, you could add the keyword 'Midlands' for{' '}
        {currentContact?.firstname} {currentContact?.lastname}.
      </p>
      <p className='govuk-!-margin-bottom-5'>
        Then link {currentContact?.firstname} {currentContact?.lastname} and all
        other users with this keyword to locations in the Midlands.
      </p>
    </>
  )

  return (
    <>
      <Helmet>
        <title>Add keywords for {currentContact?.firstname} {currentContact?.lastname} - Manage users - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <KeywordsLayout
        keywordType='contact'
        keywordTitle={KeywordTitle}
        keywordText={KeywordText}
        navigateToNextPage={navigateToNextPage}
      />
    </>
  )
}
