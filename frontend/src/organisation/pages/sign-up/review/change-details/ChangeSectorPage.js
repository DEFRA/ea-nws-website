import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import SectorLayout from '../../../../layouts/sector/SectorLayout'
import { orgSignUpUrls } from '../../../../routes/sign-up/SignUpRoutes'

export default function ChangeSectorPage () {
  const navigate = useNavigate()
  const navigateToNextPage = () => navigate(orgSignUpUrls.review)

  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  return (
    <>
      <Helmet>
        <title>Change organisation sector - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <SectorLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={NavigateToPreviousPage}
      />
    </>
  )
}
