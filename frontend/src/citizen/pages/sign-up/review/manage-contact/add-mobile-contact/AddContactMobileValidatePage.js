import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addContactPreference } from '../../../../../../common/redux/userSlice'
import ValidateMobileLayout from '../../../../../layouts/mobile/ValidateMobileLayout'

export default function ValidateMobileContactPage () {
  const dispatch = useDispatch()

  const contactPreferences = useSelector(
    (state) => state.session.contactPreferences
  )
  const navigate = useNavigate()

  const navigateToNextPage = () => {
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
    <>
      <Helmet>
        <title>Confirm your mobile number - Get flood messages - Get flood warnings - GOV.UK</title>
      </Helmet>
      <ValidateMobileLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={DifferentMobile}
        SkipValidation={SkipValidation}
        DifferentMobile={DifferentMobile}
      />
    </>
  )
}
