import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { LandingPage } from './pages/LandingPage';
import { Onboarding } from './pages/Onboarding';

import { Groups } from './pages/Groups';
import { Events } from './pages/Events';
import { Map } from './pages/Map';
import { Messages } from './pages/Messages';
import { Profile } from './pages/Profile';
import { Safety } from './pages/Safety';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="groups" element={<Groups />} />
          <Route path="events" element={<Events />} />
          <Route path="map" element={<Map />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<Profile />} />
          <Route path="safety" element={<Safety />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
