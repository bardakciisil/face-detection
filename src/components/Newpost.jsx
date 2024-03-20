import{useEffect, useRef, useState} from "react";
import * as faceapi from "face-api.js";

const Newpost = ({image}) => {
    const{url,width,height} = image;
    const[faces,setFaces] = useState([]);
    const[some1s,setSome1] = useState([]);

    const imgRef = useRef();
    const canvasRef=useRef();

    const handleImage = async () =>{
      const detections = await faceapi.detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions());
      setFaces(detections.map((d)=>Object.values(d.box)))
      // .withFaceLandmarks()
      // .withFaceExpressions();

      // canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);
      // faceapi.matchDimensions(canvasRef.current,{
      //   width, height,
      // });
      // const resized = faceapi.resizeResults(detections,{width, height});
      // faceapi.draw.drawDetections(canvasRef.current,resized);
      // faceapi.draw.drawFaceExpressions(canvasRef.current,resized);
      // faceapi.draw.drawFaceLandmarks(canvasRef.current,resized);

    };
    const enter=()=>{
      const ctx = canvasRef.current.getContext("2d");
      ctx.lineWidth = 5
      ctx.strokeStyle = "yellow"
      faces.map((face)=>ctx.strokeRect(...face));
    }


    useEffect(()=>{
        const loadModels = () =>{
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
            
                faceapi.nets.faceExpressionNet.loadFromUri("/models")
            ])
            .then(handleImage)
            .catch((e)=>console.log(e));
        };
        imgRef.current && loadModels();
    },[])

    const addSome1 = (e) =>{
      setSome1(prev=>({...prev,[e.target.name]: e.target.value}));

  }; 
  console.log(some1s)
  return (
    <div className="container">
      <div className="left" style={{width,height}}>
          <img  crossOrigin="anonymous" ref={imgRef} src={url} alt=""/>
          <canvas onMouseEnter={enter} ref={canvasRef} width={width} height={height}/>
          {faces.map((face,i)=>(
          <input 
            name = {`input${i}`}
            style={{left: face[0], top:face[1]+face[3]+5}} 
            placeholder="Tag someone" 
            key={i} 
            className="some1Input"
            onChange={addSome1}
            />))}
      </div>
      <div className="right">
        <h1> What is your new post?</h1>
        <input 
        type="text" 
        placeholder="What is on your mind?" 
        className="rightInput"/>
        {some1s &&(
          <span className="some1s">with<span className="name">{" " + Object.values(some1s) + " "}</span></span>
        )}
        <button className="rightButton">Send</button>
      </div>
    </div>
  )
}

export default Newpost
