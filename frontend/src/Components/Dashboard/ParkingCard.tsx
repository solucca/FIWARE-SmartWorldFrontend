import { BarList, Card, Subtitle, Title } from "@tremor/react";
import { useEffect, useState } from "react";


type IData = {
  name: string,
  value: number
}

const getDokk1 = async () => {
  const url = ENDPOINT+"/ngsi-ld/v1/entities?id=urn:ngsi-ld:OffStreetParking:Dokk1:1&options=keyValues"
  var res = await fetch(url)
  var data = await res.json()
  return data[0]["availableSpotNumber"]
}

const getPlaces = async () => {
  var result = [0,0];
  try 
  {
    var req = await fetch(ENDPOINT+"/ngsi-ld/v1/entities/?type=ParkingSpot&options=keyValues");
    var data = await req.json();
    
    result = [
      data.filter((x: { id: string; status: string; }) => x.id.includes("Harbour") && (x.status=='free' || x.status=="66726565")).length,
      data.filter((x: { id: string; status: string; }) => x.id.includes("Mobility_Hub") && (x.status=='free' || x.status=="66726565")).length,
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
      var dokk1 = await getDokk1();
      harbour = Math.round((harbour/3)*100);
      mobility = Math.round((mobility/4)*100);
      dokk1 = Math.round((dokk1/10));
      setHarbour(harbour);
      setParking(mobility);
      setDokk(dokk1);
      setData([
        {name:"Mobility", value:mobility}, 
        {name:"Harbour",value:harbour},
        {name:"Dokk1", value:dokk1}
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