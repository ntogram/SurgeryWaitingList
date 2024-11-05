import React, { createContext, useContext, useState,useEffect} from 'react';
import {login,logout,refresh} from '../services/serviceAPI'; 

const AuthContext = createContext();



export const AuthManager = ({ children }) => {
    


    
    const [auth, setAuth] = useState({
        isLoggedIn: false,
        accessToken: null,
        refreshToken: null,
        username:null
    });
   





    const signIn = async (username, password) => {
        let data={}
        try {
            const response = await login(username, password);
            data = response;
            setAuth(data);
             // Save tokens in sessionStorage
             sessionStorage.setItem("accessToken", data.access_token);
             sessionStorage.setItem("refreshToken", data.refresh_token);
            return data;
            
        } catch (error) {
            data = { isLoggedIn: false, accessToken: null, refreshToken: null,username:null, errorMessage:error };
            setAuth(data);
            return data;

        }
    }

    const signOut = async () => {
        try {
            const response = await logout(auth.accessToken, auth.refreshToken);
            setAuth({ isLoggedIn: false, accessToken: null, refreshToken: null,username:null });
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");
        } catch (error) {
            console.error("Logout failed:", error);
            setAuth({ isLoggedIn: false, accessToken: null, refreshToken: null,username:null, errorMessage:error });
        }
    };

    const refreshSession = async () =>{
        try {
            const newAccessToken = await refresh(auth.refreshToken);
            setAuth(prev => ({ ...prev, accessToken: newAccessToken }));
            sessionStorage.setItem("accessToken", newAccessToken);
        } catch (error) {
            setAuth({ isLoggedIn: false, accessToken: null, refreshToken: null,username:null, errorMessage:error });
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");
        }
    }
    return (
        <AuthContext.Provider value={{ auth,setAuth, signIn, signOut, refreshSession }}>
            {children}
        </AuthContext.Provider>
    );



}


export const useAuth = () => {
    return useContext(AuthContext);
};
