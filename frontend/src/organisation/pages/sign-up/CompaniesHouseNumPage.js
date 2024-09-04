import { useNavigate } from 'react-router'
import CompaniesHouseNumLayout from '../../layouts/companies-house-num/CompaniesHouseNumLayout'

export default function CompaniesHouseNumPage () {
  const navigate = useNavigate()
  const NavigateToNextPage = () => navigate('/organisation/sign-up/sector')

  const NavigateToPreviousPage = () => {
    navigate('/organisation/sign-up/address-confirm')
  }

  return (
    <CompaniesHouseNumLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
