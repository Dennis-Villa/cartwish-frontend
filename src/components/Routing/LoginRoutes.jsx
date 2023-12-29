import { Navigate, Outlet } from "react-router-dom"
import { getUser } from "../../services/userServices"

const LoginRoutes = () => {
    return getUser() ? <Navigate to={`/`} /> : <Outlet /> 
}

export default LoginRoutes