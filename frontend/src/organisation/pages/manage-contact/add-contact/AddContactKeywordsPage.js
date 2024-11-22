import { React } from 'react'
import { useNavigate } from 'react-router'
import KeywordsLayout from '../../../layouts/optional-info/KeywordsLayout'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function AddContactKeywordsPage() {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate(orgManageContactsUrls.add.channels)
  }

  const KeywordText = (
    <>
      <p>
        You can add new keywords. Or you can remove existing keywords by
        unticking the relevant box.
      </p>
      <h3 className='govuk-heading-s'>Why add keywords</h3>
      <p>
        Adding keywords for each contact can make it easier for you to filter
        and create lists of people you can link to locations to get relevant
        flood messages.
        <br />
        <br />
        For example, you may want to add ‘North’ or ‘Midlands’ or ‘Team A’ as
        keywords, then show all of the locations with that keyword in a list.
        <br />
        <br />
        You can add a maximum of 50 keywords and each keyword can be single or
        multiple words, for example ‘South’ or ‘Team 1’.
        <br />
        <br />
        Once you use a keyword it will be saved so you can select it for any
        other contacts.
      </p>
    </>
  )

  return (
    <>
      <KeywordsLayout
        keywordType='contact'
        keywordText={KeywordText}
        navigateToNextPage={NavigateToNextPage}
      />
    </>
  )
}
