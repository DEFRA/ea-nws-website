import { useNavigate } from 'react-router-dom'
import AddKeywordsLayout from '../../../../layouts/optional-info/AddKeywordsLayout'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function AddKeywordsPage () {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate(orgManageLocationsUrls.add.optionalInformation.addActionPlan)
  }

  return (
    <>
      <AddKeywordsLayout
        NavigateToNextPage={NavigateToNextPage}
        keywordType='location'
      />
    </>
  )
}
