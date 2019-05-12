var config;
var per={
	begin:function(){
		chrome.runtime.sendMessage({type:"per_getconf"},function(response){
			if(response){
				console.log(response)
				config=response;
				per.init();
			}
		})
	},
	getI18n:function(str){
		return chrome.i18n.getMessage(str)||str;
	},
	init:function(){
		console.log(config);
		per.pers=config.pers?config.pers:null;
		per.orgs=config.orgs?config.orgs:null;
		console.log(per.pers)
		//show request permissions
		var strs="";
		for(var i=0;per.pers&&i<per.pers.length;i++){
			strs=strs+" "+per.pers[i];
		}
		for(var i=0;per.orgs&&i<per.orgs.length;i++){
			strs=strs+" "+per.orgs[i];
		}
		document.querySelector("#perlist").textContent=strs;
		document.querySelector("#per_msg").innerText=config.msg?config.msg:"";

		var i18nOBJ=document.querySelectorAll("[data-i18n]");
		for(var i=0;i<i18nOBJ.length;i++){
			var trans=per.getI18n(i18nOBJ[i].dataset.i18n);
			if(!trans){continue;}
			if(i18nOBJ[i].tagName.toLowerCase()=="input"&&i18nOBJ[i].type=="button"){
				i18nOBJ[i].value=trans;
			}else{
				i18nOBJ[i].textContent=trans;
			}
		}
		window.addEventListener("click",this,false);
		window.addEventListener("unload",this,false);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.id=="getpers"){
					if(per.pers&&per.orgs){
						chrome.permissions.request({permissions: per.pers,origins: per.orgs}, function(granted){checkRequest(granted);})
					}else if(per.pers){
						chrome.permissions.request({permissions: per.pers}, function(granted){checkRequest(granted);})
					}else if(per.orgs){
						chrome.permissions.request({origins: per.orgs}, function(granted){checkRequest(granted);})
					}
					
					var checkRequest=function(granted){
						if (granted) {
							chrome.runtime.sendMessage({type:"per_clear",pers:per.pers},function(response){});
							var count=5;
							document.querySelector("#perlistbox").style.cssText+="font-size:18px;color:red;text-align:center;";
							document.querySelector("#perbtnbox").remove();
							cut();
							window.setInterval(cut,1000);
							function cut(){
								if(count){
									document.querySelector("#perlistbox").textContent=per.getI18n("getper_after")+" "+count+" s.";
									count-=1;
								}else{
									window.close();
								}
							}
						} else {
							alert(per.getI18n("getper_fail"))
							window.close();
						}
					}
				}
				break;
			case"unload":
				chrome.runtime.sendMessage({type:"per_clear",pers:per.pers},function(response){})
				break;
		}
	}
}
per.begin()