import { useNavigate } from 'react-router'
import AddAccountNameLayout from '../../../layouts/account-name/AddAccountNameLayout'

export default function AddFullNamePage () {
  const navigate = useNavigate()
  const NavigateToNextPage = () => navigate('/declaration')

  const NavigateToPreviousPage = () => {
    navigate('/signup/contactpreferences')
  }

  return (
    <AddAccountNameLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
      buttonText='Continue'
    />
  )
}
