import React ,{useState,useEffect} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Auth/AuthManager';

const ProtectedRoute = () => {
    const { auth, setAuth } = useAuth(); // Set auth in global context if needed
    const [loading, setLoading] = useState(true); // Local loading state for this route
    
    useEffect(() => {
        const initializeAuth = async () => {
            const savedAccessToken = sessionStorage.getItem("accessToken");
            const savedRefreshToken = sessionStorage.getItem("refreshToken");

            if (savedAccessToken && savedRefreshToken && loading) {
                setAuth({
                    isLoggedIn: true,
                    accessToken: savedAccessToken,
                    refreshToken: savedRefreshToken,
                });
            }
            setLoading(false); // Complete loading only after tokens are checked
        };



        initializeAuth(); 
    }, [auth]);
    
    
    
    
    
    
    
    
    
    
    
   // console.log(auth)
    if (loading) {
        return <div>Loading...</div>;  // You can replace this with a spinner or custom loading component
    }



    // If the user is logged in, render the child component(s); otherwise, redirect to login
    return auth.isLoggedIn ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;