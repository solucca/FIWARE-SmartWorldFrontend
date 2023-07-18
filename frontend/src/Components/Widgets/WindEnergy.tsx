import { useState, useEffect } from "react";
import "./WindEnergy.css";

const getPower = async () => {
  var result = [0,0];
  try 
  {
    var req1 = await fetch(ENDPOINT+"/ngsi-ld/v1/entities?id=urn:ngsi-ld:EnergyConsumer:Wind_Energy:1&options=keyValues");
    var req2 = await fetch(ENDPOINT+"/ngsi-ld/v1/entities?id=urn:ngsi-ld:GreenEnergyGenerator:Wind_Energy:1&options=keyValues");
    var data1 = await req1.json();
    var data2 = await req2.json();
    var consumer = data1[0]["p"];
    var generator = data2[0]["maxEolicPowerGenerated"];

    result = [consumer.toFixed(1), generator.toFixed(1)]
  } catch (error) {
    console.log(`Erro: ${error}`);
  }
  return result

};

const WindEnergy = () => {
  const [values, setValue] = useState([0,0]);
  const [showToggle, setShowToggle] = useState(false);
  const [windmill, setWindmill] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      var t = await getPower();
      setValue(t);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleDivClick = () => {
    setShowToggle(!showToggle);
  };
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (windmill)
      fetch(ENDPOINT+"/ngsi-ld/v1/entities/urn:ngsi-ld:Device:windmills001/attrs/on", {method : "PATCH"});
    else 
      fetch(ENDPOINT+"/ngsi-ld/v1/entities/urn:ngsi-ld:Device:windmills001/attrs/off", {method : "PATCH"});
    setWindmill(!windmill);
  };

  return (
  <div
    style={{
      position: "absolute",
      top: "47.2%",
      left: "72.9%",
    }}
    onClick={handleDivClick}
    className={`bg-blue-500 rounded p-2 text-white font-bold opacity-90 flex flex-col justify-center ${showToggle ? 'expanded' : ''}`}
  >
    {showToggle ? (
    <>
      <p className="toggle-text">Toggle The Wind Turbine</p>
      <button className="bg-white px-2 py-1 font-bold text-blue-500" onClick={handleButtonClick}>{windmill ? (<>ON</>):(<>OFF</>)}</button>
    </>
    ) : (
    <>
    <p>Generated: <b>{values[1]} kW</b></p>
    <p>Consumed: <b>{values[0]} kW</b></p>
    </>
    )}
  </div>
  );
};


export default WindEnergy;