//canvas handle
let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let img = new Image();
//file input handle
let fileInpt = document.querySelector('#file');

fileInpt.onchange = function(event){ //Execute when file input change
	let files = event.target.files; // FileList object
	let file = files[0];	//handle to file

	if(file.type.match('image.*')) { //Checking type of file
		let reader = new FileReader(); //New constructor
		reader.readAsDataURL(file); //How to read file

		reader.onload = function(event){ //waiting to load file
			if( event.target.readyState == FileReader.DONE){ //checking status
				img.src = event.target.result; //setting selected image to source
				ctx.drawImage(img,0,0); //drawing Img on canvas
			}
		}

	}else{
		console.log('it is not a image');
	}
}
