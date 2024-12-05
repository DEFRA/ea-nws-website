import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getLocationAdditional } from '../../../../../../../common/redux/userSlice'
import KeywordsLayout from '../../../../../../layouts/optional-info/KeywordsLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function KeywordsPage () {
  const navigate = useNavigate()
  const locationName = useSelector(
    (state) => getLocationAdditional(state, 'locationName')
  )

  const keywordText = () => {
    return (
      <p>
        You can add new keywords. Or you can remove existing keywords associated
        with this location by unticking the relevant box.
        <br /> <br />
        <strong> Why add keywords </strong>
        <br /> <br />
        Adding keywords for each location can make it easier for you to filter
        and create lists of locations you can then link to the people
        responsible for them (contacts). Contacts cannot get flood messages for
        a location unless they are linked to it.
        <br /> <br />
        For example, you may want to add ‘North’ or ‘Midlands’ or ‘Team A’ as
        keywords, then show all of the locations with that keyword in a list.
        <br /> <br />
        You can add a maximum of 50 keywords and each keyword can be single or
        multiple words, for example ‘South’ or ‘South West’.
        <br /> <br />
        Once you use a keyword it will be saved so you can select it for any
        other contacts.
      </p>
    )
  }

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.view.viewLocation, {
      state: { successMessage: `${locationName} keywords changed` }
    })
  }

  return (
    <>
      <KeywordsLayout
        navigateToNextPage={navigateToNextPage}
        keywordType='location'
        keywordText={keywordText}
      />
    </>
  )
}
