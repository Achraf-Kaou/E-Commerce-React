import React from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';

import Navigation from './components/navbar';
import Shop from './components/shop';
import Footer from './components/footer';
import ErrorPage from './errorpage';
import Confirm from './components/confirm';
import Admin from './components/admin';

function MainApp() {
  return (
    <div className="App">
      <Navigation />
      <Shop />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/admin" element={<Admin />}  />
        
       
      </Routes>
    </Router>
  );
}

export default App;
