import { BarChart, Callout, Card, Col, Flex, Grid, Metric, Subtitle, Title } from "@tremor/react";
import { useEffect, useState } from "react";
import { AiOutlineExclamation, AiOutlineCheck } from "react-icons/ai";

type IData ={
  type: string,
  Power: number,
}

var _chartdata: Array<IData>= [
];

const getPower = async () => {
  var result = [-1,-1];
  try 
  {
    var req1 = await fetch(ENDPOINT+"/ngsi-ld/v1/entities?id=urn:ngsi-ld:EnergyConsumer:Wind_Energy:1&options=keyValues");
    var req2 = await fetch(ENDPOINT+"/ngsi-ld/v1/entities?id=urn:ngsi-ld:GreenEnergyGenerator:Wind_Energy:1&options=keyValues");
    var data1 = await req1.json();
    var data2 = await req2.json();
    var consumer = data1[0]["p"];
    var generator = data2[0]["maxEolicPowerGenerated"];

    result = [consumer.toFixed(1), generator.toFixed(1)]
  } catch (error) {
    console.log(`Erro: ${error}`);
  }
  return result

};


const WindEnergyCard = () => {
  const [chartdata, setData] = useState<Array<IData>>(_chartdata);
  const [consumed, setConsumed] = useState(-1);
  const [generated, setGenerated] = useState(-1);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      var [cons, gene] = await getPower();
      setData(value => [
        {type: "Generated",Power: gene},
        {type: "Consumed", Power:cons}])
      setConsumed(cons);
      setGenerated(gene);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [chartdata]);
  return(
  <Card decoration="left" decorationColor="blue">
    <Title>Wind Energy Production:</Title>

      <Subtitle>Generated:</Subtitle>
      <Metric>{generated}kW</Metric>
      <div style={{marginTop:"-25px", marginBottom:"10px"}}>
        <Flex justifyContent="end"><Subtitle>Consumed:</Subtitle></Flex>
        <Flex justifyContent="end"><Metric>{consumed}kW</Metric></Flex>
      </div>
      
      <BarChart
      data={chartdata}
      showLegend={false}
      index="type"
      categories={["Power"]}
      colors={['indigo']}/>

      {
      generated > consumed ? 
      <Callout 
        title="Filling hydrogen reserves"
        icon={AiOutlineCheck}
        color="green">
        Using excess power to refill the hydrogen reserves
      </Callout>
      : 
      <Callout 
        title="Using Hydrogen reserves"
        icon={AiOutlineExclamation}
        color="yellow">
        Using stored hydrogen to generate power
      </Callout>
      }
  </Card>
  );
}

export default WindEnergyCard;