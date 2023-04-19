import { useState, useEffect } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import {AiOutlineClose} from 'react-icons/ai'
import './Parking.css'

type MyButtonProps = {
};

const Parking = () => {
  const [showChildren, setShowChildren] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
        fetch('http://localhost:8080/v2/entities/urn:ngsi-ld:ParkingSpot:Mobility_Hub:1')
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            setData(json);
            handleAnimation();
        })
        .catch(error => console.log(error));
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleClick = () => {
    setShowChildren(!showChildren);
    if (showChildren){
        
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <button
        className={isAnimating ? 'animated-button' : ''}
        style={{
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display:'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0',
            transition: 'transform 0.3s ease-in-out',
            transform: showChildren ? 'scale(0)' : 'scale(1)',
            zIndex: showChildren ? -1 : 1,
        }}
        onClick={handleClick}
        type="button"
      >
        <FaInfoCircle color="white" size={25}/>
      </button>

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: showChildren ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          zIndex: showChildren ? 1 : -1,
        }}
      >
        <div
          style={{
            border: '2px solid #5dc0cf',
            outline: '2px solid #5dc0cf',
            padding: '10px',
            borderRadius: '10px',
            width: '400px'
          }}
        >
            <button onClick={handleClick} type="button"
                    style={{
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        padding: "0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "0px"
                    }}>
                <AiOutlineClose color="white" size={20} />
            </button>
            {data ? (
            <div>
                <p>Title: {data.id}</p>
                <p>Body: {data['https://uri.etsi.org/ngsi-ld/status'].value }</p>
            </div>
            ) : (
            <p>Loading...</p>
            )}
        </div>
        
        
      </div>
    </div>
  );
};

export default Parking;
