
import { useState } from 'react';
import Home from './components/Home';
import OrderPizza from './components/OrderPizza';
import Success from './components/Success';
import './App.css';

function App() {
  const [sayfa, setSayfa] = useState('home');
  const [siparis, setSiparis] = useState(null);

  const handleStartOrder = () => {
    setSayfa('order');
  };

  const handleOrderSuccess = (siparisBilgileri) => {
    setSiparis(siparisBilgileri);
    setSayfa('success');
  };

  return (
    <>
      {sayfa === 'home' && (
        <Home onStartOrder={handleStartOrder} />
      )}

      {sayfa === 'order' && (
        <OrderPizza onOrderSuccess={handleOrderSuccess} />
      )}

      {sayfa === 'success' && siparis && (
        <Success siparis={siparis} />
      )}
    </>
  );
}

export default App;
