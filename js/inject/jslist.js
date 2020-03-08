//console.log("jslist");
sue.apps.jslist={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"jslist",
			headTitle:"jslist",
			headCloseBtn:true,
			menu:[
				{src:"/image/options.png",title:"app_tip_opt",className:"menu_item menu_item_opt"},
				{src:"/image/edit.png",title:"homepage_editmode",className:"menu_item menu_item_edit"}
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

		let _ul=sue.apps.domCreate("ul",{setName:["className"],setValue:["su_jslist_ulenabled"]});
		let _jsAll=sue.apps.jslist.js,
			_enabled=sue.apps.jslist.config.enabled;
		for(var i=0;i<_enabled.length;i++){
			for(var ii=0;ii<_jsAll.length;ii++){
				if(_enabled[i]==ii.toString()){
					var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_jslist_li"]},null,null,{setName:["id"],setValue:[ii]});
					var _div=sue.apps.domCreate("div",{setName:["className"],setValue:["su_jslist_li su_jslist_item"]},null,null,{setName:["id"],setValue:[ii]},_jsAll[ii].name);
					_li.appendChild(_div);
					_ul.appendChild(_li);
					continue;
				}
			}
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
					if(sue.apps.jslist.config.n_closebox&&!sue.apps.jslist.cons.editMode){
						sue.apps.boxClose(e);
					}
					chrome.runtime.sendMessage({type:"appsAction",app:"jslist",action:"jsRun",value:e.target.dataset.id})
				}else if(e.target.classList.contains("menu_item_edit")){
					sue.apps.jslist.editMode(e)
				}
		}
	},
	editMode:function(e){
		if(e.target.classList.contains("su_jslist_editmode")){
			e.target.classList.remove("su_jslist_editmode");
			sue.apps.jslist.cons.editMode=false;
			sue.apps.getAPPboxEle(e).querySelector(".su_title").textContent=sue.apps.i18n("jslist");
			sue.apps.jslist.editModeClear(e);
		}else{
			e.target.classList.add("su_jslist_editmode");
			sue.apps.jslist.cons.editMode=true;
			sue.apps.getAPPboxEle(e).querySelector(".su_title").textContent=sue.apps.i18n("jslist")+" ("+sue.apps.i18n("homepage_editmode")+")";
			sue.apps.jslist.editModeInit(e);
		}
	},
	editModeInit:function(e){
		let _ulenabled=sue.apps.getAPPboxEle(e).querySelector(".su_jslist_ulenabled");
		_ulenabled.classList.add("su_jslist_ulenabled_before");

		let _uldisabled=sue.apps.domCreate("ul",{setName:["className"],setValue:["su_jslist_uldisabled"]});
		let _jsAll=sue.apps.jslist.js,
			_enabled=sue.apps.jslist.config.enabled;
		for(var i=0;i<_jsAll.length;i++){
			if(!_enabled.contains(i)){
				var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_jslist_li"]},null,null,{setName:["id"],setValue:[i]});
				var _div=sue.apps.domCreate("div",{setName:["className"],setValue:["su_jslist_li su_jslist_item"]},null,null,{setName:["id"],setValue:[i]},_jsAll[i].name);
				_li.appendChild(_div);
				_uldisabled.appendChild(_li);	
			}
		}
		sue.apps.getAPPboxEle(e).querySelector(".su_jslist_box").appendChild(_uldisabled);
		sue.apps.jslist.cons.sortDomEnabled=Sortable.create(_ulenabled,{
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
				let _lis=e.target.querySelectorAll("li.su_jslist_li");
				let _arr=[];
				for(var i=0;i<_lis.length;i++){
					_arr.push(_lis[i].dataset.id);
				}
				console.log(_arr);
				sue.apps.jslist.config.enabled=_arr;
				sue.apps.jslist.saveConf();
			},
			onAdd:function(e){
				console.log(e);
				let _lis=e.target.querySelectorAll("li.su_jslist_li");
				let _arr=[];
				for(var i=0;i<_lis.length;i++){
					_arr.push(_lis[i].dataset.id);
				}
				console.log(_arr);
				sue.apps.jslist.config.enabled=_arr;
				sue.apps.jslist.saveConf();
			}
		})
		sue.apps.jslist.cons.sortDomDisabled=Sortable.create(_uldisabled,{
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
		let _ulenabled=sue.apps.getAPPboxEle(e).querySelector(".su_jslist_ulenabled"),
			_uldisabled=sue.apps.getAPPboxEle(e).querySelector(".su_jslist_uldisabled");
		_ulenabled.classList.remove("su_jslist_ulenabled_before");
		_uldisabled.remove();
		sue.apps.jslist.cons.sortDomEnabled.destroy();
		sue.apps.jslist.cons.sortDomDisabled.destroy();
		sue.apps.initPos(e);
	},
	saveConf:function(){
		console.log(sue.apps.jslist.config)
		chrome.runtime.sendMessage({type:"apps_saveconf",apptype:"jslist",config:sue.apps.jslist.config});
	},
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"jslist"},function(response){
	sue.apps.jslist.config=response.config;
	sue.apps.jslist.js=response.value.js;
	if(response.config.enabled){
		sue.apps.jslist.config.enabled=response.config.enabled
	}else{
		sue.apps.jslist.config.enabled=[];
		for(var i=0;i<sue.apps.jslist.js.length;i++){
			sue.apps.jslist.config.enabled.push(i.toString());
		}
	}
	sue.apps.jslist.initUI();
})
