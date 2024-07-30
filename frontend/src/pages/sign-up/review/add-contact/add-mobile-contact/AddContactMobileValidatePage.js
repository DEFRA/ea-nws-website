import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ValidateMobileLayout from '../../../../../common-layouts/mobile/ValidateMobileLayout'
import { addContactPreference } from '../../../../../redux/userSlice'
export default function ValidateMobileContactPage() {
  const dispatch = useDispatch()

  const contactPreferences = useSelector(
    (state) => state.session.contactPreferences
  )
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    if (!contactPreferences.includes('Text')) {
      dispatch(addContactPreference('Text'))
    }
    navigate('/signup/review')
  }

  const SkipValidation = () => {
    navigate('/signup/review')
  }
  const DifferentMobile = () => {
    navigate('/signup/review/add-mobile')
  }

  return (
    <ValidateMobileLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={DifferentMobile}
      SkipValidation={SkipValidation}
      DifferentMobile={DifferentMobile}
    />
  )
}
