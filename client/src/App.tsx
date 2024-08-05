import * as React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import AuthContext, { useAuth, AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <div>
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
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
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function Home() {
  interface User {
    username: string | null;
    email: string | null;
  }

  const user = React.useContext(AuthContext);
  const [userDetails, setUserDetails] = React.useState<User | undefined>();
  console.log("User Token:", localStorage.getItem('token'));


  React.useEffect(() => {
    const userInfo = user?.fetchUserDetails();
    console.log(userInfo);
    if (userInfo) {
      setUserDetails(userInfo);
    }

    console.log("userDetails State:", userDetails);
  }, []);

  const onSignOut = async () => {
    if (user) {
      user.logout();
    }
  };


  return (
    <div>
      <h2>Home</h2>
      <h3>Welcome {userDetails?.username}</h3>
      <button onClick={onSignOut}>Sign Out</button>
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