import { Card, Col, Flex, Grid, Title } from "@tremor/react";
import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Slider,
  SliderThumb,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const VerticalSlider = styled(Slider)({
  color: "bg-blue-500",
  height: "100%",
  width: "16px",
  "& .MuiSlider-rail": {
    innerHeight: "200px",
  },
  "& .MuiSlider-markLabel": {
    left: "50px",
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 40,
    width: 40,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" component="div" color="text.secondary">{`${(
          (props.value * 20) /
          100
        ).toFixed(1)} km/h`}</Typography>
      </Box>
    </Box>
  );
}

const getSpeedPosition = async () => {
  var result = [0, 0];
  try {
    var req = await fetch(
      ENDPOINT +
        "/ngsi-ld/v1/entities?id=urn:ngsi-ld:Device:train001&options=keyValues"
    );
    var data = await req.json();
    data = data[0];
    result = [data.speed, data.position];
  } catch (error) {
    console.log(`Erro: ${error}`);
  }
  return result;
};

const sendSpeed =async (speed:number) => {
  await fetch( ENDPOINT+"/ngsi-ld/v1/entities/urn:ngsi-ld:Device:train001/attrs/setspeed",
    {method : "PATCH", body:JSON.stringify( { type: "Property",  value: speed} ) });
}

const marks = [
  {
    value: 0,
    label: "00%",
  },
  {
    value: 10,
    label: "10%",
  },
  {
    value: 20,
    label: "20%",
  },
  {
    value: 30,
    label: "30%",
  },
  {
    value: 40,
    label: "40%",
  },
  {
    value: 50,
    label: "50%",
  },
  {
    value: 60,
    label: "60%",
  },
];

const TrainControl = () => {
  const [position, setPosition] = useState(0);
  const [speed, setSpeed] = useState(0);

  const handleSliderChange = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    if (typeof value === "number") {
      sendSpeed(value);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      var t = await getSpeedPosition();
      setSpeed(t[0]);
      setPosition(t[1]);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Grid
      numColsLg={5}
      className="gap-6 margin-top-25"
      style={{ height: "80%", width: "100%" }}
    >
      <Col numColSpanLg={1} style={{ marginLeft: "80px" }}>
        <Card
          style={{ height: "100%", paddingBottom: "50px" }}
          decoration="left"
          decorationColor="blue"
        >
          <Stack style={{ height: "100%" }} spacing={5} alignItems="center">
            <h1>Controller:</h1>
            <VerticalSlider
              size="medium"
              orientation="vertical"
              onChange={handleSliderChange}
              step={10}
              marks={marks}
              min={0}
              max={60}
              defaultValue={0}
            />
          </Stack>
        </Card>
      </Col>

      <Col numColSpanLg={2}>
        <Col>
          <Card decoration="left" decorationColor="blue">
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <h1>Speed:</h1>
              <CircularProgressWithLabel
                variant="determinate"
                size={300}
                value={(speed * 100) / 60}
                style={{ rotate: "180deg" }}
                color="info"
              />
            </Stack>
          </Card>
          <Card
            className="margin-top-25"
            decoration="left"
            decorationColor="blue"
          >
            <Stack direction="column" spacing={2}>
              <Typography variant="h2" textAlign="start">
                Next Station:
              </Typography>
              <Typography variant="h4" textAlign={"end"} fontStyle="italic">
                {position}
              </Typography>
            </Stack>
          </Card>
        </Col>
      </Col>
    </Grid>
  );
};

export default TrainControl;
