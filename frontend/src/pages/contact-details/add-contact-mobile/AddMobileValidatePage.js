import { useNavigate } from 'react-router-dom'
import ValidateMobileLayout from '../../../common-layouts/mobile/ValidateMobileLayout'
export default function AddMobileValidatePage () {
  const navigate = useNavigate()

  const NavigateToNextPage = () => navigate('/managecontacts')
  const SkipValidation = (mobilePhone) => {
    navigate('/managecontacts', {
      state: {
        unconfirmedtype: 'mobilePhone',
        unconfirmedvalue: mobilePhone
      }
    })
  }
  const DifferentMobile = () => {
    navigate('/managecontacts/add-mobile')
  }

  return (
    <ValidateMobileLayout
      NavigateToNextPage={NavigateToNextPage}
      SkipValidation={SkipValidation}
      DifferentMobile={DifferentMobile}
    />
  )
}
