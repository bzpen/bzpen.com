
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

window.onresize = resiceCanvas;
resiceCanvas()
// 初始化canvas大小
function resiceCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}


/**
 * 
 * 定已参数接口
 * 1、求起点弧度以及终点弧度
 * 2、求起点与终点间的弧度差
 * 3、求起点的xy坐标
 * 4、绘制弧线
 */

//  
// 参数定义
var line1 = {
  x: 0,
  y: window.innerHeight / 2 - 50,
  z: 200,
  speed: 10,

  // 弧起点坐标
  startX: window.innerWidth / 2,
  startY: window.innerHeight / 2 - 50, 
  radian: 1.5 * Math.PI,
  radius: 50,
  arcZ: 0,
  
  // 圆心
  centerX: window.innerWidth / 2,
  centerY: window.innerHeight / 2,
}

// 终点-起点弧度差计算
function getArcZ(line) {
  return line.arcZ / line.radius;
}

// 绘制线条
function drawLine(line) {
	ctx.beginPath();
  
  var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop("0", "magenta");
  gradient.addColorStop("0.8" ,"blue");
  gradient.addColorStop("1.0", "red");

  // Fill with gradient
  ctx.strokeStyle = gradient;

  ctx.lineCap = "round";
  ctx.lineWidth = 10;
	ctx.moveTo(line.x, line.y);
	ctx.lineTo( line.x + line.z , line.y);
	ctx.stroke();
	ctx.closePath();
}

function drawCircle(line) {
  ctx.beginPath();
  // ctx.strokeStyle = '#fff';
  ctx.moveTo(line.startX, line.startY);
  // ctx.moveTo(line.centerX, line.centerY);
  console.log("line.arcZ: " + line.arcZ);
  console.log( "getArcZ(line) + line.radian: " + (getArcZ(line) + line.radian));
  console.log("radian:"+ line.radian);
  ctx.arc(line.centerX , line.centerY , line.radius, line.radian, getArcZ(line) + line.radian, false);
  ctx.stroke();
	ctx.closePath();
}


// getRadian(line1)
// drawCircle(line1)
// 计算弧度
function getRadian(line){
  let poor = (line.radian - 1.5 * Math.PI) 
  let x = 0;
  let y = 0;

  // 第一象限 
  if(0 < poor && poor < 0.5 * Math.PI){
    
    x = line.radius * Math.sin(poor);

    y = line.radius -  Math.sqrt(line.radius * line.radius - x * x);

  }
  // 第二象限 
  if( 0.5 * Math.PI < poor && poor < 1 * Math.PI){
    
    poor = -(poor - Math.PI);
    x = line.radius * Math.sin(poor);

    y = line.radius + Math.sqrt(line.radius * line.radius - x * x);

  }
  // 第三象限 
  if( 1 * Math.PI < poor && poor < 1.5 * Math.PI){
    
    poor = poor - 1 * Math.PI;
    x =  - line.radius * Math.sin(poor);

    y = line.radius + Math.sqrt(line.radius * line.radius - x * x);

  }
  
  // 第四象限 
  if( 1.5 * Math.PI < poor && poor < 2 * Math.PI){
    
    poor = -( poor - 2 * Math.PI);
    x =  - line.radius * Math.sin(poor);

    y = line.radius -  Math.sqrt(line.radius * line.radius - x * x);

  }

  // let x = line.radius * poor;

  // let y = Math.sqrt(line.radius * line.radius - x * x);
  line.startX = line.x + x;
  line.startY = line.y + y;
  // line.radius = poor
  // console.log("line.startX: " + line.startX);
  // console.log("line.startY: " + line.startY);

}


setInterval(() => {
  /* 清屏 */
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  /* 绘制 */
  
  
  if(line1.x + line1.z  >= window.innerWidth/2) {
    if( line1.arcZ < 200 && line1.x <= window.innerWidth/2) {
      line1.x += line1.speed;
      line1.z = line1.z - line1.speed;
      line1.arcZ = 200 - line1.z;
      drawLine(line1)
      drawCircle(line1)
    }else{
      if(line1.radian <= 3.5 * Math.PI - getArcZ(line1)) {
        line1.radian = line1.radian + 4/line1.radius;
        getRadian(line1);
        drawCircle(line1)
      }else{
        if(line1.radian > 3.5 * Math.PI){
          line1.x += line1.speed;
          drawLine(line1)
          if(line1.x > window.innerWidth) {
            line1 = {
              x: 0,
              y: window.innerHeight / 2 - 50,
              z: 200,
              speed: 10,
            
              // 弧起点坐标
              startX: window.innerWidth / 2,
              startY: window.innerHeight / 2 - 50, 
              radian: 1.5 * Math.PI,
              radius: 50,
              arcZ: 0,
              
              // 圆心
              centerX: window.innerWidth / 2,
              centerY: window.innerHeight / 2,
            }
          }
        }else{
          line1.arcZ = line1.arcZ - line1.speed;
          line1.z = line1.z + line1.speed;
          line1.radian = line1.radian + 4/line1.radius;
          getRadian(line1);
          drawLine(line1)
          drawCircle(line1)
        }
        
      }
    }
  }
  else{
    line1.x += line1.speed;
    drawLine(line1)
  }

  // if(x > window.innerWidth) {
  //   x = 0;
  //   z = 0;
  //   c = 0
  // }
}, 10)

// 绘制圆

// console.log(Math.sin(Math.PI/6));

// // 绘制线条
// function drawLine(x,y,z) {
// 	ctx.beginPath();
//   ctx.strokeStyle = '#fff';
// 	ctx.moveTo(x, y);
// 	ctx.lineTo(x + z, y);
// 	ctx.stroke();
// 	ctx.closePath();
// }

// // 绘制圆
// function drawCircle(x, y, radius, c ,begin, direction) {
//   ctx.beginPath();
//   ctx.moveTo(x, y);
//   ctx.arc(x, y + radius, radius, begin * Math.PI, c * Math.PI, direction);
//   ctx.stroke();
// 	ctx.closePath();

// }

// let x = 0;
// let y = window.innerHeight/2;
// let z = 40

// // 绘制速度
// let speed_line = 6
// let speed_circle = 0.05

// // 圆参数
// let c = 0
// let radius = 100

// setInterval(() => {
//   /* 清屏 */
//   ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
//   /* 绘制 */
  
//   if(x + z  > window.innerWidth/2) {
//     // console.log(1);
//     if( x != x + z)
//       drawLine(x+=speed_line ,y ,z -= speed_line);
//     if( c >= 2){
//       if(c+speed_circle < 4){
//         drawCircle( x + z , y, radius , (c += speed_circle) + 1.5 ,1.5,true );
//         // drawLine( x  ,y ,z += speed_line + 1);
//       }
//       else
//         drawLine( x += speed_line ,y ,z);
//     }else{
//       drawCircle( x + z , y, radius , (c += speed_circle) + 1.5 ,1.5 + c ,false);
//     }

//   }else{
//     drawLine(x+=speed_line ,y , z )
//   }

//   // if(x > window.innerWidth) {
//   //   x = 0;
//   //   z = 0;
//   //   c = 0
//   // }
// }, 10)
