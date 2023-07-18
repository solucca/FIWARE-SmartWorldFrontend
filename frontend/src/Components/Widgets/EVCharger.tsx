import { useState, useEffect } from "react";
import { 
  MdBattery0Bar, 
  MdBattery1Bar,
  MdBattery2Bar,
  MdBattery3Bar,
  MdBattery4Bar,
  MdBattery5Bar,
  MdBattery6Bar,
  MdBatteryStd,
  MdOutlineElectricCar
} from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import "./EVCharger.css";
const FREE = 0


const getChargingTime = async () => {
  const url = ENDPOINT+"/ngsi-ld/v1/entities?type=EVChargingStation&options=keyValues";
  var result = [FREE, FREE]
  var jsonData;
  try {
    const response = await fetch(url);
    jsonData = await response.json();
    
    jsonData.sort((a: {id:string}, b:{id:string})=>{
      if (a.id[-1]>b.id[-1] ) return 1;
      else return -1;
    })

    for (var i = 0; i < 4; i++) {
      if (jsonData == undefined) continue;
      result[i] = jsonData[i].levelOfCharging;
    }

  } catch (error) {
    //console.log(`My Error: ${error}`);
  }
  return result;
};


const getIcon = (charge: number) => {
  if (charge < 10) return <MdOutlineElectricCar 
                                color="white" size={28} style={{marginTop:"5px"}}/>
  if (charge <  20) return  <MdBattery0Bar color="white" size={28}/>
  if (charge <  30) return  <MdBattery1Bar color="white" size={28}/>  // 000   10
  if (charge <  40) return  <MdBattery1Bar color="white" size={28}/>  // 015   20
  if (charge <  50) return  <MdBattery2Bar color="white" size={28}/>  // 030   30
  if (charge <  60) return  <MdBattery3Bar color="white" size={28}/>  // 030   30
  if (charge <  70) return  <MdBattery4Bar color="white" size={28}/>  // 050   40
  if (charge <  75) return  <MdBattery5Bar color="white" size={28}/>  // 045   50
  if (charge <  80) return  <MdBattery6Bar color="white" size={28}/>  // 045   50
  if (charge <  90) return  <MdBattery6Bar color="white" size={28}/>  // 075   60
  if (charge < 100) return <MdBatteryStd color="white" size={28}/>  // 100   100
}


const EVCharger = () => {
  const [showChildren, setShowChildren] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [places, setPlaces] = useState([FREE, FREE]);
  var last_places = places;

  const handleAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      var t = await getChargingTime();
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
        top: "20.3%",
        left: "74.8%",
      }}
    >
      <button
        className={isAnimating ? "grid w-40 bg-blue-500 hover:bg-blue-400 border-4 border-white p-3 rounded-xl opacity-95 animated" : "grid w-40 bg-blue-500 hover:bg-blue-400 border-4 border-white p-3 rounded-xl opacity-95"}
        style={{
          borderRadius: "10px",
          width: "80px",
          height: "42px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0.5em var(--padding-x)",
          transition: "transform 0.3s ease-in-out",
          transform: showChildren ? "scale(0)" : "scale(1)",
          zIndex: showChildren ? -1 : 1,
        }}
      >
        <div style={{marginRight:"5px"}}>
          {getIcon(places[1])}
        </div>
        <div>
          {getIcon(places[0])}
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

export default EVCharger;
