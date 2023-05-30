import React, { useState } from 'react';
import LoginCard from '../components/LoginCard';
import RegisterCard from '../components/RegisterCard';

const API = 'https://codextern-4ny2.onrender.com/';

function LogIn() {

  const [activeCard, setActiveCard] = useState('login');

  function switchCard() {
    setActiveCard(activeCard === 'login' ? 'register' : 'login');
  }

  return (
    <div>
      {activeCard === 'login' ? (
        <LoginCard switchCard={switchCard} />
      ) : (
        <RegisterCard switchCard={switchCard} />
      )}
    </div>
  );
}

export default LogIn;