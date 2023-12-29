import { Navigate, Outlet, useLocation } from "react-router-dom"
import { getUser } from "../../services/userServices"

const ProtectedRoute = () => {
    const {pathname} = useLocation();

    return getUser() ? <Outlet /> : <Navigate to={`/login`} state={{ from: pathname }} />
}

export default ProtectedRoute