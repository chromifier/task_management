import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
    user: User | any;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

interface User {
    id: string;
    username: string;
    email: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// export const createTicket = async (machineAsset: string, title: string, description: string, status: string, priority: string, createdBy: string) => {
//     // await axios.post('/api/users/register', { username, email, password });
//     try {
//         const response = await axios.post('http://localhost:5000/api/ticket/create', {
//             machineAsset,
//             title,
//             description,
//             status,
//             priority,
//             createdBy
//         });
//         console.log('Ticket Created:', response.data);
//     } catch (error) {
//         console.error('Error creating ticket:', error);
//     }
// };

export const AuthProvider: React.FC<{ children: ReactNode; }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUserDetails(token).then((userDetails) => {
                if (userDetails) {
                    setUser(userDetails);
                }
            });
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
            const token = res.data.token;
            localStorage.setItem('token', token);
            fetchUserDetails(token).then((userDetails) => {
                if (userDetails) {
                    setUser(userDetails);
                }
            });
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            console.log("User Logged in successfully. Token: ", token);
            navigate("/");
        } catch (error: any) {
            console.error('Error logging in:', error.response.data.message);
        }
    };

    const register = async (username: string, email: string, password: string) => {
        // await axios.post('/api/users/register', { username, email, password });
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', {
                username,
                email,
                password,
            });
            console.log('User registered:', response.data);
        } catch (error: any) {
            console.error('Error registering user:', error.response.data.message);
        }
    };

    const fetchUserDetails = async (token: string): Promise<User | null> => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get('http://localhost:5000/api/users/details', config);
            return response.data; // Assuming response.data contains the user object
        } catch (error: any) {
            console.error('Error fetching user details:', error.response?.data?.msg || error.message);
            return null;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
