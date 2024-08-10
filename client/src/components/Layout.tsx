import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Layout: React.FC = () => {
    const user = React.useContext(AuthContext);

    if (user?.user) {
        return (
            <>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
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
    } else {
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
                        </ul>
                    </nav>

                    <Outlet />
                </div>
            </>
        );
    }


};

export default Layout;