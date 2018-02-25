console.log("scroll");
var fn_scroll={
	effect:false,
	init:function(){
		chrome.runtime.sendMessage({type:"scroll"},function(response){
			var s_type=response.type;
			fn_scroll.effect=response.effect;
			fn_scroll.s_fn[s_type]();
		})
	},
	s_fn:{
		up:function(){
			console.log("up")
			var effect=fn_scroll.effect;
			if(window.document.height==window.innerHeight){
				var _alllength=0
			}else{
				var _alllength=window.innerHeight-20;}
			if(!effect){
				window.scrollBy(document.documentElement.offsetLeft,-_alllength);
			}else{
				var _length=0;
				var _timer=window.setInterval(function(){
					window.scrollBy(document.documentElement.offsetLeft,-20);
					_length+=20;
					if(_length>_alllength){window.clearInterval(_timer);}
				},5)	
			}
		},
		down:function(){
			var effect=fn_scroll.effect;
			if(window.document.height==window.innerHeight){
				var _alllength=0}
			else{
				var _alllength=window.innerHeight-20;}
			if(!effect){
				window.scrollBy(document.documentElement.offsetLeft,_alllength);}
			else{
				var _length=0;
				var _dtimer=window.setInterval(function(){
					window.scrollBy(document.documentElement.offsetLeft,20);
					_length+=20;
					if(_length>_alllength){
						window.clearInterval(_dtimer);
					}
				},5)
			}
		},
		left:function(){
			var effect=fn_scroll.effect;
			var _alllength=window.innerWidth-20;
			if(!effect){
				window.scrollBy(-_alllength,0);
			}else{
				var _length=0;
				var _timer=window.setInterval(function(){
					window.scrollBy(-20,0);
					_length+=20;
					if(_length>_alllength){window.clearInterval(_timer);}
				},5)	
			}
		},
		right:function(){
			var effect=fn_scroll.effect;
			var _alllength=window.innerWidth-20;
			if(!effect){
				window.scrollBy(_alllength,0);
			}else{
				var _length=0;
				var _timer=window.setInterval(function(){
					window.scrollBy(20,0);
					_length+=20;
					if(_length>_alllength){window.clearInterval(_timer);}
				},5)	
			}	
		},
		top:function(){
			console.log("top");
			var effect=fn_scroll.effect;
			var _alllength=window.pageYOffset+50;
			if(!effect){
				window.scrollBy(document.documentElement.offsetLeft,-_alllength)}
			else{
				var _length=0;var _N=parseInt(_alllength/window.innerHeight);
				if(_N>2){
					_length=_alllength-2*window.innerHeight;
					window.scrollBy(document.documentElement.offsetLeft,-(_alllength-2*window.innerHeight));
				}
				var _Utimer=window.setInterval(function(){
					var _scroll=(_alllength-_length)*0.1;
					window.scrollBy(document.documentElement.offsetLeft,-_scroll);
					_length+=_scroll;
					if(_length>_alllength){window.clearInterval(_Utimer);}
				},5)
			}
		},
		bottom:function(){
			var effect=fn_scroll.effect;
			var _alllength=Math.max(document.body.offsetHeight,document.body.clientHeight,document.body.scrollHeight,document.documentElement.clientHeight,document.documentElement.offsetHeight,document.documentElement.scrollHeight)-window.innerHeight-window.pageYOffset+50;
			if(!effect){
				window.scrollBy(document.documentElement.offsetLeft,_alllength);
				void(0)/*return*/;
			}
			var _length=0;
			var _N=parseInt(_alllength/window.innerHeight);
			if(_N>2){
				_length=_alllength-2*window.innerHeight;
				window.scrollBy(document.documentElement.offsetLeft,(_alllength-2*window.innerHeight));
			};
			var _Dtimer=window.setInterval(function(){
				var _scroll=(_alllength-_length)*0.1;
				window.scrollBy(document.documentElement.offsetLeft,_scroll);
				_length+=_scroll;
				if(_length>_alllength){window.clearInterval(_Dtimer);}
			},5)
		},
		leftmost:function(){
			var effect=fn_scroll.effect;
			var _alllength=window.pageXOffset+50;
			if(!effect){
				window.scrollBy(-_alllength,0);
			}else{
				var _length=0;var _N=parseInt(_alllength/window.innerWidth);
				if(_N>2){
					_length=_alllength-2*window.innerWidth;
					window.scrollBy(-(_alllength-2*window.innerWidth),0);
				}
				var _Utimer=window.setInterval(function(){
					var _scroll=(_alllength-_length)*0.1;
					window.scrollBy(-_scroll,0);
					_length+=_scroll;
					if(_length>_alllength){window.clearInterval(_Utimer);}
				},5)
			}
		},
		rightmost:function(){
			var effect=fn_scroll.effect;
			var _alllength=Math.max(document.body.offsetWidth,document.body.clientWidth,document.body.scrollWidth,document.documentElement.clientWidth,document.documentElement.offsetWidth,document.documentElement.scrollWidth)-window.innerWidth-window.pageXOffset+50;
			if(!effect){
				window.scrollBy(_alllength,0);
				void(0)/*return*/;
			}
			var _length=0;
			var _N=parseInt(_alllength/window.innerWidth);
			if(_N>2){
				_length=_alllength-2*window.innerWidth;
				window.scrollBy((_alllength-2*window.innerWidth),0);
			};
			var _Dtimer=window.setInterval(function(){
				var _scroll=(_alllength-_length)*0.1;
				window.scrollBy(_scroll,0);
				_length+=_scroll;
				if(_length>_alllength){window.clearInterval(_Dtimer);}
			},5)
		}

	}
}
fn_scroll.init();