import { useNavigate } from 'react-router'
import AddOrganisationNameLayout from '../../layouts/organisation-name/AddOrganisationNameLayout'

export default function AddOrganisationNamePage() {
  const navigate = useNavigate()
  const NavigateToNextPage = () => navigate('/organisation/register/address')

  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  return (
    <AddOrganisationNameLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
