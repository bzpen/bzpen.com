
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

window.onresize = resiceCanvas;
resiceCanvas()
// 初始化canvas大小
function resiceCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// 绘制线条
function drawLine(x,y,z) {
	ctx.beginPath();
  ctx.strokeStyle = '#fff';
	ctx.moveTo(x, y);
	ctx.lineTo(x + z, y);
	ctx.stroke();
	ctx.closePath();
}

// 绘制圆
function drawCircle(x,y, radius, c ,begin, direction) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.arc(x, y + radius, radius, begin * Math.PI, c * Math.PI, direction);
  ctx.stroke();
	ctx.closePath();

}

let x = 0;
let y = window.innerHeight/2;
let z = 0

// 绘制速度
let speed_line = 6
let speed_circle = 0.03

// 圆参数
let c = 0
let radius = 100

setInterval(() => {
  /* 清屏 */
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  /* 绘制 */
  
  if(x + z  > window.innerWidth/2) {
    // console.log(1);
    if( x != x + z)
      drawLine(x+=speed_line ,y ,z -= speed_line);
    if( c >= 2){
      if(c+speed_circle < 4){
        drawCircle( x + z , y, radius , (c += speed_circle) + 1.5 ,1.5,true );
        drawLine( x  ,y ,z += speed_line + 1);
      }
      else
        drawLine( x += speed_line ,y ,z += speed_line + 1);
    }else{
      drawCircle( x + z , y, radius , (c += speed_circle) + 1.5 ,1.5,false);
    }

  }else{
    drawLine(x+=speed_line ,y ,z+=speed_line )
  }

  if(x > window.innerWidth) {
    x = 0;
    z = 0;
    c = 0
  }
}, 10)


