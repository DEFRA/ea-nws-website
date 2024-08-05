import { useNavigate } from 'react-router'
import AddOrganisationNameLayout from '../../layouts/organisation-name/AddOrganisationNameLayout'

export default function AddOrganisationNamePage() {
  const navigate = useNavigate()
  const NavigateToNextPage = () => navigate('/declaration')

  return (
    <AddOrganisationNameLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={navigate(-1)}
      buttonText='Continue'
    />
  )
}
