import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./Parking.css";
import { Card } from "@tremor/react";


const getParkingSpaces = async () => {
  const url =
    ENDPOINT+"/ngsi-ld/v1/entities?idPattern=.*:ParkingSpot:Mobility_Hub.*&options=keyValues";
  var result = [0, 0, 0, 0]
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.sort((a: {id:string}, b:{id:string})=>{
      if (a.id[-1]>b.id[-1] ) return 1;
      else return -1;
    })
    
    for (var i = 0; i<4; i++) {
      if (jsonData[i]["status"] == "free" || jsonData[i]["status"] == "66726565") 
        result[i] = 1;
      else
        result[i] = 0;
    }
  } catch (error) {
    console.log(`My Error: ${error}`);
  }
  return result;
};

const Parking = () => {
  const [showChildren, setShowChildren] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [places, setPlaces] = useState([0, 0, 0, 0]);
  var last_places = places;

  const handleAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      var t = await getParkingSpaces();
      if (
        t[0] != last_places[0] ||
        t[1] != last_places[1] ||
        t[2] != last_places[2] ||
        t[3] != last_places[3]
      ) {
        handleAnimation();
        last_places = t;
      }
      setPlaces(t);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleClick = () => {
    setShowChildren(!showChildren);
    if (showChildren) {
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "8%",
        left: "75.5%",
      }}
    >
      <button
        className={isAnimating ? "indicator bg-blue-500 animated" : "bg-blue-500 hover:bg-blue-300  indicator"}
        style={{
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0",
          transition: "transform 0.3s ease-in-out",
          transform: showChildren ? "scale(0)" : "scale(1)",
          zIndex: showChildren ? -1 : 1,
        }}
        onClick={handleClick}
      >
        <p className="places-number">
          {places[0] + places[1] + places[2] + places[3]}
        </p>
      </button>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: showChildren ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
          zIndex: showChildren ? 1 : -1,
        }}
      >
        <div
          className="grid w-40 bg-blue-500 hover:bg-blue-400 border-4 border-white p-3 rounded-xl opacity-95"
          onClick={handleClick}
        >
          <h2 className="text-white font-bold text-xl">Mobility Hub</h2>

          {places ? (
            <div className="opacity-100">
              <div
                className={
                  places[0] === 1 ? "text-label text-green-800" : "text-label text-red-800"
                }
              >
                <b>ParkingSpot 1:</b> {places[0] === 1 ? "Free" : "Occupied"}
              </div>
              <div
                className={
                  places[1] === 1 ? "text-label text-green-800" : "text-label text-red-800"
                }
              >
                <b>ParkingSpot 2:</b> {places[1] === 1 ? "Free" : "Occupied"}
              </div>
              <div
                className={
                  places[2] === 1 ? "text-label text-green-800" : "text-label text-red-800"
                }
              >
                <b>ParkingSpot 3:</b> {places[2] === 1 ? "Free" : "Occupied"}
              </div>
              <div
                className={
                  places[3] === 1 ? "text-label text-green-800" : "text-label text-red-800"
                }
              >
                <b>ParkingSpot 4:</b> {places[3] === 1 ? "Free" : "Occupied"}
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Parking;
