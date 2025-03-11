import { useNavigate } from 'react-router'
import SectorLayout from '../../layouts/sector/SectorLayout'
import { orgSignUpUrls } from '../../routes/sign-up/SignUpRoutes'

export default function SectorPage () {
  const navigate = useNavigate()
  const navigateToNextPage = () => navigate(orgSignUpUrls.altContact)

  const NavigateToPreviousPage = () => {
    navigate(orgSignUpUrls.compHouseNum)
  }

  return (
    <SectorLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
