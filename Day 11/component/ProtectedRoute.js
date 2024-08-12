import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const userData = JSON.parse(localStorage.getItem('user'));

    // Check if the user is logged in and has the required role
    const isAuthorized = userData && allowedRoles.includes(userData.role);

    // Redirect to the appropriate page based on the user's role
    if (!isAuthorized) {
        if (userData?.role === 'User') {
            return <Navigate to="/user" replace />;
        } else if (userData?.role === 'dmin') {
            return <Navigate to="/admin" replace />;
        } else {
            return <Navigate to="/login" replace />;
        }
    }

    return <Outlet />;
};

export default ProtectedRoute;