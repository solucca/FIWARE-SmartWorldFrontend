import { AreaChart, Card, Col, Flex, Grid, Subtitle, Title } from "@tremor/react";
import { useEffect, useState } from "react";

type IData ={
    date: string,
    Temperature: number,
    Humidity: number,
  }

var chartdata: Array<IData>= [
];

const getWeather = async () => {
  var result = [0,0];
  try 
  {
    var req = await fetch(ENDPOINT+"/ngsi-ld/v1/entities?id=urn:ngsi-ld:WeatherObserved:Basis:1&options=keyValues");
    var data = await req.json();
    data = data[0];
    result = [data.temperature.toFixed(1), (data.relativeHumidity*100).toFixed(1)]
  } catch (error) {
    console.log(`Erro: ${error}`);
  }
  return result

};

const AddixCard = () => {
  const [values, setValue] = useState(chartdata);
  useEffect(() => {
    const intervalId = setInterval(async () => {
      var t = await getWeather();
      var tObj:IData = {
        date: (new Date()).toLocaleTimeString(),
        Temperature: t[0],
        Humidity: t[1],
      }
      if (values.length > 500) {
        values.push(tObj);
        const newValues = values.slice(-500);
        setValue(values => newValues);
      }
      setValue(values => [...values, tObj]);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [values]);

  return (
    <Card decoration="left" 
          decorationColor="blue"
          className="h-80">

      <Flex>
      <Title>Addix Weather:</Title>
      <Subtitle> {values.at(-1)?.Temperature}°C | {values.at(-1)?.Humidity}%</Subtitle>
      </Flex>
      
      <AreaChart
        className="mt-1 h-60"
        data={values}
        index="date"
        categories={["Temperature", "Humidity"]}
        colors={["indigo", "cyan"]}
        showTooltip={false}
        showLegend={true}
      />
    </Card>
  );
}

export default AddixCard;