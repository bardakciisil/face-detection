import{useEffect, useRef} from "react";
import * as faceapi from "face-api.js"
import "./App.css";

const App = () => {
    const imgRef = useRef();
    const canvasRef=useRef();

    useEffect(()=>{
        const loadModels = () =>{
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                faceapi.nets.faceRecognationNet.loadFromUri("/models"),
                faceapi.nets.faceExpressionNet.loadFromUri("/models")
            ])
            .then(console.log("ok its done"))
            .catch((e)=>console.log(e));
        };
        imgRef.current && loadModels();
    },[])
  return (
    <div className="App">
      <img 
      ref={imgRef}
      src="https://i.ibb.co/3v1rf3R/Resim-001.jpg"
      alt=""
      width="940"
      height="650"/>
      <canvas ref={canvasRef} width="940" height="650"/>
    </div>
    
  )
}

export default App
