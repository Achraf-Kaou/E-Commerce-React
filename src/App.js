import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/navbar';
import Shop from './components/shop';
import Footer from './components/footer';
import ShoppingCart from './components/shoppingCart';
import Admin from './components/admin';
import Addprod from './components/addprod';
import ProductAdmin from './components/ProductsAdmin';
import Contact from './components/contact';
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
        <Route path="/admin" element={<Admin />}  />
        <Route path="/addProd" element={<Addprod />} />
        <Route path='/cartShop' element={<ShoppingCart/>} />
        <Route path='/productsadmin' element={<ProductAdmin/>} />
        <Route path='/contact' element={<Contact/>} />
      </Routes>
    </Router>
  );
}

export default App;
