function toString(date) {
	arr = v.split(date.toString(), /\s/);
	console.log(arr);
	str = arr[4] + "\n" + arr[0] + " " + arr[1] + " " + arr[2] + ", " + arr[3]
	return str;//v.sprintf('%s\r%s %s %s, %s', arr[4], arr[0], arr[1], arr[2], arr[3]);	
}

function _draw(ctx, x, y, r, r2, v, t, loop) {
		ctx.fillStyle = loop?"red":"blue";
		ctx.beginPath();
		ctx.arc(x,y,r,0,Math.PI*2, false); // outer (filled)
		ctx.arc(x,y,r2,0,Math.PI*2, false); // outer (unfills it)
		ctx.fill();
		
		ctx.fillStyle = loop?"blue":"red";
		ctx.beginPath();
		ctx.arc(x,y,r,0,((v*t)*Math.PI)/180, 0,false); // outer (filled)
		ctx.arc(x,y,r2,((v*t)*Math.PI)/180,Math.PI*2, false); // outer (unfills it)
		ctx.fill()	
}
var loop1 = true, loop2 = true, loop3 = true, loop2set=false, loop1set=false;
function draw() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.lineWidth = 50;
    ctx.font = "20px Arial";
    var date = new Date();
	var seconds = date.getSeconds();
	var minutes = date.getMinutes();
	var hours = date.getHours();
	var x, y, r, r2, loop;
	
    if (seconds == 0) 
		loop3 = !loop3;
	if (minutes == 0 &&  !loop2set) {
		loop2 = !loop2;
        loop2set = true;
    } else if (minutes != 0 && loop2set) {
        loop2set = false;
    }
	if (hours == 0 &&  !loop1set) {
		loop1 = !loop1;
        loop1set = true;
    } else if (hours != 0 && loop1set) {
        loop1set = false;
    } 
	x = 250;
	y = 250;
	r = 250;
	r2 = 200;
	loop = loop1;
	_draw(ctx, x, y, r, r2, hours, 15, loop);
	
	r = 200;
	r2 = 150;
	loop = loop2;
	_draw(ctx, x, y, r, r2, minutes, 6, loop);

	r = 150;
	r2 = 100;
	loop = loop3;
	_draw(ctx, x, y, r, r2, seconds, 6, loop);
		
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x,y,r2,0,Math.PI*2, false); // outer (unfills it)
    ctx.fill()
	
    //ctx.fillRect(32+(x-50), 32+(y-50), 37, 30);
    ctx.fillStyle = '#000000'; // or whatever color the text should be.	
    //ctx.fillText(, 35+(x-50), 55+(y-50));
    
	var x = 175;
	var y = 45+(y-50);
	var lineheight = 20;
	var lines = toString(date).split('\n');

	for (var i = 0; i<lines.length; i++)
		ctx.fillText(lines[i], x, y + (i*lineheight) );

	setTimeout(function(){draw()}, 1000);
    
}