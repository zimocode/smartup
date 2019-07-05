console.log("autoreload");
sue.apps.autoreload={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"autoreload",
			headTitle:"autoreload",
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

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_autoreload_box"]});
		dom.querySelector(".su_main").appendChild(theAppBox);

		let _textDes=sue.apps.domCreate("div",null,null,"text-align:left;",null,sue.apps.i18n("autoreload_interval")),
			_text=sue.apps.domCreate("input",{setName:["id","type","min","value"],setValue:["interval","number","1","10"]}),

			_divCache=sue.apps.domCreate("div",null,null,"text-align:left;"),
			_checkCache=sue.apps.domCreate("input",{setName:["id","type"],setValue:["autoreload_cache","checkbox"]}),
			_labelCache=sue.apps.domCreate("label",{setName:["for"],setValue:["autoreload_cache"]},null,null,null,"Bypass cache."),

			_btn=sue.apps.domCreate("div",{setName:["id"],setValue:["btnbox"]}),
			_btnStart=sue.apps.domCreate("button",{setName:["className","id"],setValue:["btn","start"]},null,null,null,sue.apps.i18n("btn_start")),
			_btnStop=sue.apps.domCreate("button",{setName:["className","id"],setValue:["btn","stop"]},null,null,null,sue.apps.i18n("btn_stop")),

			_des=sue.apps.domCreate("div",{setName:["id"],setValue:["desbox"]},null,null,null,"*"+"Click the button 'STOP' or close current tab to disable the auto reload"),

			_countdownBox=sue.apps.domCreate("div",{setName:["id"],setValue:["countdownbox"]}),
			_countdown=sue.apps.domCreate("span",{setName:["id"],setValue:["countdown"]},null,null,null,"0"),
			_divLeft=sue.apps.domCreate("div",{setName:["id"],setValue:["divleft"]});
		_divLeft.appendChild(_textDes);
		_divLeft.appendChild(_text);

		_divCache.appendChild(_checkCache);
		_divCache.appendChild(_labelCache);
		_divLeft.appendChild(_divCache);

		_btn.appendChild(_btnStart);
		_btn.appendChild(_btnStop);
		_divLeft.appendChild(_btn);

		theAppBox.appendChild(_divLeft);

		_countdownBox.appendChild(_countdown);
		theAppBox.appendChild(_countdownBox);
		theAppBox.appendChild(_des);

		dom.addEventListener("click",this.handleEvent,false);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("btn")){
					chrome.runtime.sendMessage({type:"appsAction",app:"autoreload",action:"reload",value:{type:e.target.id,interval:sue.apps.autoreload.dom.querySelector("#interval").value}})
				}
		}
	}
}
// chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"appslist"},function(response){
// 	sue.apps.appslist.config=response.config;
// 	sue.apps.appslist.apps=response.value.apps;
// 	sue.apps.appslist.initUI();
// })
sue.apps.autoreload.initUI();
