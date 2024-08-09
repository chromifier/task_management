import React from 'react'
import { Link, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    const user = localStorage.getItem('token');

    return (
        <>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>
                </nav>

                <Outlet />
            </div>
        </>
      );
}

export default Layout