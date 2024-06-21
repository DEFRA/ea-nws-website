import { useCallback } from "react";
import { useNavigate } from "react-router";
import AddLandlineLayout from "../../../common-layouts/Landline/AddLandlineLayout";

export default function AddLandlinePage () {
  const navigate = useNavigate()
  const NavigateToNextPage = useCallback(() =>
    navigate('/managecontacts/validate-landline')
)

  return (
    <AddLandlineLayout NavigateToNextPage={NavigateToNextPage}/>
  )
}
