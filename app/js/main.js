"use strict";

//file input handle
const fileInpt = document.querySelector('#file');
//filters slider handle
const opacitySlider = document.querySelector('#opacity');
const contrastSlider = document.querySelector('#contrast');
//canvas handle
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0,0,500,300);
//init new iimg object
let img = new Image();

const imageBody = {
	['defaultImage'] : [],
	['displayedImage'] : [],
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
			imageBody.defaultImage = ctx.getImageData(0,0,canvas.width,canvas.height).data
		}
	}
}

opacitySlider.oninput = function(){
	let canvas = document.querySelector("#canvas");
	let ctx = canvas.getContext("2d");
	let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
	let data = imgData.data;
	data = imageBody.defaultImage;

	for(let i=0; i < data.length; i += 4){
		data[i+3] = this.value/100 * 255;
	}

	ctx.putImageData(imgData, 0, 0);
}

contrastSlider.oninput = function(){
	let canvas = document.querySelector("#canvas");
	let ctx = canvas.getContext("2d");
	let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
	let data = imgData.data;


	for (var i = 0; i < data.length; i += 4) {
		if (data[i] >= 128) {
			data[i] = data[i] + this.value * 0.2;
		}else{
			data[i] = data[i] - this.value * 0.2;
		}

		if (data[i+1] >= 128) {
			data[i+1] = data[i+1] + this.value * 0.2;
		}else{
			data[i+1] = data[i+1] - this.value * 0.2;
		}

		if (data[i+2] >= 128) {
			data[i+2] = data[i+2] + this.value * 0.2;
		}else{
			data[i+2] = data[i+2] - this.value * 0.2;
		}
	}

	ctx.putImageData(imgData, 0, 0);
}
