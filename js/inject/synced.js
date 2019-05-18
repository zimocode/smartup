console.log("synced");
sue.apps.synced={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"synced",
			headTitle:"synced",
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

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["syncedbox"]});
		dom.querySelector(".su_main").appendChild(theAppBox);

		let _head=sue.apps.domCreate("div",{setName:["className"],setValue:["su_synced_head"]}),
			_spanSwitch=sue.apps.domCreate("span",{setName:["className"],setValue:["su_synced_switch"]},null,null,null,sue.apps.i18n("app_synced_switch")),
			_selectDevice=sue.apps.domCreate("select",{setName:["className"],setValue:["su_synced_device"]}),
			_box=sue.apps.domCreate("div",{setName:["className"],setValue:["su_synced_box"]});
		_head.appendChild(_spanSwitch);
		_head.appendChild(_selectDevice);
		theAppBox.appendChild(_head);
		theAppBox.appendChild(_box);

		for(var i=0;i<sue.apps.synced.sync.length&&sue.apps.synced.sync.length>0;i++){
			_selectDevice.appendChild(sue.apps.domCreate("option",null,null,null,null,sue.apps.synced.sync[i].deviceName));
		}

		if(sue.apps.synced.sync.length<1){
			_spanSwitch.textContent=sue.apps.i18n("app_synced_nodevice");
		}else{
			_selectDevice.removeEventListener("change",this,false);
			_selectDevice.addEventListener("change",this,false);			
		}
		
		let _ul=sue.apps.domCreate("ul");
		for(var i=0;sue.apps.synced.sync.length>0&&i<sue.apps.synced.sync[0].sessions.length;i++){
			var theobj=sue.apps.synced.sync[0].sessions[i].window.tabs;
			for(var ii=0;ii<theobj.length;ii++){
				var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_synced_li"]},null,null,{setName:["id"],setValue:[theobj[ii].sessionId]},theobj[ii].title);
				_ul.appendChild(_li);
				_li.removeEventListener("click",this,false);
				_li.addEventListener("click",this,false);
			}
		}
		_box.appendChild(_ul);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_synced_li")){
					chrome.runtime.sendMessage({type:"appsAction",app:"synced",action:"openItem",value:e.target.dataset.id});
					if(sue.apps.synced.config.n_closebox){
						sue.apps.boxClose(e)
					}
				}
				break;
			case"change":
				this.deviceChange(e);
				break;
		}
	},
	deviceChange:function(e){
		var domBox=sue.apps.getAPPboxEle(e).querySelector(".su_synced_box");
			domBox.textContent="";
		var sessionId=e.target.selectedIndex;
		var domUL=sue.apps.domCreate("ul");
		for(var i=0;i<sue.apps.synced.sync[sessionId].sessions.length;i++){
			var theobj=sue.apps.synced.sync[sessionId].sessions[i].window.tabs;
			for(var ii=0;ii<theobj.length;ii++){
				var domli=sue.apps.domCreate("li",{setName:["className"],setValue:["su_synced_li"]},null,null,{setName:["id"],setValue:[theobj[ii].sessionId]},theobj[ii].title);
				domUL.appendChild(domli);
				domli.removeEventListener("click",this,false);
				domli.addEventListener("click",this,false);
			}
		}
		domBox.appendChild(domUL)
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"synced"},function(response){
	sue.apps.synced.config=response.config;
	sue.apps.synced.sync=response.value.sync;
	sue.apps.synced.initUI()
})
