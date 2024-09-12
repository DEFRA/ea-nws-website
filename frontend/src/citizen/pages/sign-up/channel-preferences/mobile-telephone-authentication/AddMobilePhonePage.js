import { useNavigate } from 'react-router'
import AddMobileLayout from '../../../../layouts/mobile/AddMobileLayout'

export default function AddMobilePhonePage () {
  const navigate = useNavigate()
  const NavigateToNextPage = () =>
    navigate('/signup/contactpreferences/mobile/validate')

  const NavigateToPreviousPage = () => navigate('/signup/contactpreferences')

  return (
    <AddMobileLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
