import React, {useState, useEffect, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GrFormClose } from 'react-icons/gr';
import { SketchPicker} from 'react-color';
// import context from 'react-bootstrap/esm/AccordionContext';

//import context from 'react-bootstrap/esm/AccordionContext';
import reactDom from 'react-dom';
//import context from 'react-bootstrap/esm/AccordionContext';




function Modal({selectedImg, setSelectedImg}) {
    
    
  const [image, setimage] = useState(null);
  const canvas = useRef(null);
  const [topText, setTopText] = useState(" ");
  const [bottomText, setBottomText] = useState(" ");
  const [fontSize, setFontSize] = useState(30);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [color, setColor] = useState("");
//   const contextRef = useRef({topText});
//   const [isDrawing, setIsDrawing] = useState(false);
  const [xAxis, setxAxis] = useState(200);
  const [xAxisB, setxAxisB] = useState(200);
  const [yAxis, setyAxis] = useState(100);
  const [yAxisB, setyAxisB] = useState(350);
  const [lengthText, setlengthText] = useState();
  const [lengthTextB, setlengthTextB] = useState();
  const [draggable, setDraggable] = useState(false);
  const [isTarget, setIsTarget] = useState(false);
 const [isDown, setisDown] = useState(false)

 const [text, settext] = useState(topText, xAxis, yAxis);
 const [dragTarget, setdragTarget] = useState();


//   const [isTopDragging, setIsTopDragging] = useState(false);
//   const [isBottomDragging, setIsBottomDragging] = useState(false);
//    const [topY, setTopY] = useState("10%");
//    const [topX, setTopX] = useState("50%");
//   const [bottomY, setBottomY] = useState("90%");
//   const [bottomX, setBottomX] = useState("50%");

const boxes = [
   {name: topText, x: xAxis, y: yAxis},
    {name: bottomText, x: xAxisB, y:yAxisB}
]





    

    const closeModal = (e) => {
        // only closes on backdrop and not when clicking on image
        if(e.target.classList.contains('close' )){
            setSelectedImg(null)}
        }

    
        

    useEffect(() => {
        const memeImage = new Image();
       
        memeImage.src = selectedImg;
        
        memeImage.onload = ()=>setimage(memeImage)
        
        
    }, )

    
  
    
    useEffect(() => {
        const ctx= canvas.current.getContext('2d');
        if(image && canvas){
         
       
            ctx.canvas.height=image.height;
            ctx.canvas.width=image.width;
           ctx.drawImage(image, 0, 0, image.width, image.height);
           


         }
         ctx.fillStyle=color;
           ctx.font=fontSize + 'px ' + fontFamily;
           ctx.fillText(topText, xAxis, yAxis);
           ctx.fillText(bottomText, xAxisB, yAxisB);
        //    console.log(context.measureText(topText).width);
           
           setlengthText( ctx.measureText(topText).width);
           setlengthTextB( ctx.measureText(bottomText).width);
    }, )
   
    useEffect(() => {
        draw();
      }, []);

    const draw = () => {
        const ctx= canvas.current.getContext('2d');
        
        drawFillRect(text);
      }

    const drawFillRect = (text) => {
        const ctx= canvas.current.getContext('2d');
        ctx.fillText(topText, xAxis, yAxis);
      }


    const hitText = (x, y) => {
        setIsTarget(null);
        for (let i = 0; i < boxes.length; i++) {
            const box = boxes[i];
        if ((x > box.x) && (x < (box.x + lengthText)) && (y > (box.y - fontSize)) && (y < (box.y + fontSize))) {
            //dragTarget({text})
            setIsTarget(true)
            break;
        }
        }
        return isTarget;
    }
    
    

    const handleMouseDown = (e) =>{
       let intx =(parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft));
       let inty = (parseInt(e.nativeEvent.offsetY - canvas.current.clientTop));
       setxAxis(intx)
       setyAxis(inty)
        setisDown(hitText(xAxis, yAxis)) 
  }
        // const offsetX = e.nativeEvent.offsetX;
        // const offsetY = e.nativeEvent.offsetY;
       
        // if ( (offsetX > xAxis) && (offsetX < (xAxis + lengthText)) && (offsetY > (yAxis - fontSize)) && (offsetY < (yAxis + fontSize))
        //     ) {
        //     setDraggable(true);
        //      document.addEventListener('mousemove', (e) => handleOnMouseMove(e,offsetX, offsetY))
        //         console.log(draggable, 'mine')
            
        // }
        // else{
        //     console.log('not click')
        // }
        
    
   
    
    const handleMouseMove = (e) =>{ 

        if (!isDown) return;
        let mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
        let mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
        const dx = mouseX - xAxis;
        const dy = mouseY - yAxis;
        xAxis(mouseX);
        yAxis(mouseY);
        dragTarget.x += dx;
        dragTarget.y += dy;
        draw();
      }   
        

      const handleMouseUp = e => {
        setdragTarget(null);
        setisDown(false);
      }
      const handleMouseOut = e => {
        handleMouseUp(e);
      }
    //     console.log('moi')
        

    //    if ( {topText} && draggable) {
            
    //         setxAxis(offsetX);
    //         setyAxis(offsetY);
            
    //    }
  
        
    
    
    

    const handleOnMouseUp = () => {
        
        setDraggable(false);
        
        
    }


    return (
        <div className="backdrop close" onClick={closeModal}>
            <div id="myModal" className="modal fade" role="dialog"></div>
            <div className="model-dialog ">
            <div className="modal-content">
                <div className="modal-header">
                    Make your own Meme
                    <button type="button" className="close " onClick={closeModal}data-dismiss="modal"  aria-label="Close"  >  <GrFormClose  className="close" /></button>
                     
                </div>
                <div className="modal-body" >
                    <div className="row">
                    <div className="draggable col-lg-12 col-xs-12 col-md-12">
                        <canvas name="canvas" id="canvas"
                        
                         ref={canvas} width={350} height={500}
                       
                         onMouseDown={handleMouseDown}
                         onMouseMove={handleMouseMove}
                         onMouseUp={handleMouseUp}
                         onMouseOut={handleMouseOut} 

                        //  onMouseMove={handleOnMouseMove}
                         
                         
                        //  onMouseMove={event => handleMouseDown(event, topText)}
                         
                         >
               
                         </canvas>
                        {/* <img src={selectedImg} alt={selectedImg.alt} /> */}
                    </div>
                    <div className="meme-color col-lg-4 col-xs-4 col-md-4">
                        
                        <SketchPicker 
                            color={color}
                            onChangeComplete={ (color) => {setColor(color.hex)}}
                        
                        />
                        </div>
                        <div className="col-lg-6 col-xs-6 col-md-6">
                            <h2 align="center">Input text and style it !</h2>
                        {/* <button onClick={handleDownload}></button> */}
                            <form>
                            <label htmlFor="upper text" >Top text:</label>
                            <input 
                            id="text"
                            type="topText" className="top-text" placeholder="Enter top text"
                            value={topText}
                            onChange= {(e) => setTopText(e.target.value)} 
                            
                            // onMouseDown={event => handleMouseDown(event, topText)}
                            // onMouseUp={event => handleMouseUp(event, topText)}
                            // x={this.state.topX}
                            // y={this.state.topY} 
                            />
                            <br />
                            <label htmlFor="lower text"  >Bottom Text</label>
                            <input id="text" type="bottomText" className="bottom-text" placeholder="Enter bottom text"
                            value={bottomText}
                            onChange= {(e) => setBottomText(e.target.value)} 
                            

                              />
                            
                            
                          
                             <br />
                             {/* user input font size */}
                             <label htmlFor="font size"  >Font Size </label>
                             <input type="number" className="font-size" placeholder="30" 
                            value={fontSize}
                            onChange= {e => setFontSize(e.target.value)}
                              />

                              <br />

                              <label htmlFor="font family"  >Font type </label><br />
                            
                            <input type="radio" name="font-family" className="font-family" 
                            value="Comic Sans MS"
                            onChange= {e => setFontFamily(e.target.value)} 
                                />Comic Sans MS
                            < br /> 
                                
                            <input type="radio" name="font-family" className="font-family" 
                            value="Arial" 
                            onChange= {e => setFontFamily(e.target.value)}
                                />Arial
                            < br /> 
                            <input type="radio" name="font-family" className="font-family" 
                            value="Pacifico"
                            onChange= {e => setFontFamily(e.target.value)}
                                />Pacifico
                            < br /> 
                            
                          
                          
                        </form>
                        
                    </div>
                    </div>
                </div>
            
            </div>
            
        </div>
        </div>
       
    )
}

export default Modal

