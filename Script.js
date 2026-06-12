var canv = document.getElementById("pic");
var ear = document.getElementById("erase");
var ctx = canv.getContext("2d");
let drawing = false;
let lastX = 0
let lastY = 0



ctx.strokeStyle = 'red';
ctx.lineWidth = 5

canv.addEventListener('mousedown', (e) => {
    drawing = true;

    lastX = e.offsetX;
    lastY = e.offsetY;


});

canv.addEventListener('mousemove', (e) => {
      if (!drawing) return; // Exit if mouse isn't held down

      ctx.beginPath();
      ctx.moveTo(lastX, lastY); // Start path at last saved point
      ctx.lineTo(e.offsetX, e.offsetY); // Draw to current mouse point
      ctx.stroke();

      // Update positions for the next frame
      lastX = e.offsetX;
      lastY = e.offsetY;
    });

canv.addEventListener('mouseup', (e) => {
    drawing = false;

});



ear.addEventListener('click', () => {

  ctx.fillStyle = "aqua";
  ctx.fillRect(0, 0, canv.width, canv.height);
ctx.beginPath();
})


