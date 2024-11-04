import React, { createContext, useContext, useState } from 'react';
import {login,logout,refresh} from '../services/serviceAPI'; 

const AuthContext = createContext();



export const AuthManager = ({ children }) => {
    const [auth, setAuth] = useState({
        isLoggedIn: false,
        accessToken: null,
        refreshToken: null,
    });

    const signIn = async (username, password) => {
        let data={}
        try {
            const response = await login(username, password);
            data = response;
            setAuth(data);
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
            setAuth({ isLoggedIn: false, accessToken: null, refreshToken: null });
        } catch (error) {
            console.error("Logout failed:", error);
            setAuth({ isLoggedIn: false, accessToken: null, refreshToken: null, errorMessage:error });
        }
    };

    const refreshSession = async () =>{
        try {
            const newAccessToken = await refresh(auth.refreshToken);
            setAuth(prev => ({ ...prev, accessToken: newAccessToken }));
        } catch (error) {
            setAuth({ isLoggedIn: false, accessToken: null, refreshToken: null, errorMessage:error });
        }
    }
    return (
        <AuthContext.Provider value={{ auth, signIn, signOut, refreshSession }}>
            {children}
        </AuthContext.Provider>
    );



}


export const useAuth = () => {
    return useContext(AuthContext);
};
