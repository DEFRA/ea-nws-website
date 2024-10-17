import { React } from 'react'
import { useNavigate } from 'react-router-dom'
import AddKeywordsLayout from '../../../../layouts/location/add-or-edit-location/optional-information/AddKeywordsLayout'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function KeywordsForThisLocationPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.add.optionalInformation.addActionPlan)
  }

  const navigateToPreviousPage = () => {
    navigate(-1)
  }

  const text = (
    <>
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
      </p>
    </>
  )

  return (
    <>
      <AddKeywordsLayout
        pageHeading='Keywords for this location (optional)'
        text={text}
        navigateToNextPage={navigateToNextPage}
        navigateToPreviousPage={navigateToPreviousPage}
      />
    </>
  )
}
