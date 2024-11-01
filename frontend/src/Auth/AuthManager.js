import React, { createContext, useContext, useState } from 'react';
import {login,logout,refresh} from './services'; 

const AuthContext = createContext();



export const AuthManager = ({ children }) => {
    const [auth, setAuth] = useState({
        isLoggedIn: false,
        accessToken: null,
        refreshToken: null,
    });

    const signIn = async (username, password) => {
        try {
            const response = await login(username, password);
            const data = response.data
            setAuth({ isLoggedIn: true, accessToken: data['access_token'], refreshToken: data['refresh_token'] });
        } catch (error) {
            setAuth({ isLoggedIn: false, accessToken: null, refreshToken: null, errorMessage:error });
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
