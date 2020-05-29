//console.log("appslist");
sue.apps.appslist={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"appslist",
			headTitle:"appslist",
			headCloseBtn:true,
			menu:[
				{src:"/image/options.png",title:"app_tip_opt",className:"menu_item menu_item_opt"},
				{src:"/image/edit.png",title:"editmode",className:"menu_item menu_item_edit"}
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

		let _ul=sue.apps.domCreate("ul",{setName:["className"],setValue:["su_appslist_ulenabled"]});
		let _conf=sue.apps.appslist.config.enabled;
		for(var i=0;i<_conf.length;i++){
			var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_appslist_li"]},null,null,{setName:["id"],setValue:[_conf[i]]});
			var _div=sue.apps.domCreate("div",{setName:["className"],setValue:["su_appslist_li su_appslist_item"]},null,null,{setName:["id"],setValue:[_conf[i]]},sue.apps.i18n(_conf[i]));
			_li.appendChild(_div);
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
					if(sue.apps.appslist.config.n_closebox&&!sue.apps.appslist.cons.editMode){
						sue.apps.boxClose(e);
					}
				}else if(e.target.classList.contains("menu_item_edit")){
					sue.apps.appslist.editMode(e)
				}
		}
	},
	editMode:function(e){
		if(e.target.classList.contains("su_appslist_editmode")){
			e.target.classList.remove("su_appslist_editmode");
			sue.apps.appslist.cons.editMode=false;
			sue.apps.getAPPboxEle(e).querySelector(".su_title").textContent=sue.apps.i18n("appslist");
			sue.apps.appslist.editModeClear(e);
		}else{
			e.target.classList.add("su_appslist_editmode");
			sue.apps.appslist.cons.editMode=true;
			sue.apps.getAPPboxEle(e).querySelector(".su_title").textContent=sue.apps.i18n("appslist")+" ("+sue.apps.i18n("editmode")+")";
			sue.apps.appslist.editModeInit(e);
		}
	},
	editModeInit:function(e){
		let _ulenabled=sue.apps.getAPPboxEle(e).querySelector(".su_appslist_ulenabled");
		_ulenabled.classList.add("su_appslist_ulenabled_before");

		let _uldisabled=sue.apps.domCreate("ul",{setName:["className"],setValue:["su_appslist_uldisabled"]});
		let _apps=sue.apps.appslist.apps,
			_enabled=sue.apps.appslist.config.enabled;
		for(var i=0;i<_apps.length;i++){
			if(!_enabled.contains(_apps[i])){
				var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_appslist_li"]},null,null,{setName:["id"],setValue:[_apps[i]]});
				var _div=sue.apps.domCreate("div",{setName:["className"],setValue:["su_appslist_li su_appslist_item"]},null,null,{setName:["id"],setValue:[_apps[i]]},sue.apps.i18n(_apps[i]));
				_li.appendChild(_div);
				_uldisabled.appendChild(_li);	
			}
		}
		sue.apps.getAPPboxEle(e).querySelector(".su_appslist_box").appendChild(_uldisabled);
		sue.apps.appslist.cons.sortDomEnabled=Sortable.create(_ulenabled,{
			animation:200,
			easing:"ease-in-out",
			ghostClass:"su_sortable_item",
			chosenClass:"su_sortable_item",
			group: {
				name: 'enabled',
				put: ["disabled"]
			},
			onEnd:function(e){
				console.log(e);
				let _lis=e.target.querySelectorAll("li.su_appslist_li");
				let _arr=[];
				for(var i=0;i<_lis.length;i++){
					_arr.push(_lis[i].dataset.id);
				}
				console.log(_arr);
				sue.apps.appslist.config.enabled=_arr;
				sue.apps.appslist.saveConf();
			},
			onAdd:function(e){
				console.log(e);
				let _lis=e.target.querySelectorAll("li.su_appslist_li");
				let _arr=[];
				for(var i=0;i<_lis.length;i++){
					_arr.push(_lis[i].dataset.id);
				}
				console.log(_arr);
				sue.apps.appslist.config.enabled=_arr;
				sue.apps.appslist.saveConf();
			}
		})
		sue.apps.appslist.cons.sortDomDisabled=Sortable.create(_uldisabled,{
			animation:200,
			easing:"ease-in-out",
			ghostClass:"su_sortable_item",
			chosenClass:"su_sortable_item",
			group: {
				name: 'disabled',
				put: ["enabled"]
			}
		})
		sue.apps.initPos(e);
	},
	editModeClear:function(e){
		let _ulenabled=sue.apps.getAPPboxEle(e).querySelector(".su_appslist_ulenabled"),
			_uldisabled=sue.apps.getAPPboxEle(e).querySelector(".su_appslist_uldisabled");
		_ulenabled.classList.remove("su_appslist_ulenabled_before");
		_uldisabled.remove();
		sue.apps.appslist.cons.sortDomEnabled.destroy();
		sue.apps.appslist.cons.sortDomDisabled.destroy();
		sue.apps.initPos(e);
	},
	saveConf:function(){
		chrome.runtime.sendMessage({type:"apps_saveconf",apptype:"appslist",config:sue.apps.appslist.config});
	},
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"appslist"},function(response){
	sue.apps.appslist.config=response.config;
	sue.apps.appslist.apps=response.value.apps;
	sue.apps.appslist.config.enabled=response.config.enabled?response.config.enabled:sue.apps.appslist.apps;
	sue.apps.appslist.initUI();
})
