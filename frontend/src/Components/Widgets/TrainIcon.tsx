import { useEffect, useState } from "react";
import "./TrainIcon.css";

const sendSpeed =async (speed:number) => {
  await fetch( ENDPOINT+"/ngsi-ld/v1/entities/urn:ngsi-ld:Device:train001/attrs/setspeed",
    {method : "PATCH", body:JSON.stringify( { type: "Property",  value: speed} ) });
}

const getPositionSpeed = async () => {
  var result = [0, 0];
  try {
    var req = await fetch(
      ENDPOINT +
        "/ngsi-ld/v1/entities?id=urn:ngsi-ld:Device:train001&options=keyValues"
    );
    var data = await req.json();
    result = [data[0].position, data[0].speed];
  } catch (error) {
    console.log(`Erro: ${error}`);
  }
  return result;
};

const path = [
  [40, 350],
  [250, 57],
  [520, 57],
  [620, 190],
  [620, 960],
  [430, 1165],
  [150, 1165],
  [40, 1035],
  [40, 650]
];

const TrainIcon = () => {
  const [position, setPosition] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      var t = await getPositionSpeed();
      var p = t[0]%path.length;
      var s = t[1];
      setPosition(p);
      console.log(`p: ${p}`);
      console.log(`Position: ${position}`)
      
      // Here we will set some logic. When the train gets to platform in location
      // x it will stop for y seconds
      if (p == 0 && position != 0) {
        console.log(`Stopping!`)
        await sendSpeed(0);
        setTimeout( function() {sendSpeed(s); console.log(`Moving: ${s}`);}, 10000);
      }
    }, 1000, );

    return () => clearInterval(intervalId);
  }, [position]);

  const handleClick = () => {
    console.log("Setting Speed to 40%")
    sendSpeed(40);
  };

  return (
    <div
      className="circle bg-blue-500"
      style={{
        top: `${path[position][0]}px`,
        left: `${path[position][1]}px`,
      }}
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="42"
        height="42"
        viewBox="0 0 48 48"
      >
        <path d="M8 31c0 3.87 3.14 7 7 7l-3 3v1h24v-1l-3-3c3.87 0 7-3.13 7-7v-21c0-7-7.16-8-16-8s-16 1-16 8v21zm16 3c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm12-14h-24v-10h24v10z" 
          stroke="white"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default TrainIcon;
