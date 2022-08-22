import React from 'react';
import { CartProvider } from './context/cartContext';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import Cart from './components/Cart';

function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <Home />
        <Footer />
        <Cart />
      </CartProvider>
    </>
  );
}

export default App;
