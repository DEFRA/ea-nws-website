import { React, useState } from 'react'
import { Helmet } from 'react-helmet'
import KeywordsLayout from '../../../../../../layouts/optional-info/KeywordsLayout'
import updateLocationAndNavigate from '../../../../updateLocationAndNavigate'

export default function KeywordsPage () {
  const [error, setError] = useState(null)

  const navigateToNextPage = updateLocationAndNavigate(
    setError,
    'Keywords changed'
  )

  const keywordText = (
    <p>
      You can add new keywords. Or you can remove existing keywords associated
      with this location by unticking the relevant box.
      <br /> <br />
      <strong> Why add keywords </strong>
      <br /> <br />
      Adding keywords for each location can make it easier for you to filter and
      create lists of locations you can then link to the people responsible for
      them (contacts). Contacts cannot get flood messages for a location unless
      they are linked to it.
      <br /> <br />
      For example, you may want to add ‘North’ or ‘Midlands’ or ‘Team A’ as
      keywords, then show all of the locations with that keyword in a list.
      <br /> <br />
      You can add a maximum of 50 keywords and each keyword can be single or
      multiple words, for example ‘South’ or ‘South West’.
    </p>
  )

  return (
    <>
      <Helmet>
        <title>Edit Keywords - GOV.UK</title>
      </Helmet>
      <KeywordsLayout
        navigateToNextPage={navigateToNextPage}
        keywordType='location'
        keywordText={keywordText}
        error={error}
      />
    </>
  )
}
