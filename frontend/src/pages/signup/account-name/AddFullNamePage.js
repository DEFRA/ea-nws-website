import { useNavigate } from 'react-router'
import AddAccountNameLayout from '../../../common-layouts/account-name/AddAccountNameLayout'

export default function AddMobilePhonePage() {
  const navigate = useNavigate()
  const NavigateToNextPage = () => navigate('/declaration')

  const NavigateToPreviousPage = () => {
    navigate('/signup/contactpreferences')
  }

  return (
    <AddAccountNameLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
