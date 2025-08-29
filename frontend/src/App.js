// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Explore from './pages/Campaigns/Explore';
import Donate from './pages/Donate';
import About from './pages/About';
import StartCampaign from './pages/Campaigns/StartCampaign';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Details from './pages/Campaigns/Details';
import LoginForm from "./components/auth/LoginForm";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/campaigns/explore" element={<Explore />} />
        <Route path="/campaigns/start-campaign" element={<StartCampaign />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/start-campaign" element={<StartCampaign />} />
        <Route path="/campaigns/details/:id?" element={<Details />} />
      </Routes>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;