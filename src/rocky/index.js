var rocky = require("rocky");

rocky.on("minutechange", function(event) {
  rocky.requestDraw();
  
  console.log("Minute has passed " + event);
});


// rocky.on("secondchange", function(event) {
//   rocky.requestDraw();
//   console.log("Second has passed " + event);
// });


rocky.on("draw", function(event) {
  // grab 2D
  var ctx = event.context;
  var w = ctx.canvas.clientWidth;
  var h = ctx.canvas.clientHeight;  
  
  // clear screen
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, w, h);
  
  // center
  var cx = w / 2;
  var cy = h / 2;
  
  // max length (10 px padding inset on both side)
  var maxLength = (Math.min(w, h) - 40) / 2;
  
  var d = new Date();
  
  // draw seconds
//   var secs = d.getSeconds();
//   var fraction = secs / 60;
//   drawHand(ctx, cx, cy, fractionToRadian(fraction), maxLength, 1, 'black');
  
  // draw minutes
  var minutes = d.getMinutes();
  var fraction = minutes / 60;
  drawHand(ctx, cx, cy, fractionToRadian(fraction), maxLength, 3, 'black');
  
  // draw hours
  var hours = d.getHours();
  fraction = ((hours % 12) + fraction) / 12;
  drawHand(ctx, cx, cy, fractionToRadian(fraction), maxLength * 0.6, 5, 'black');
  
  // draw day
  var str = dayToDateStr(d.getDay()) + " " + d.getDate();
  var metrics = ctx.measureText(str);
  ctx.fillStyle = 'black';
  ctx.fillText(str, w - metrics.width - 10, (h / 2) - (metrics.height / 2), w);
});

// ANALOG
function fractionToRadian(fraction) {
  return fraction * 2 * Math.PI; 
}

function drawHand(ctx, cx, cy, angle, length, width, color) {
  // find end points
  var x = cx + Math.sin(angle) * length;
  var y = cy - Math.cos(angle) * length;
  
  // set ctx
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  
  // draw
  ctx.beginPath();
  
  ctx.moveTo(cx, cy);
  ctx.lineTo(x, y);
  
  ctx.stroke();
}

function dayToDateStr(day) {
  switch(day) {
    case 1: return "MON";
    case 2: return "TUE";
    case 3: return "WED";
    case 4: return "THU";
    case 5: return "FRI";
    case 6: return "SAT";
    case 7: return "SUN";
  }
}

// DIGITAL
// function digital(ctx) {
  // dimensions
//   var width = ctx.canvas.clientWidth;
//   var height = ctx.canvas.clientHeight;
//   var w = ctx.canvas.unobstructedWidth;
//   var h = ctx.canvas.unobstructedHeight;
  
//   console.log(width + "x" + height);
//   console.log(w + "x" + h);
  
//   //clear screen
//   ctx.clearRect(0, 0, width, height);
  
//   // date
//   var d = new Date();

//   // styling
//   ctx.fillStyle = 'white';
//   ctx.fontStyle = '21px Roboto';
  
//   ctx.fillText(d.toLocaleTimeString(), w / 2, h / 2, w);
  
//   var message = "HI STEVEN!";
//   if (d.getSeconds() % 2 == 0) {
    
//     //if ( (d.getTime() / 1000) % 2 == 0) {
//     ctx.textAlign = 'left';
//     message = "HI STEPH!";
//   } else {
//     ctx.textAlign = 'right';
//   }
  
//   ctx.fillText(message, w / 2, (h / 2) - 30, w);  
// }