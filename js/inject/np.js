//console.log("np")
Array.prototype.contains=function (ele) {
    for (var i=0;i<this.length;i++){
        if (this[i]==ele){
            return true;
        }
	}
	return false;
}
var fn_np={
	init:function(){
		chrome.runtime.sendMessage({type:"getappconf",apptype:"next"},function(response){
			//fn_np.keywds=response.keywds;
			console.log(response)
			fn_np.getURL(response.keywds);
		})
	},
	getURL:function(keywds){
		var theURL="";
		var lnks=document.querySelectorAll("a");
		//console.log(keywds.contains(lnks[189].title))
		for(var i=lnks.length-1;i>0;i--){
			if(keywds.contains(lnks[i].innerText)){
				theURL=lnks[i].href;
				break;
			}
			if(keywds.contains(lnks[i].id)){
				console.log(lnks[i].id)
				theURL=lnks[i].href;
				break;
			}
			for(var ii=0;ii<lnks[i].classList.length;ii++){
				if(keywds.contains(lnks[i].classList[ii])){
					theURL=lnks[i].href;
					break;
				}
			}
			if(keywds.contains(lnks[i].rel)){
				theURL=lnks[i].href;
				break;
			}
			if(keywds.contains(lnks[i].title)){
				theURL=lnks[i].href;
				break;
			}
			if(theURL){break;}
		}
		if(!theURL){
			var spans=document.querySelectorAll("span");
			for(var i=spans.length-1;i>0;i--){
				if(keywds.contains(spans[i].innerText)){
					theURL=spans[i].parentNode.href;
					break;
				}
			}
		}

		chrome.runtime.sendMessage({type:"action_np",url:theURL,name:"next",npok:true},function(response){});
	}
}
fn_np.init();