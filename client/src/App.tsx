import * as React from "react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route, Link } from "react-router-dom";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";

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

  const user = React.useContext(AuthContext);
  const [userDetails, setUserDetails] = React.useState<User | null>();


  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      const userInfo = user?.user;
      if (userInfo) {
        setUserDetails(userInfo);
      }
    } else {
      setUserDetails(null);
    }

    console.log("userDetails State:", userDetails);
  }, [user?.user, userDetails]);

  const onSignOut = async () => {
    if (user) {
      user.logout();
    }
  };


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