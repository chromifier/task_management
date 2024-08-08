import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { redirect } from 'react-router-dom';

const Login: React.FC = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Email</label>
                <input type="email" name="email" value={email} onChange={onChange} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={onChange} required />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
