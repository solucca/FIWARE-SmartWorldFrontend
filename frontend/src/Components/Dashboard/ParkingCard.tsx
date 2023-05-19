import { BarList, Card, Subtitle, Title } from "@tremor/react";
import { useEffect, useState } from "react";


type IData = {
  name: string,
  value: number
}

const getPlaces = async () => {
  var result = [0,0];
  try 
  {
    var req = await fetch("http://192.168.1.100:8080/ngsi-ld/v1/entities/?type=ParkingSpot&options=keyValues");
    var data = await req.json();
    
    result = [
      data.filter((x: { id: string; status: string; }) => x.id.includes("Harbour") && x.status=='free').length,
      data.filter((x: { id: string; status: string; }) => x.id.includes("Mobility_Hub") && x.status=='free').length,
    ]
  } catch (error) {
    console.log(`Erro: ${error}`);
  }
  return result 
};

const ParkingCard = () => {
  const [data, setData] = useState<Array<IData>>([]);
  const [harbour, setHarbour] = useState(-1);
  const [dokk, setDokk] = useState(-1);
  const [parking, setParking] = useState(-1);


  useEffect(() => {
    const intervalId = setInterval(async () => {
      var [harbour, mobility] = await getPlaces();
      harbour = Math.round((harbour/3)*100)
      mobility = Math.round((mobility/4)*100)
      setHarbour(harbour);
      setParking(mobility);
      setData([
        {name:"Mobility", value:mobility}, 
        {name:"Harbour",value:harbour},
        {name:"Dokk1", value:87}
      ])
      
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);


  return (
  <Card className="margin-top-25" decoration="left">
    <Title>Parking:</Title>
    <Subtitle>Occupation of parking places</Subtitle>
    <BarList data={data}/>
  </Card>
  );
};

export default ParkingCard;