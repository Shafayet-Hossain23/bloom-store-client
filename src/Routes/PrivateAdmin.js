import React, { useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import LoadingElement from '../Components/LoadingElement';
import { useAdmin } from '../Components/useAdmin';
import { AuthContext } from '../ContextApi/UserContext';


const PrivateAdmin = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isAdmin, adminLoading] = useAdmin(user?.email)
    const location = useLocation()
    if (loading || adminLoading) {
        return <LoadingElement></LoadingElement>
    }
    if (user && isAdmin) {
        return children
    }
    return <Navigate to='/noAccess' state={{ from: location }} replace></Navigate>
};

export default PrivateAdmin;
