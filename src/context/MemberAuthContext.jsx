// src/context/MemberAuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { authApi } from '../services/api'; // Import your auth API service

// 1. Create the Context
export const MemberAuthContext = createContext(null);

// 2. Create the Provider Component
export const MemberAuthProvider = ({ children }) => {
    const [member, setMember] = useState(null);
    // Use a different key in localStorage to distinguish from admin tokens
    const [token, setToken] = useState(localStorage.getItem('memberToken') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // This effect runs on app startup to verify any existing session
        const verifyMemberSession = async () => {
            if (token) {
                try {
                    // getMe() works for any authenticated user
                    const response = await authApi.getMe();
                    setMember(response.data.data);
                } catch (error) {
                    console.error("Member session token is invalid or expired.", error);
                    localStorage.removeItem('memberToken');
                    setToken(null);
                    setMember(null);
                }
            }
            setLoading(false);
        };
        verifyMemberSession();
    }, [token]);

    // This function specifically uses the `memberLogin` API endpoint
    const memberLogin = async (credentials) => {
        const response = await authApi.memberLogin(credentials);
        const newToken = response.data.data.token;

        // Persist the token
        setToken(newToken);
        localStorage.setItem('memberToken', newToken);

        // Fetch the logged-in member's profile
        const userProfile = await authApi.getMe();
        const userData = userProfile.data.data;
        setMember(userData);
        return userData;
    };

    const memberLogout = async () => {
        try {
            // Invalidate the token on the server
            await authApi.logout();
        } catch (error) {
            console.error("Server logout failed, but proceeding with client logout.", error);
        } finally {
            // Always clear the client-side session
            localStorage.removeItem('memberToken');
            setToken(null);
            setMember(null);
        }
    };

    const value = { member, token, memberLogin, memberLogout, isMemberAuthenticated: !!token, loading };

    return (
        <MemberAuthContext.Provider value={value}>
            {!loading && children}
        </MemberAuthContext.Provider>
    );
};

// 3. Create a custom hook for easy consumption
export const useMemberAuth = () => {
    const context = useContext(MemberAuthContext);
    if (context === undefined) {
        throw new Error('useMemberAuth must be used within a MemberAuthProvider');
    }
    return context;
};