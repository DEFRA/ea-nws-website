import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import Details from '../../../../../common/components/gov-uk/Details'
import Input from '../../../../../common/components/gov-uk/Input'
export default function KeywordsForThisLocationPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [keywords, setKeywords] = useState([])
  const handleButton = async () => {
    if (!keywords) {
      await dispatch()
    }
    navigate()
  }

  const handleAddKeyword = () => {}

  const detailsText = (
    <>
      <p>
        Adding keywords for each location can make it easier for you to filter
        and create lists of locations you can then link to the people
        responsible for them (contacts). Contacts cannot get flood messages for
        a location unless they are linked to it.
        <br /> <br />
        For example, you may want to add ‘North’ or ‘Midlands’ or ‘Team A’ as
        keywords, then show all of the locations with that keyword in a list.
      </p>
    </>
  )

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />

      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>
              Keywords for this location (optional)
            </h1>
            <div className='govuk-body'>
              <Details title={'Why add keywords?'} text={detailsText} />
              <Input
                inputType='text'
                onChange={(val) => setKeywords(val)}
                className='govuk-input govuk-input--width-20'
              />
              <Button
                text='Add keyword'
                onClick={handleAddKeyword}
                className='govuk-button--secondary'
              />
              <Button
                text='Continue'
                className='govuk-button'
                onClick={handleButton}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
