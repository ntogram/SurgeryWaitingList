import React ,{useState,useEffect} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Auth/AuthManager';
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const ProtectedRoute = () => {
  
    const { auth, setAuth,hasValidokens,refreshSession} = useAuth(); // Set auth in global context if needed
    const [loading, setLoading] = useState(true); // Local loading state for this route
    
    
    useEffect(() => {


        const loadSavedTokens = (savedAccessToken,savedRefreshToken)=>{
            setAuth({
                isLoggedIn: true,
                accessToken: savedAccessToken,
                refreshToken: savedRefreshToken,
            });
            setLoading(false);
        }
        


        const initializeAuth = async () => {
            const savedAccessToken = sessionStorage.getItem("accessToken");
            const savedRefreshToken = sessionStorage.getItem("refreshToken");
            const tokenValidity = hasValidokens(savedAccessToken,savedRefreshToken)
            console.log(tokenValidity)
            if (tokenValidity ==1 && loading){
                // valid access token
                loadSavedTokens(savedAccessToken,savedRefreshToken);
            }
            if (tokenValidity==2 && loading){
                // access token expires and use refresh token for renew it
                await refreshSession();
                setLoading(false);
            }
            
        }
            
            
       
      





        initializeAuth(); 
       // checkAndRefreshToken()
    }, [auth]);
    
    
    
    
    
    
    
    
    
    
    
   // console.log(auth)
    if (loading) {
        return (
                    <Flex align="center" gap="middle">
            
            
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                    </Flex>)
    }



    // If the user is logged in, render the child component(s); otherwise, redirect to login
    return auth.isLoggedIn ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;