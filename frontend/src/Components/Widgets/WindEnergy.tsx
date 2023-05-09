import { useState, useEffect } from "react";
import "./WindEnergy.css";

const getPower = async () => {
  var result = [0,0];
  try 
  {
    var req1 = await fetch("http://192.168.1.100:8080/ngsi-ld/v1/entities?id=urn:ngsi-ld:EnergyConsumer:Wind_Energy:1&options=keyValues");
    var req2 = await fetch("http://192.168.1.100:8080/ngsi-ld/v1/entities?id=urn:ngsi-ld:GreenEnergyGenerator:Wind_Energy:1&options=keyValues");
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
      fetch("http://192.168.1.100:8080/ngsi-ld/v1/entities/urn:ngsi-ld:Device:windmills001/attrs/on", {method : "PATCH"});
    else 
      fetch("http://192.168.1.100:8080/ngsi-ld/v1/entities/urn:ngsi-ld:Device:windmills001/attrs/off", {method : "PATCH"});
    setWindmill(!windmill);
  };

  return (
  <div
    style={{
      position: "absolute",
      top: "52.2%",
      left: "45.9%",
    }}
    onClick={handleDivClick}
    className={`wind-energy-container ${showToggle ? 'expanded' : ''}`}
  >
    {showToggle ? (
    <>
      <div className="toggle-text">Toggle The Wind Turbine</div>
      <button className="toggle-button" onClick={handleButtonClick}>{windmill ? (<>ON</>):(<>OFF</>)}</button>
    </>
    ) : (
    <>
    <div>Generated: <b>{values[1]} kW</b></div>
    <div>Consumed: <b>{values[0]} kW</b></div>
    </>
    )}
  </div>
  );
};


export default WindEnergy;