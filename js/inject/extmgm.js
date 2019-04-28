console.log("extmgm")
sue.apps.extmgm={
	cons:{
		boxmove:{}
	},
	initUI:function(){
		let appInfo={
			appName:"extmgm",
			headTitle:"extmgm",
			headCloseBtn:true,
			menu:[
				{src:"/image/options.png",title:"app_tip_opt",className:"menu_item menu_item_opt"}
			],
			options:[
				{type:"checkbox",label:"n_closebox",name:"n_closebox",checked:true}
			]
		}
		sue.apps.init();
		var dom=sue.apps.initBox(appInfo);
			dom.id="su_apps_"+appInfo.appName;
		sue.apps[appInfo.appName].dom=dom;
		sue.apps.initPos(dom);

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_extmgm"]});
		var _UL=sue.apps.domCreate("ul");
		theAppBox.appendChild(_UL);
		dom.querySelector(".su_main").appendChild(theAppBox);

		sue.apps.extmgm.itemList();
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
	itemList:function(){
		let dom=sue.apps.extmgm.dom.querySelector(".su_extmgm ul");
		var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_extmgm_li su_extmgm_disableall"]},sue.apps.i18n("app_extmgm_disableall"));
			dom.appendChild(_li);
			_li.addEventListener("click",this,false);
		for(var i=0;i<sue.apps.extmgm.exts.ext_enabled.length;i++){
			var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_extmgm_li su_extmgm_enabled"]},sue.apps.extmgm.exts.ext_enabled[i].name,null,{setName:["id"],setValue:[sue.apps.extmgm.exts.ext_enabled[i].id]});
			_li.addEventListener("click",this,false);
			_li.addEventListener("mouseover",this,false);
			_li.addEventListener("mouseout",this,false);
			dom.appendChild(_li);
		}
		for(var i=0;i<sue.apps.extmgm.exts.ext_disabled.length;i++){
			var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_extmgm_li su_extmgm_disabled"]},sue.apps.extmgm.exts.ext_disabled[i].name,null,{setName:["id"],setValue:[sue.apps.extmgm.exts.ext_disabled[i].id]});
			_li.addEventListener("click",this,false);
			_li.addEventListener("mouseover",this,false);
			_li.addEventListener("mouseout",this,false);
			dom.appendChild(_li);
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

