import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import Details from '../../../../../common/components/gov-uk/Details'
import Input from '../../../../../common/components/gov-uk/Input'
import { setCurrentLocationKeywords } from '../../../../../common/redux/userSlice'
export default function KeywordsForThisLocationPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [keywords, setKeywords] = useState('')

  const handleButton = () => {
    navigate(
      '/organisation/manage-locations/add/optional-address/add-action-plan'
    )
  }

  const handleAddKeyword = async () => {
    if (!keywords) {
      await dispatch(setCurrentLocationKeywords(keywords))
    }
  }

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
              <p>
                You can add new keywords. Or you can remove existing keywords
                associated with this location by unticking the relevant box.
              </p>
              <Details title={'Why add keywords?'} text={detailsText} />
              <div className='inline-button'>
                <Input
                  inputType='text'
                  onChange={(val) => setKeywords(val)}
                  className='govuk-input govuk-input--width-20'
                  name='keywords'
                />
                <Button text='Add keyword' onClick={handleAddKeyword} />
              </div>
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
