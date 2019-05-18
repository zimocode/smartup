console.log("jslist");
sue.apps.jslist={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"jslist",
			headTitle:"jslist",
			headCloseBtn:true,
			menu:[
				{src:"/image/options.png",title:"app_tip_opt",className:"menu_item menu_item_opt"}
			],
			options:[
				{type:"checkbox",label:"n_closebox",name:"n_closebox"},
				{type:"checkbox",label:"n_jq",name:"n_jq"}
			]
		}
		sue.apps.init();
		var dom=sue.apps.initBox(appInfo);
			dom.id="su_apps_"+appInfo.appName;
		sue.apps[appInfo.appName].dom=dom;
		sue.apps.initPos(dom);

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_jslist_box"]});
		dom.querySelector(".su_main").appendChild(theAppBox);

		let _ul=sue.apps.domCreate("ul");
		let theobj=sue.apps.jslist.js; 
		for(var i=0;i<theobj.length;i++){
			var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_jslist_li"]},null,null,{setName:["id"],setValue:[i]},theobj[i]);
			_ul.appendChild(_li);
		}
		theAppBox.appendChild(_ul);
		dom.addEventListener("click",this.handleEvent,false)
		dom.style.cssText+="border-color:#e91e63;";
		dom.querySelector(".su_head").style.cssText+="background-color:#e91e63;";
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_jslist_li")){
					chrome.runtime.sendMessage({type:"appsAction",app:"jslist",action:"jsRun",value:e.target.dataset.id})
					if(sue.apps.jslist.config.n_closebox){
						sue.apps.boxClose(e);
					}
				}
		}
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"jslist"},function(response){
	sue.apps.jslist.config=response.config;
	sue.apps.jslist.js=response.value.js;
	sue.apps.jslist.initUI();
})
