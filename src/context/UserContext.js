import React, { createContext, useState, useContext } from 'react';


const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};


export const UserProvider = ({ children }) => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedTokenTimestamp = localStorage.getItem('tokenTimestamp');

    const [user, setUser] = useState(() => {
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch {
            return null;
        }
    });

    const [token, setToken] = useState(storedToken || null);
    const [tokenTimestamp, setTokenTimestamp] = useState(storedTokenTimestamp || null);

    const login = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        const timestamp = new Date().getTime();
        setTokenTimestamp(timestamp);

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userToken);
        localStorage.setItem('tokenTimestamp', timestamp.toString());
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setTokenTimestamp(null);

        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('tokenTimestamp');
    };

    return (
        <UserContext.Provider value={{ user, token, tokenTimestamp, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
