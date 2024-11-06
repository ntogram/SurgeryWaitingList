import React, { createContext, useContext, useState,useEffect} from 'react';
import {login,logout,refresh} from '../services/serviceAPI'; 

const AuthContext = createContext();



export const AuthManager = ({ children }) => {
    


    
    const [auth, setAuth] = useState({
        isLoggedIn: false,
        accessToken: null,
        refreshToken: null
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
            data = { isLoggedIn: false, accessToken: null, refreshToken: null, errorMessage:error };
            setAuth(data);
            return data;

        }
    }

    const signOut = async () => {
        try {
            
            const response = await logout(auth.accessToken, auth.refreshToken);
            let data = { isLoggedIn: false, accessToken: null, refreshToken: null }
            if ("errorMessage" in response){
                data["errorMessage"] = response["errorMessage"]
            }


            setAuth(data);
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");
            return data;
        } catch (error) {
            console.log("test3")
            console.error("Logout failed:", error);
            let data ={ isLoggedIn: false, accessToken: null, refreshToken: null, errorMessage:error }
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");
            setAuth(data);
            return data;
        }
    };

    const refreshSession = async () =>{
        try {
            const newAccessToken = await refresh(auth.refreshToken);
            setAuth(prev => ({ ...prev, accessToken: newAccessToken }));
            sessionStorage.setItem("accessToken", newAccessToken);
        } catch (error) {
            setAuth({ isLoggedIn: false, accessToken: null, refreshToken: null, errorMessage:error });
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
