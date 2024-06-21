import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ValidateLandlineLayout from '../../../common-layouts/landline/ValidateLandlineLayout'
export default function AddLandlineValidatePage () {
  const navigate = useNavigate()
  const NavigateToNextPage = useCallback(() => 
    navigate('/managecontacts')
  )
  const SkipValidation = useCallback((homePhone) => 
    navigate('/managecontacts', {
      state: {
        unconfirmedtype: 'homePhone',
        unconfirmedvalue: homePhone
      }
    })
  )
  const DifferentHomePhone = useCallback(() => 
    navigate('/managecontacts/add-landline')
  )

  return (
    <ValidateLandlineLayout NavigateToNextPage={NavigateToNextPage} SkipValidation={SkipValidation} DifferentHomePhone={DifferentHomePhone} />
  )
}
