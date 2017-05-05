var canvas, ctx, loop1 = true, loop2 = true, loop3 = true, loop2set=false, loop1set=false;
canvas = $("#canvas")[0];
ctx = canvas.getContext("2d");
ctx.lineWidth = 50;
ctx.font = "20px Arial";
function toString(date) {
	arr = v.split(date.toString(), /\s/);
	return v.sprintf('%s\n%s %s %s, %s', arr[4], arr[0], arr[1], arr[2], arr[3]);	
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
function draw() {
    var date = new Date();
	var seconds = date.getSeconds();
	var minutes = date.getMinutes();
	var hours = date.getHours();
    loop3 = seconds==0?!loop3:loop3;
    loop2 = minutes==0&&!loop2set?!loop2:loop2;
    loop1 = hours==0&&!loop1set?!loop1:loop1;
    loop2set = minutes==0&&!loop2set?true:minutes!=0&&loop2set?false:loop2set;
    loop1set = hours==0&&!loop1set?true:hours!=0&&loop1set?false:loop1set;
	_draw(ctx, 250, 250, 250, 200, hours, 15, loop1);
	_draw(ctx, 250, 250, 200, 150, minutes, 6, loop2);
	_draw(ctx, 250, 250, 150, 100, seconds, 6, loop3);
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(250,250,100,0,Math.PI*2, false); // outer (unfills it)
    ctx.fill();
    ctx.fillStyle = '#000000'; // or whatever color the text should be.	
	var lines = toString(date).split('\n');
	for (var i in lines)
		ctx.fillText(lines[i], 175, 245 + (i*20));
	setTimeout(function(){draw()}, 1000);
}