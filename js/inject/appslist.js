console.log("appslist");
sue.apps.appslist={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"appslist",
			headTitle:"appslist",
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

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_appslist_box"]});
		dom.querySelector(".su_main").appendChild(theAppBox);

		let _ul=sue.apps.domCreate("ul");
		let _conf=sue.apps.appslist.apps;
		for(var i=0;i<_conf.length;i++){
			var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_appslist_li"]},null,null,{setName:["id"],setValue:[_conf[i]]},sue.apps.i18n(_conf[i]));
			_ul.appendChild(_li);
		}
		theAppBox.appendChild(_ul);
		dom.style.cssText+="border-color:#e91e63;";
		dom.querySelector(".su_head").style.cssText+="background-color:#e91e63;";
		dom.addEventListener("click",this.handleEvent,false);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_appslist_li")){
					chrome.runtime.sendMessage({type:"appsAction",app:"appslist",action:"openApp",value:e.target.dataset.id})
					if(sue.apps.appslist.config.n_closebox){
						sue.apps.boxClose(e);
					}
				}
		}
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"appslist"},function(response){
	sue.apps.appslist.config=response.config;
	sue.apps.appslist.apps=response.value.apps;
	sue.apps.appslist.initUI();
})
