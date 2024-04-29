import React from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';

import Navigation from './components/navbar';
import Shop from './components/shop';
import Footer from './components/footer';
import ShoppingCart from './components/shoppingCart';
import Confirm from './components/confirm';
import Admin from './components/admin';
import Addprod from './components/addprod';
import Cart from './components/navbarCart';
import Contact from './components/contact';
import MiniCart from './components/minicart';
import Login from './components/login';
import Product from './components/product';
import Navbar from './components/navbar';
import Services from "./components/services"

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

        <Route path="/shop" element={<Shop />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/admin" element={<Admin />}  />
        <Route path="/addProd" element={<Addprod />} />
        <Route path="/navbarCart" element={<Cart />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path='/minicart' element={<MiniCart/>} />
        <Route path='/navbar' element={<Navbar />} />
        <Route path="/product" element={<Product />} />
        <Route path='/services' element={<Services />} />
        <Route path='/cartShop' element={<ShoppingCart/>} />
      </Routes>
    </Router>
  );
}

export default App;
