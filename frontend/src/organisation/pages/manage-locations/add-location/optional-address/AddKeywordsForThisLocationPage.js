import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../common/components/gov-uk/Button'
import Details from '../../../../../common/components/gov-uk/Details'
import Input from '../../../../../common/components/gov-uk/Input'
import { setCurrentLocationKeywords } from '../../../../../common/redux/userSlice'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
export default function KeywordsForThisLocationPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [keyword, setKeyword] = useState('')
  const savedKeywords = useSelector((state) =>
    state.session.currentLocation.meta_data.location_additional.keywords !==
    null
      ? state.session.currentLocation.meta_data.location_additional.keywords
      : []
  )
  const [keywordsArray, setKeywordsArray] = useState([...savedKeywords])

  const handleButton = () => {
    if (
      keywordsArray.length !== savedKeywords.length ||
      !keywordsArray.every((val, idx) => val === savedKeywords[idx])
    ) {
      dispatch(setCurrentLocationKeywords(keywordsArray))
    }

    navigate(orgManageLocationsUrls.optionalAddress.addActionPlan)
  }

  const handleAddKeyword = () => {
    if (keyword) {
      setKeywordsArray([...keywordsArray, keyword])
      setKeyword('')
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
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
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
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
              <Details title='Why add keywords?' text={detailsText} />
              <div className='inline-button'>
                <Input
                  value={keyword}
                  inputType='text'
                  onChange={(val) => setKeyword(val)}
                  className='govuk-input govuk-input--width-20'
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
