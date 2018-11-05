"use strict";

//file input handle
const fileInpt = document.querySelector('#file');
//filters slider handle
const opacitySlider = document.querySelector('#opacity');
const blurSlider = document.querySelector('#blur');
const contrastSlider = document.querySelector('#contrast');
//canvas handle
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0,0,500,300);
//init new iimg object
let img = new Image();

const imageBody = {
	['defaultImage'] : [],
	['displayedImage'] : []
}

fileInpt.onchange = function(event){ //Execute when file input change
	let files = event.target.files; // FileList object
	let file = files[0];	//handle to file
	let reader = new FileReader(); //New constructor

	reader.readAsDataURL(file); //How to read file
	reader.onload = function(event){ //waiting to load file
		img.src = event.target.result; //setting selected image to source
		img.onload = function(){
			ctx.drawImage(img,0,0); //drawing Img on canvas
			imageBody.defaultImage = ctx.getImageData(0,0,canvas.width,canvas.height);
			imageBody.displayedImage = ctx.getImageData(0,0,canvas.width,canvas.height);
		}
	}
}

opacitySlider.oninput = function(){
	let imgData =	imageBody.defaultImage;
	let data = imgData.data;

	for(let i=0; i < data.length; i += 4){
		data[i+3] = this.value/100 * 255;
	}

	ctx.putImageData(imgData, 0, 0);
}

blurSlider.oninput = function(){
	canvas.style.filter = `blur(${this.value}px)`;
}

contrastSlider.oninput = function(){
	let imgData = imageBody.defaultImage;
	let data = imgData.data;

	let imgToManipulate = imageBody.displayedImage;
	let dataToDisplay = imgToManipulate.data;

	for (var i = 0; i < data.length; i += 4) {
		if (data[i] >= 128) {
			dataToDisplay[i] = data[i] + this.value * 0.4;
		}else{
			dataToDisplay[i] = data[i] - this.value * 0.4;
		}

		if (data[i+1] >= 128) {
			dataToDisplay[i+1] = data[i+1] + this.value * 0.4;
		}else{
			dataToDisplay[i+1] = data[i+1] - this.value * 0.4;
		}

		if (data[i+2] >= 128) {
			dataToDisplay[i+2] = data[i+2] + this.value * 0.4;
		}else{
			dataToDisplay[i+2] = data[i+2] - this.value * 0.4;
		}
	}

	ctx.putImageData(imgToManipulate, 0, 0);
}

//Draw on Canvas//

canvas.width = 500;
canvas.height = 300;

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 5;
ctx.strokeStyle = '#ac0000';

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(e) {
  // stop the function if they are not mouse down
  if(!isDrawing) return;
  //listen for mouse move event
  console.log(e);
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
