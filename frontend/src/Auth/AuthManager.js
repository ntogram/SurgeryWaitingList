import React, { createContext, useContext, useState,useEffect} from 'react';
import {login,logout,refresh} from '../services/serviceAPI'; 
import {jwtDecode } from "jwt-decode";

const AuthContext = createContext();



export const AuthManager = ({ children }) => {
    


    
    const [auth, setAuth] = useState({
        isLoggedIn: false,
        accessToken: null,
        refreshToken: null
    });
   
   
    //check if token is expired
    const isTokenExpired = (token) => {
        if (token == null) return true;
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000
        //console.log(decoded.exp)
        //console.log(currentTime)
        const expirationDate = new Date(decoded.exp * 1000); 
        console.log("d:",Date());
        console.log("e:",expirationDate)
        return decoded.exp< currentTime
    };
    // check if the existing tokens are valid
   const hasValidokens =  (accessToken,refreshToken) => {
        // check if access token is valid
        if (accessToken!=null && !isTokenExpired(accessToken)) {
            return 1; // 1 when access token is valid
        }
        // access token expired 
        // check if there is valid refresh token
        if (refreshToken!=null && !isTokenExpired(refreshToken)) {
            return true; // 2 when refresh token is valid
        }
        return 0;  // when both tokens are invalid

   }


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
        const tokenValidity = hasValidokens(auth.accessToken, auth.refreshToken)
        console.log(tokenValidity)
        let accessToken =auth.accessToken;
       if (tokenValidity==2){
             accessToken = await refreshSession();
        }
        try {
            
            const response = await logout(accessToken, auth.refreshToken);
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
            return newAccessToken;
        } catch (error) {
            setAuth({ isLoggedIn: false, accessToken: null, refreshToken: null, errorMessage:error });
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");
            return null;
        }
    }
    return (
        <AuthContext.Provider value={{ auth,setAuth, signIn, signOut, refreshSession,hasValidokens }}>
            {children}
        </AuthContext.Provider>
    );



}


export const useAuth = () => {
    return useContext(AuthContext);
};
