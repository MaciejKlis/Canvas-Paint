"use strict";

//file input handle
const fileInpt = document.querySelector('#file');
//filters slider handle
const opacitySlider = document.querySelector('#opacity');
const contrastSlider = document.querySelector('#contrast');

fileInpt.onchange = function(event){ //Execute when file input change
	//canvas handle
	const canvas = document.querySelector('#canvas');
	const ctx = canvas.getContext('2d');
	let img = new Image();
	const imageData = ctx.getImageData(0,0,500,300);

	let files = event.target.files; // FileList object
	let file = files[0];	//handle to file

	if(file.type.match('image.*')) { //Checking type of file
		let reader = new FileReader(); //New constructor
		reader.readAsDataURL(file); //How to read file

		reader.onload = function(event){ //waiting to load file
			if( event.target.readyState == FileReader.DONE){ //checking status
				img.src = event.target.result; //setting selected image to source
				ctx.drawImage(img,0,0); //drawing Img on canvas

				opacitySlider.disabled = false;
				contrastSlider.disabled = false;
			}
		}
	}else{
		console.log('it is not a image');
	}
}

opacitySlider.oninput = function(){
	let canvas = document.querySelector("#canvas");
	let ctx = canvas.getContext("2d");
	let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
	let data = imgData.data;

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
