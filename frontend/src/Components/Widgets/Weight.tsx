import { useState, useEffect } from "react";

const getWeight = async () => {
    var result = [0, 0];
    try {
        var response = await fetch("http://192.168.1.100:8080/ngsi-ld/v1/entities?id=urn:ngsi-ld:Device:weight001&options=keyValues");
        var data = await response.json();
        var weight = data[0]["weight"];
        var price = data[0]["price"];
        result = [weight, price];
    } catch (error) {
        console.log(`Error: ${error}`);
    }
    return result;
};

const Weight = () => {
    const [values, setValue] = useState([-1,-1]);
    useEffect(() => {
        const intervalId = setInterval(async () => {
          var t = await getWeight();
          setValue(t);
        }, 1000);
    
        return () => clearInterval(intervalId);
      }, []);

    return (
    <div
    style={{
        position: "absolute",
        top: "78.9%",
        left: "5.9%",
      }}
      className="bg-blue-500 rounded p-1 text-white font-bold opacity-90">
       <p className="weight-indicator">Weight: <b>{values[0]} t</b></p>
       <p className="weight-indicator">Price: <b>{values[1]} €/h</b></p>
    </div>);
}

export default Weight;