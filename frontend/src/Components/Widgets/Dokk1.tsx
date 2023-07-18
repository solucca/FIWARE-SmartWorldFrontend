import { useState, useEffect } from "react";

const getPlaces = async () => {
  const url = ENDPOINT+"/ngsi-ld/v1/entities?id=urn:ngsi-ld:OffStreetParking:Dokk1:1&options=keyValues"
  var res = await fetch(url)
  var data = await res.json()
  return data[0]["availableSpotNumber"]
}

const Dokk1 = () => {
  const [values, setValue] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      var t = await getPlaces();
      setValue(t);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
    style={{
      position: "absolute",
      top: "17.5%",
      left: "18.3%",
    }}
  >
    <div className="bg-blue-500 rounded p-1 text-white font-bold opacity-90">
      <p className="text-2xl">{values}</p>
    </div>
  </div>);
}

export default Dokk1;