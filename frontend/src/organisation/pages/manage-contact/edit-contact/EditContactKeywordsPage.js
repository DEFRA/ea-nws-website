import { React, useState } from 'react'
import { Helmet } from 'react-helmet'
import KeywordsLayout from '../../../layouts/optional-info/KeywordsLayout'
import UpdateContactAndNavigate from '../UpdateContactAndNavigate'

export default function EditContactKeywordsPage () {
  const [error, setError] = useState(null)

  const navigateToNextPage = UpdateContactAndNavigate(
    setError,
    'Keywords changed'
  )

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
      <Helmet>
        <title>Edit User Keywords - Next Warning Service GOV.UK</title>
      </Helmet>
      <KeywordsLayout
        keywordType='contact'
        keywordText={KeywordText}
        navigateToNextPage={navigateToNextPage}
        error={error}
      />
    </>
  )
}
