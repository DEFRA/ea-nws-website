import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { resetNavigation } from "../redux/navigationSlice"

const RouteWrapper = ({ children }) => {
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetNavigation())
    }, [location.key, dispatch])

    return children
}

export default RouteWrapper