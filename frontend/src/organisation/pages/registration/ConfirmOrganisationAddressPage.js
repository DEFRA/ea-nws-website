import { useNavigate } from 'react-router'
import ConfirmOrganisationAddressLayout from '../../layouts/address/ConfirmOrganisationAddressLayout'

export default function ConfirmOrganisationAddressPage() {
  const navigate = useNavigate()
  const NavigateToNextPage = () => navigate('/organisation/register/number')

  const NavigateToPreviousPage = () => {
    navigate('/organisation/register/address')
  }

  return (
    <ConfirmOrganisationAddressLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
