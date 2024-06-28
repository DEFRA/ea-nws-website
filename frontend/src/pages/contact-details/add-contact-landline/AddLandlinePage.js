import { useNavigate } from 'react-router'
import AddLandlineLayout from '../../../common-layouts/landline/AddLandlineLayout'

export default function AddLandlinePage () {
  const navigate = useNavigate()
  const NavigateToNextPage = () => {
    navigate('/managecontacts/validate-landline')
  }

  return (
    <AddLandlineLayout NavigateToNextPage={NavigateToNextPage} />
  )
}
