import React, { useState } from 'react';
import logo from './assets/logo.png';
import Api from './Components/Api';
import './App.css';
import DigitalTwin from './Components/DigitalTwin';
import TrainControl from './Components/TrainControl';

const SmartworldContent = () => (
  <DigitalTwin/>
);

const SmartDataModelsContent = () => (
  <div>
    <h2>Smart Data Models Content</h2>
    <iframe 
      height="1000"
      width="500"
      src="http://192.168.1.100:3003/d-solo/xEMwKk-Vk/legomodel?orgId=1&refresh=5s&theme=light&panelId=14">
    </iframe>
  </div>
);

const APIContent = () => (
  <div>
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
      case 'TRAIN':
        return <TrainControl />;
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
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 mr-3 ml-3 rounded" onClick={() => handleButtonClick('Smartworld')}>
            SmartWorld
          </button>
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 mr-3 rounded" onClick={() => handleButtonClick('API')}>
            Smart Data Models
          </button>
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => handleButtonClick('TRAIN')}>
            Train Control
          </button>
        </div>
      </nav>

      {getContent()}

    </>
  );
};

export default App;
