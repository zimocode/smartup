var fn_copyimg={
	init:()=>{
		var port = chrome.runtime.connect({name: "fn_copyimg"});
		port.postMessage({type:"fn_copyimg"});
		port.onMessage.addListener(function(msg) {
			console.log(msg)
			fn_copyimg.copyImage(msg);
		})
	},
	copyImage:async (imageURL)=>{
		console.log(imageURL)
		var _img=await fetch(imageURL);
			_img=await _img.blob(_img);
		var _blob = await fn_copyimg.blob2canvas(_img);
		console.log(_img);
		const item = new ClipboardItem({ "image/png": _blob });
		navigator.clipboard.write([item]);
	},
	blob2canvas:(blob)=>{
		console.log(blob)
		var img = new Image;
		var c = document.createElement("canvas");
		var ctx = c.getContext('2d');
		img.src = URL.createObjectURL(blob);
		console.log(img)
		img.onload = function () {
			ctx.drawImage(img,0,0);
		}
		return new Promise(resolve => {
			img.onload = function () {
				console.log(this)
				c.width = this.naturalWidth;
				c.height = this.naturalHeight;
				ctx.drawImage(this, 0, 0,c.width,c.height);
				c.toBlob((blob) => {
					resolve(blob)
				}, "image/png", 1);
			};
		})
	}
}
fn_copyimg.init();