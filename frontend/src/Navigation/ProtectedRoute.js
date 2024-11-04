import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Auth/AuthManager';

const ProtectedRoute = () => {
    const { auth } = useAuth();

    // If the user is logged in, render the child component(s); otherwise, redirect to login
    return auth.isLoggedIn ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;