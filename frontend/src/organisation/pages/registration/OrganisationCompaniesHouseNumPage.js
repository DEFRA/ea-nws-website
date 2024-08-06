import { useNavigate } from 'react-router'
import OrganisationCompaniesHouseNumLayout from '../../layouts/companies-house-num/OrganisationCompaniesHouseNumLayout'

export default function OrganisationCompaniesHouseNumPage() {
  const navigate = useNavigate()
  const NavigateToNextPage = () => navigate('/organisation/register/sector')

  const NavigateToPreviousPage = () => {
    navigate('/organisation/register/address-confirm')
  }

  return (
    <OrganisationCompaniesHouseNumLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
