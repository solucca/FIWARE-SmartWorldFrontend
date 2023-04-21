import { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import "./Parking.css";

type MyButtonProps = {};

const getParkingSpaces = async () => {
  const urls = [
    "http://192.168.1.100:8080/v2/entities/urn:ngsi-ld:ParkingSpot:Mobility_Hub:1",
    "http://192.168.1.100:8080/v2/entities/urn:ngsi-ld:ParkingSpot:Mobility_Hub:2",
    "http://192.168.1.100:8080/v2/entities/urn:ngsi-ld:ParkingSpot:Mobility_Hub:3",
    "http://192.168.1.100:8080/v2/entities/urn:ngsi-ld:ParkingSpot:Mobility_Hub:4",
  ];
  const free = [0, 0, 0, 0];
  let freeParkingSpotCount = 0;

  for (const url in urls) {
    try {
      const response = await fetch(urls[url]);
      const jsonData = await response.json();
      if (jsonData["https://uri.etsi.org/ngsi-ld/status"].value == "free") {
        free[url] = 1;
      }
    } catch (error) {
      console.log(`My Error: ${error}`);
    }
  }
  return free;
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
      if (t[0] != last_places[0] || 
          t[1] != last_places[1] || 
          t[2] != last_places[2] || 
          t[3] != last_places[3] ){
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
        left: "49.5%",
      }}
    >
      <button
        className={isAnimating ? "indicator animated" : "indicator"}
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
        type="button"
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
          style={{
            border: "2px solid #5dc0cf",
            outline: "2px solid #5dc0cf",
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: "#e3f9fc",
            width: "200px",
            display: "grid",
          }}
        >
          <div style={{
            display: "flex", 
            alignItems: "center"
          }}>
            <button
              onClick={handleClick}
              type="button"
              className="indicator"
              style={{
                borderRadius: "20%",
                width: "20px",
                height: "20px",
                padding: "0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "0px",
                marginRight: "10px"
              }}
            >
              <AiOutlineClose color="white" size={15} />
            </button>
            <h2 style={{margin: "0"}}>Mobility Hub</h2>
          </div>

          {places ? (
            <div>
              <div
                className={
                  places[0] === 1 ? "text-label free" : "text-label occupied"
                }
              >
                <b>ParkingSpot 1:</b> {places[0] === 1 ? "Free" : "Occupied"}
              </div>
              <div
                className={
                  places[1] === 1 ? "text-label free" : "text-label occupied"
                }
              >
                <b>ParkingSpot 2:</b> {places[1] === 1 ? "Free" : "Occupied"}
              </div>
              <div
                className={
                  places[2] === 1 ? "text-label free" : "text-label occupied"
                }
              >
                <b>ParkingSpot 3:</b> {places[2] === 1 ? "Free" : "Occupied"}
              </div>
              <div
                className={
                  places[3] === 1 ? "text-label free" : "text-label occupied"
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
