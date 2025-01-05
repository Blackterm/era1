import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CreateEvent from './components/CreateEvent';
import EventDetail from './components/EventDetail';
import EditEvent from './components/EditEvent';
import Layout from './components/Layout';
const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/event/:eventId" element={<EventDetail />} />
            <Route path="/edit-event/:eventId" element={<EditEvent />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
