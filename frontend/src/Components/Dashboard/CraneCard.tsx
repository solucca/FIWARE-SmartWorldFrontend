import { BadgeDelta, Button, Card, Flex, Metric, Title } from "@tremor/react";
import { useEffect, useState } from "react";

const getCost = async () => {
  var result = -1;
  try {
      var response = await fetch("http://192.168.1.100:8080/ngsi-ld/v1/entities?id=urn:ngsi-ld:Device:weight001&options=keyValues");
      var data = await response.json();
      result = data[0]["price"];
  } catch (error) {
      console.log(`Error: ${error}`);
  }
  return result;
};

const CraneCard = () => {
  const [cost, setCost] = useState(0);
  const [tarif, setTarif] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      var t = await getCost();
      setCost(value => value + t/60)
      setTarif(t);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  
  return (
    <Card className="margin-top-25" decoration="left">
      <Flex justifyContent="between" alignItems="center">
        <Title>Crane cost:</Title>
        <BadgeDelta
          deltaType={tarif < 10 ? "moderateIncrease" : "increase"}
          isIncreasePositive={true}
          size="lg"
        >{tarif}€/h</BadgeDelta>
      </Flex>
      <Flex justifyContent="between" alignItems="center">
        <Metric>{cost.toFixed(2)}€</Metric>
      </Flex>
      
    </Card>
  );
};

export default CraneCard;