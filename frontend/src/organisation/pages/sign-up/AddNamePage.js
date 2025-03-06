import { useNavigate } from 'react-router'
import AddNameLayout from '../../layouts/name/AddNameLayout'
import { orgSignUpUrls } from '../../routes/sign-up/SignUpRoutes'

export default function AddNamePage () {
  const navigate = useNavigate()
  const navigateToNextPage = () => navigate(orgSignUpUrls.address.add)

  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  return (
    <AddNameLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
