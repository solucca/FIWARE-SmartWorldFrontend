import React, { useState } from 'react';
import logo from './assets/logo.png';
import Api from './Api';
import './App.css';
import Parking from './Components/Parking';
import topview from './assets/TopView.png';

const SmartworldContent = () => (
  <div className='smartworld-container'>
    <img src={topview} alt='Map of the city'
    style={{
        maxHeight:"700px",
        margin:0
    }}/>
    <Parking/>
  </div>
);

const SmartDataModelsContent = () => (
  <div>
    <h2>Smart Data Models Content</h2>
    <p>This is the Smart Data Models content.</p>
  </div>
);

const APIContent = () => (
  <div>
    <h2>API Content</h2>
    <Api/>
  </div>
);

const App: React.FC = () => {
  const [activeButton, setActiveButton] = useState('Smartworld');

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const getContent = () => {
    switch (activeButton) {
      case 'Smart Data Models':
        return <SmartDataModelsContent />;
      case 'API':
        return <APIContent />;
      default:
        return <SmartworldContent />;
    }
  };

  return (
    <>
      <nav className="navigation-menu">
        <div className="logo">
          <img src={logo} alt="My Logo" className='logo' />
        </div>
        <div className="buttons">
          <button className={activeButton === 'Smartworld' ? 'active' : ''} onClick={() => handleButtonClick('Smartworld')}>
            Smartworld
          </button>
          <button className={activeButton === 'Smart Data Models' ? 'active' : ''} onClick={() => handleButtonClick('Smart Data Models')}>
            Smart Data Models
          </button>
          <button className={activeButton === 'API' ? 'active' : ''} onClick={() => handleButtonClick('API')}>
            API
          </button>
        </div>
      </nav>
      <div className="content-wrapper">{getContent()}</div>
    </>
  );
};

export default App;
