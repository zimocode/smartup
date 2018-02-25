var fn_zoom={
	init:function(){
		chrome.runtime.sendMessage({type:"zoom"},function(response){
			var s_value=response.value;
			fn_zoom.s_fn[s_value]();
		})
	},
	s_fn:{
		s_in:function(){
			!document.body.style.zoom?document.body.style.zoom=1.1:null;
			Math.abs(document.body.style.zoom)<1.5?document.body.style.zoom=Math.abs(document.body.style.zoom)+0.1:document.body.style.zoom=Math.abs(document.body.style.zoom)+0.5;
			Math.abs(document.body.style.zoom)>3?document.body.style.zoom=1:null;
		},
		s_out:function(){
			!document.body.style.zoom?document.body.style.zoom=0.9:null;
			Math.abs(document.body.style.zoom)>0.5?document.body.style.zoom=Math.abs(document.body.style.zoom)-0.1:document.body.style.zoom=Math.abs(document.body.style.zoom)-0.2;
			Math.abs(document.body.style.zoom)<0.2?document.body.style.zoom=1:null;
		},
		s_reset:function(){
			document.body.style.zoom=1;
		}
	}
}
fn_zoom.init();


