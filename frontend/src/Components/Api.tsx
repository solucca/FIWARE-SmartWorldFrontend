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
    <div>
      <div style={{ display: 'flex'}}>
        <button onClick={() => handleButtonClick('http://192.168.1.100:8080/ngsi-ld/v1/entities/urn:ngsi-ld:Device:weight001')}>
          Weight
        </button>
        <button onClick={() => handleButtonClick('http://192.168.1.100:8080/ngsi-ld/v1/entities/urn:ngsi-ld:WeatherObserved:Basis:1')}>
          Weather
        </button>
        <button onClick={() => handleButtonClick('http://192.168.1.100:8080/ngsi-ld/v1/entities/urn:ngsi-ld:Device:electricVehicleChargingStation001')}>
          Energy
        </button>
        <button onClick={() => handleButtonClick('http://192.168.1.100:8080/ngsi-ld/v1/entities/urn:ngsi-ld:ParkingSpot:Mobility_Hub:1')}>
          Parking
        </button>
      </div>
      <div className={`response-box`}>
        {data && (
          <pre className={`response ${showAnimation ? 'animate' : ''}`} style={{ color: '#5dc0cf', fontFamily: 'monospace' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default Api;
