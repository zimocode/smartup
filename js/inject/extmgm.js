console.log("extmgm")
sue.apps.extmgm={
	cons:{
		boxmove:{}
	},
	initUI:function(){
		sue.apps.init();
		var _appname="extmgm";
		var dom=sue.apps.domCreate("smartup",{setName:["className","id"],setValue:["su_apps","su_apps_"+_appname]},null,"z-index:"+parseInt((new Date().getTime())/1000),{setName:["appname"],setValue:[_appname]});
		dom.innerHTML=
			'<div class="su_head" style="">'
				+'<span class="su_title">'+sue.apps.i18n("extmgm")+'</span>'
				+'<div class="su_btn_close">x</div>'
			+'</div>'
			+'<div class="su_main">'
				+'<div class="su_extmgm"></div>'
			+'</div>';
		var domUL=sue.apps.domCreate("ul");
		//dom.querySelector(".su_content").style.cssText+="max-height:"+(window.innerHeight-150)+"px;";

        sue.apps.extmgm.list(dom);
		sue.apps.initPos(dom);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_extmgm_li")){
					sue.apps.extmgm.action(e);
				}
				break;
			case"mouseover":
				if(e.target.classList.contains("su_extmgm_li")){
					if(e.target.classList.contains("su_extmgm_enabled")){
						e.target.style.cssText+='background-image:url("'+chrome.runtime.getURL("image/disable.png")+'")'
					}else{
						e.target.style.cssText+='background-image:url("'+chrome.runtime.getURL("image/enable.png")+'")'
					}
				}
				break;
			case"mouseout":
				if(e.target.classList.contains("su_extmgm_li")){
					e.target.style.cssText+='background-image:none;'
				}
				break;
		}
	},
	list:function(dom){
		var dom=dom.querySelector(".su_extmgm");
		var domli=sue.apps.domCreate("li",{setName:["className"],setValue:["su_extmgm_li su_extmgm_disableall"]},sue.apps.i18n("app_extmgm_disableall"));
			dom.appendChild(domli);
			domli.addEventListener("click",this,false);
		for(var i=0;i<sue.apps.extmgm.exts.ext_enabled.length;i++){
			var domli=sue.apps.domCreate("li",{setName:["className"],setValue:["su_extmgm_li su_extmgm_enabled"]},sue.apps.extmgm.exts.ext_enabled[i].name,null,{setName:["id"],setValue:[sue.apps.extmgm.exts.ext_enabled[i].id]});
			domli.addEventListener("click",this,false);
			domli.addEventListener("mouseover",this,false);
			domli.addEventListener("mouseout",this,false);
			dom.appendChild(domli);
		}
		for(var i=0;i<sue.apps.extmgm.exts.ext_disabled.length;i++){
			var domli=sue.apps.domCreate("li",{setName:["className"],setValue:["su_extmgm_li su_extmgm_disabled"]},sue.apps.extmgm.exts.ext_disabled[i].name,null,{setName:["id"],setValue:[sue.apps.extmgm.exts.ext_disabled[i].id]});
			domli.addEventListener("click",this,false);
			domli.addEventListener("mouseover",this,false);
			domli.addEventListener("mouseout",this,false);
			dom.appendChild(domli);
		}
	},
	action:function(e){
		var typeAction;
		if(e.target.classList.contains("su_extmgm_disableall")){
			typeAction="disableall";
		}else{
			typeAction=e.target.classList.contains("su_extmgm_enabled")?"disable":"enable";
		} 
		var objul=e.target.parentNode;
		chrome.runtime.sendMessage({type:"apps_action",apptype:"extmgm",type_action:typeAction,id:e.target.dataset.id},function(response){
			if(response.actionDone){
				if(typeAction=="disable"){
					e.target.className="su_extmgm_li su_extmgm_disabled";
					objul.appendChild(e.target)
				}else if(typeAction=="enable"){
					e.target.className="su_extmgm_li su_extmgm_enabled";
					objul.insertBefore(e.target,objul.querySelector(".su_extmgm_disableall").nextSibling);
				}else if(typeAction=="disableall"){
					var doms=objul.querySelectorAll(".su_extmgm_enabled");
					for(var i=0;i<doms.length;i++){
						doms[i].className="su_extmgm_li su_extmgm_disabled";
						objul.appendChild(doms[i]);
					}
				}
				e.target.style.cssText+="background-image:none;"
			}
		})
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"extmgm"},function(response){
	sue.apps.extmgm.exts=response.value;
	sue.apps.extmgm.initUI();
})

