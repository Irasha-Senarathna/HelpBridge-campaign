// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Campaigns/Explore';
import Donate from './pages/Donate';
import About from './pages/About';
import StartCampaign from './pages/Campaigns/StartCampaign';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Details from './pages/Campaigns/Details';


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
    </Router>
  );
}

export default App;
