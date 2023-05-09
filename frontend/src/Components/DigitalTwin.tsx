import "./DigitalTwin.css";
import Parking from "./Widgets/Parking";
import EVCharger from "./Widgets/EVCharger";
import Harbour from "./Widgets/Harbour";
import ProductionClass from "./Widgets/ProductionClass";
import WindEnergy from "./Widgets/WindEnergy";
import Weight from "./Widgets/Weight";

import topview from "../assets/TopView.png"
import AddixTemp from "./Widgets/AddixTemp";

const DigitalTwin = () => {
  return (
    <div className='smartworld-container'>
    <img src={topview} alt='Map of the city'
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
  </div>
  
  )
};

export default DigitalTwin;