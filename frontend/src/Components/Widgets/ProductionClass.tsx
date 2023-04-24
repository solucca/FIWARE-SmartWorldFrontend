import { useEffect, useState } from "react";
import "./ProductionClass.css"

const getWeather = async () => {
  var result = [0,0];
  try 
  {
    var req = await fetch("http://192.168.1.100:8080/ngsi-ld/v1/entities?id=urn:ngsi-ld:WeatherObserved:Basis:2&options=keyValues");
    var data = await req.json();
    data = data[0];
    result = [data.temperature.toFixed(1), (data.relativeHumidity*100)]
  } catch (error) {
    console.log(`Erro: ${error}`);
  }
  return result

};

const ProductionClass = () => {
  const [values, setValue] = useState([0,0]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      var t = await getWeather();
      setValue(t);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
  <div
    style={{
      position: "absolute",
      top: "68.2%",
      left: "22.7%",
    }}
  >
    <div className="container">
      <p className="text">{values[0]} °C</p>
      <p className="text">{values[1]} %</p>
    </div>
  </div>)
};

export default ProductionClass;