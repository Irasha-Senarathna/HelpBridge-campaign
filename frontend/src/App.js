import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Explore from "./pages/Campaigns/Explore";
import Donate from "./pages/Donate";
import About from "./pages/About";
import StartCampaign from "./pages/Campaigns/StartCampaign";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Details from "./pages/Campaigns/Details";

function App() {
  const [user, setUser] = useState(null);

  // Check if user is logged in when app loads
  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) setUser(JSON.parse(loggedUser));
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div className="App">
        {user && (
          <div className="p-4 bg-gray-100 flex justify-between items-center">
            <p>Welcome, {user.name}</p>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        )}
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/campaigns/explore" /> : <Login onLogin={handleLogin} />}
          />
          <Route path="/auth/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/campaigns/explore" element={user ? <Explore /> : <Navigate to="/" />} />
          <Route path="/campaigns/start-campaign" element={user ? <StartCampaign /> : <Navigate to="/" />} />
          <Route path="/donate" element={user ? <Donate /> : <Navigate to="/" />} />
          <Route path="/about" element={<About />} />
          <Route path="/campaigns/details/:id" element={user ? <Details /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
