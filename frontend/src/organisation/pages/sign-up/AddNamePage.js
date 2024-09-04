import { useNavigate } from 'react-router'
import AddNameLayout from '../../layouts/name/AddNameLayout'

export default function AddNamePage() {
  const navigate = useNavigate()
  const NavigateToNextPage = () => navigate('/organisation/sign-up/address')

  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  return (
    <AddNameLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
