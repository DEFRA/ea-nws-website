import { React, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../../common/components/gov-uk/Input'

export default function AddContactKeywordsPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [keywordError, setKeywordError] = useState('')
  const [keyword, setKeyword] = useState('')

  const charLimit = 20

  useEffect(() => {
    if (keyword.length < charLimit) {
      setKeywordError('')
    }
  }, [keyword])

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  const handleAddKeyword = () => {
    console.log('AddKeyword')
  }

  const handleSubmit = () => {
    navigate(-1)
  }

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {keywordError && <ErrorSummary errorList={[keywordError]} />}
            <h1 className='govuk-heading-l'>
              Add keywords for this contact (optional)
            </h1>
            <div className='govuk-body'>
              <p>
                You can add new keywords. Or you can remove existing keywords by
                unticking the relevant box.
              </p>
              <h3 className='govuk-heading-s'>Why add key words</h3>
              <p>
                Adding keywords for each contact can make it easier for you to
                filter and create lists of people you can link to locations to
                get relevant flood messages. For example, you may want to add
                ‘North’ or ‘Midlands’ or ‘Team A’ as keywords, then show all of
                the locations with that keyword in a list. You can add a maximum
                of 50 keywords and each keyword can be single or multiple words,
                for example ‘South’ or ‘Team 1’. Once you use a keyword it will
                be saved so you can select it for any other contacts.
              </p>
              <Input
                inputType='text'
                onChange={(val) => setKeyword(val)}
                error={keywordError}
                className='govuk-input govuk-input--width-20'
              />
              <Button
                text='Add keyword'
                className='govuk-button--secondary'
                onClick={handleAddKeyword}
              />
              <Button
                text='Continue'
                className='govuk-button'
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
