import "./DigitalTwin.css";
import {Card, Col, Grid } from "@tremor/react";
import Parking from "./Widgets/Parking";
import EVCharger from "./Widgets/EVCharger";
import Harbour from "./Widgets/Harbour";
import ProductionClass from "./Widgets/ProductionClass";
import WindEnergy from "./Widgets/WindEnergy";
import Weight from "./Widgets/Weight";

import topview from "../assets/TopView.png"
import AddixTemp from "./Widgets/AddixTemp";

import AddixCard from "./Dashboard/AddixCard";
import WindEnergyCard from "./Dashboard/WindEnergyCard";
import ParkingCard from "./Dashboard/ParkingCard";
import CraneCard from "./Dashboard/CraneCard";
import IndustryCard from "./Dashboard/IndustryCard";
import Dokk1 from "./Widgets/Dokk1";

const DigitalTwin = () => {
  return (

      <Grid numColsLg={6} className="gap-4 margin-top-25" style={{marginRight:"25px"}}>
        <Col numColSpanLg={4}>
          <div className='smartworld-container'>
          <img src={topview} alt='Map of the city'
          className="background-image"
          style={{
              maxHeight:"950px",
              margin:0
          }}/>
          <Parking/>
          <EVCharger/>
          <Harbour/>
          <AddixTemp/>
          <ProductionClass/>
          <WindEnergy/>
          <Weight/>
          <Dokk1/>
        </div>
        </Col>
          

        <Col>
          <AddixCard/>
          <ParkingCard/>
          <CraneCard/>
        </Col>
        <Col>
          <WindEnergyCard/>
          <IndustryCard/>
        </Col>
        
      </Grid>
      
  )
};

export default DigitalTwin;