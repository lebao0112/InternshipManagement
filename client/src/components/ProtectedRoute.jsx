import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';

const ProtecedRoute = ({allowedRoles, children}) => {
    const token = localStorage.getItem('authToken');
    const user = token ? JSON.parse(atob(token.split(".")[1])) : null;

    if(!token){
        return <Navigate to="/" replace />;
    }

    if(!allowedRoles.includes(user?.role)){
        return <Navigate to="/" replace />;
    }
    return children ? children : <Outlet />;
};

ProtecedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.node
};

export default ProtecedRoute;