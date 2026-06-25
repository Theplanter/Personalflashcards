//this var saves the local item size of the pen to 5
const savedSize = localStorage.getItem('canvasPenSize') || 5;

//all the var that are pulling the IDs from the html code
var canv = document.getElementById("pic");
var slider = document.getElementById("myRange");
var ear = document.getElementById("erase");
var Color = document.getElementById("Picker");
var undo = document.getElementById("undo");
var redo = document.getElementById("redo");
var output = document.getElementById("demo");

/*getcontext is for canvas and 
the 2d is about the canvasrendering of the of the canvas

*/

var ctx = canv.getContext("2d");

//history var is creating an array to capture the canvas 
let historyStack = []
let drawing = false;
let lastX = 0
let lastY = 0

//the linecap determines how the line is going ot look
// so if it was not round it would be a line
ctx.lineCap = 'round'
// this takes the span ID and it updates the html when you move the slider
output.innerHTML = slider.value;
// this is changing the default pen size from 1, to 5
ctx.lineWidth = savedSize;
saveState();

// this function updats the pen color 
// when you change the color on the color picker 
Color.oninput = function(){
  ctx.strokeStyle = this.value;
}
// this function pulls the value from the slider 
// and update the pen size that is drawn on the canvas
slider.oninput = function(){
  ctx.lineWidth = this.value;
  output.innerHTML = this.value;

}


canv.addEventListener('mousedown', (e) => {
    drawing = true;

    lastX = e.offsetX;
    lastY = e.offsetY;


});

canv.addEventListener('mousemove', (e) => {
      if (!drawing) return; // Exit if mouse isn't held down
        //beginPath start a new when you press down on the mouse to draw
        // without it when you click the undo button and draw it redo the changes

        ctx.beginPath();
        ctx.moveTo(lastX, lastY); // Start path at last saved point
        ctx.lineTo(e.offsetX, e.offsetY); // Draw to current mouse point
        ctx.stroke();

        // Update positions for the next frame
        lastX = e.offsetX;
        lastY = e.offsetY;
    });

canv.addEventListener('mouseup', () => {
  //when they mouse is not held down the drawing var gets turned off
  // .
  if(drawing){
    drawing = false;
    //closePath 
    ctx.closePath()
    saveState();
  }
  
});



ear.addEventListener('click', () => {
  //this overwrite the canvas with a new background
  ctx.fillStyle = "aqua";
  ctx.fillRect(0, 0, canv.width, canv.height);
  ctx.beginPath();
  saveState();
})

// the savestate function works any time the is up.
// it captures the canvas when the pen is up 
function saveState(){
  const snap = ctx.getImageData(0, 0, canv.width, canv.height);
    historyStack.push(snap);

}

//clciking hte undo button goes through the array for history and removes the last thing that was input
//and hit shows the last state of the image
undo.addEventListener('click', () => {
  if (historyStack.length>1){
    historyStack.pop();
    const previousState = historyStack[historyStack.length - 1]; // Get the state before it
        ctx.putImageData(previousState, 0, 0);
  }
  else {
        console.log("Nothing left to undo!");
    }

})



