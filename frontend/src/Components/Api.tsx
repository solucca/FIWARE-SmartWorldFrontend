import React, { useState } from 'react';
import './Api.css'

type DataType = {
  id: string;
  type: string;
  name: {
    value: string;
    type: string;
  };
};

const Api: React.FC = () => {
  const [data, setData] = useState<DataType | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleButtonClick = async (endpoint: string) => {
    try {
      console.log(ENDPOINT);
      const response = await fetch(endpoint);
      const jsonData = await response.json();
      setData(jsonData);
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='pl-3 pt-3'>
      <div style={{ display: 'flex'}}>
        <button className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 ml-12 rounded" onClick={() => handleButtonClick(ENDPOINT+'/ngsi-ld/v1/entities/urn:ngsi-ld:Device:weight001')}>
          Weight
        </button>
        <button className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 ml-3 rounded" onClick={() => handleButtonClick(ENDPOINT+'/ngsi-ld/v1/entities/urn:ngsi-ld:WeatherObserved:Basis:1')}>
          Weather
        </button>
        <button className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 ml-3 rounded" onClick={() => handleButtonClick(ENDPOINT+'/ngsi-ld/v1/entities/urn:ngsi-ld:Device:electricVehicleChargingStation001')}>
          Energy
        </button>
        <button className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 ml-3 rounded" onClick={() => handleButtonClick(ENDPOINT+'/ngsi-ld/v1/entities/urn:ngsi-ld:ParkingSpot:Mobility_Hub:1')}>
          Parking
        </button>
      </div>
      <div className={`response-box w-fit`}>
        {data && (
          <pre className={`response text-orange-500 mx-6 my-3 font-mono ${showAnimation ? 'animate' : ''}`}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default Api;
