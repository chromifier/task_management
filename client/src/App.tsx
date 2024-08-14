import * as React from "react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route, Link } from "react-router-dom";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/slices/userSlice';
import { RootState } from './redux/store';

export default function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

function Home() {
  interface User {
    username: string | null;
    email: string | null;
  }

  const dispatch = useDispatch();
  const userSelector = useSelector((state: RootState) => state.user);

  const user = React.useContext(AuthContext);
  const [userDetails, setUserDetails] = React.useState<User | null>();


  React.useEffect(() => {
    const userInfo = user?.user;
    
    if (localStorage.getItem('token')) {
      if (userInfo) {
        setUserDetails(userInfo);
        dispatch(setUser({ username: userInfo.username, email: userInfo.email }));
      }
    } else {
      setUserDetails(null);
      dispatch(setUser({ username: userInfo.username, email: userInfo.email }));
    }

    console.log("userDetails State:", userDetails);
  }, [user?.user, userDetails]);

  const onSignOut = async () => {
    if (user) {
      user.logout();
    }
  };

  const checkUserState = () => {
    console.log(userSelector);
  }


  // Conditionally render content based on whether userDetails is set
  if (!userDetails) {
    return (
      <div className="home">
        <h1>Home</h1>
        <h3>Welcome to your ticket manager</h3>
        <p>Please login to continue...</p>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Now that userDetails is set, display the content */}
      <h1>Welcome, {userDetails.username}</h1>
      <button type="submit" onClick={onSignOut}>Sign Out</button>
      <button onClick={checkUserState}>Check User State</button>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}