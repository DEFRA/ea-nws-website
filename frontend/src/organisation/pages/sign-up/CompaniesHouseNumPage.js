import { useNavigate } from 'react-router'
import CompaniesHouseNumLayout from '../../layouts/companies-house-num/CompaniesHouseNumLayout'
import { orgSignUpUrls } from '../../routes/sign-up/SignUpRoutes'

export default function CompaniesHouseNumPage () {
  const navigate = useNavigate()
  const navigateToNextPage = () => navigate(orgSignUpUrls.sector)

  const NavigateToPreviousPage = () => {
    navigate(orgSignUpUrls.address.confirm)
  }

  return (
    <CompaniesHouseNumLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
