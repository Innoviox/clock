var canvas, ctx, loop1 = true, loop2 = true, loop3 = true, loop4 = true, loop3set = false, loop2set=false, loop1set=false, t=0;
canvas = $("#canvas")[0];
ctx = canvas.getContext("2d");
ctx.lineWidth = 50;
ctx.font = "20px Arial";
var c1 = "red", c2 = "orange";
function toString(date) {
	arr = v.split(date.toString(), /\s/);
	return v.sprintf('%s\n%s %s %s, %s', arr[4], arr[0], arr[1], arr[2], arr[3]);	
}

function dateSub(date1, date2) {
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffYears = Math.floor(timeDiff / (1000 * 3600 * 24 * 365));
    timeDiff -= diffYears * (1000 * 3600 * 24 * 365);
    var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    timeDiff -= diffDays * (1000 * 3600 * 24);
    var diffHours = Math.floor(timeDiff / (1000 * 3600));
    timeDiff -= diffHours * (1000 * 3600);
    var diffMins = Math.floor(timeDiff / (1000 * 60));
    timeDiff -= diffMins * (1000 * 60);
    var diffSeconds = Math.floor(timeDiff / (1000));
    timeDiff -= diffSeconds * (1000);
    return new Array(diffYears, diffDays,diffHours, diffMins, diffSeconds, timeDiff);
}

function _draw(ctx, x, y, r, r2, v, t, loop) {
		ctx.fillStyle = loop?c1:c2;
		ctx.beginPath();
		ctx.arc(x,y,r,0,Math.PI*2, false); // outer (filled)
		ctx.arc(x,y,r2,0,Math.PI*2, false); // outer (unfills it)
		ctx.fill();
		ctx.fillStyle = loop?c2:c1;
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
    var ms = Math.round(date.getMilliseconds(), 1);
    loop4 = ms>=0&&ms<=49?!loop4:loop4
    console.log(loop4);
    loop3 = seconds==0&&!loop3set?!loop3:loop3;
    loop2 = minutes==0&&!loop2set?!loop2:loop2;
    loop1 = hours==0&&!loop1set?!loop1:loop1;
    loop3set = seconds==0&&!loop3set?true:seconds!=0&&loop3set?false:loop3set;
    loop2set = minutes==0&&!loop2set?true:minutes!=0&&loop2set?false:loop2set;
    loop1set = hours==0&&!loop1set?true:hours!=0&&loop1set?false:loop1set;
    ctx.lineWidth = 50;
	_draw(ctx, 250, 250, 250, 200, hours, 15, loop1);
	_draw(ctx, 250, 250, 200, 150, minutes, 6, loop2);
	_draw(ctx, 250, 250, 150, 100, seconds, 6, loop3);
    ctx.lineWidth = 10;
    _draw(ctx, 250, 250, 100, 90, ms, 360/1000, loop4);
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(250,250,90,0,Math.PI*2, false); // outer (unfills it)
    ctx.fill();
    ctx.fillStyle = '#000000'; // or whatever color the text should be.	
	var lines = toString(date).split('\n');
	for (var i in lines)
		ctx.fillText(lines[i], 175, 245 + (i*20));
	setTimeout(function(){draw()}, 50);
}