import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {MdDirectionsBoat} from "react-icons/md"
import "./Harbour.css";
const FREE = 0


const getParkingSpaces = async () => {
  const url =
    "http://192.168.1.100:8080/ngsi-ld/v1/entities?idPattern=.*:ParkingSpot:Harbour.*&options=keyValues";
  var result = [FREE, FREE, FREE]
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.sort((a: {id:string}, b:{id:string})=>{
      if (a.id[-1]>b.id[-1] ) return 1;
      else return -1;
    });
    for (var i = 0; i<3; i++) {
      if (jsonData[i].status == "free") 
        result[i] = 1;
      else
        result[i] = 0;
    }
    
  } catch (error) {
    console.log(`My Error: ${error}`);
  }
  return result;
};

const getIcon = (status: number) => {
  if (status == 1) return <MdDirectionsBoat color="white" size={25} opacity={0.3}/>
  else return <MdDirectionsBoat color="white" size={25}/>
};

const Harbour = () => {
  const [showChildren, setShowChildren] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [places, setPlaces] = useState([FREE, FREE, FREE]);
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
        top: "21.5%",
        left: "58.8%",
      }}
    >
      <button
        className={isAnimating ? "indicator animated" : "indicator"}
        style={{
          borderRadius: "10px",
          backgroundColor: "transparent",
          width: "120px",
          height: "42px",
          display: "flex",
          alignItems: "center",
          padding: "0.5em var(--padding-x)",
          transition: "transform 0.3s ease-in-out",
          transform: showChildren ? "scale(0)" : "scale(1)",
          zIndex: showChildren ? -1 : 1,
        }}
        onClick={handleClick}
        type="button"
      >
        <div style={{marginRight:"30px"}}>
          {getIcon(places[0])}
        </div>
        <div style={{marginRight:"15px"}}>
          {getIcon(places[2])}
        </div>
        <div>
          {getIcon(places[1])}
        </div>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
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
                marginRight: "10px",
              }}
            >
              <AiOutlineClose color="white" size={15} />
            </button>
            <h2 style={{ margin: "0" }}>Mobility Hub</h2>
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

export default Harbour;
