import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import KeyInformationLayout from '../../../../layouts/optional-info/KeyInformationLayout'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function AddKeyInformationPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.add.optionalInformation.addKeywords)
  }

  return (
    <>
      <Helmet>
        <title>Key information for this location - Manage locations - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <KeyInformationLayout
        flow='add'
        navigateToNextPage={navigateToNextPage}
      />
    </>
  )
}
