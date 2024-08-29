import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { setProfile } from '../../../../common/redux/userSlice'
import { updateAdditionals } from '../../../../common/services/ProfileServices'
import AddAccountNameLayout from '../../../layouts/account-name/AddAccountNameLayout'

export default function AddFullNamePage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const NavigateToNextPage = (profile) => {
    const updatedProfile = updateAdditionals(profile, [{ id: 'lastAccessedUrl', value: '/declaration' }])
    dispatch(setProfile(updatedProfile))
    navigate('/declaration')
  }

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
