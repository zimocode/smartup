console.log("autoreload");
sue.apps.autoreload={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"autoreload",
			headTitle:"autoreload",
			headCloseBtn:true
		}
		sue.apps.init();
		var dom=sue.apps.initBox(appInfo);
			dom.id="su_apps_"+appInfo.appName;
		sue.apps[appInfo.appName].dom=dom;
		sue.apps.initPos(dom);

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_autoreload_box"]});
		dom.querySelector(".su_main").appendChild(theAppBox);

		let _textDes=sue.apps.domCreate("div",null,null,"text-align:left;",null,sue.apps.i18n("autoreload_interval")),
			_text=sue.apps.domCreate("input",{setName:["id","type","min","value"],setValue:["su_autoreload_interval","number","1","10"]}),

			_divCache=sue.apps.domCreate("div",null,null,"text-align:left;"),
			_checkCache=sue.apps.domCreate("input",{setName:["id","type","checked"],setValue:["su_autoreload_cache","checkbox",false]}),
			_labelCache=sue.apps.domCreate("label",{setName:["for"],setValue:["su_autoreload_cache"]},null,null,null,sue.apps.i18n("autoreload_cache")),
			_divIcon=sue.apps.domCreate("div",null,null,"text-align:left;"),
			_checkIcon=sue.apps.domCreate("input",{setName:["id","type","checked"],setValue:["su_autoreload_icon","checkbox",true]}),
			_labelIcon=sue.apps.domCreate("label",{setName:["for"],setValue:["su_autoreload_icon"]},null,null,null,sue.apps.i18n("autoreload_icon")),

			_btn=sue.apps.domCreate("div",{setName:["id"],setValue:["su_autoreload_btnbox"]}),
			_btnStart=sue.apps.domCreate("button",{setName:["className","id"],setValue:["btn","start"]},null,null,null,sue.apps.i18n("btn_start")),
			_btnStop=sue.apps.domCreate("button",{setName:["className","id"],setValue:["btn","stop"]},null,null,null,sue.apps.i18n("btn_stop")),

			_des=sue.apps.domCreate("div",{setName:["id"],setValue:["su_autoreload_desbox"]},null,null,null,"*"+"Click the button 'STOP' or close current tab to disable the auto reload"),

			_countdownBox=sue.apps.domCreate("div",{setName:["id"],setValue:["su_autoreload_countdownbox"]}),
			_countdown=sue.apps.domCreate("span",{setName:["id"],setValue:["su_autoreload_countdown"]},null,null,null,"0"),
			_divLeft=sue.apps.domCreate("div",{setName:["id"],setValue:["su_autoreload_divleft"]});
		_divLeft.appendChild(_textDes);
		_divLeft.appendChild(_text);

		_divCache.appendChild(_checkCache);
		_divCache.appendChild(_labelCache);
		_divLeft.appendChild(_divCache);

		_divIcon.appendChild(_checkIcon);
		_divIcon.appendChild(_labelIcon);
		_divLeft.appendChild(_divIcon);

		_btn.appendChild(_btnStart);
		_btn.appendChild(_btnStop);
		_divLeft.appendChild(_btn);

		theAppBox.appendChild(_divLeft);

		_countdownBox.appendChild(_countdown);
		theAppBox.appendChild(_countdownBox);
		theAppBox.appendChild(_des);

		if(sue.apps.autoreload.value&&sue.apps.autoreload.tabId&&sue.apps.autoreload.value[sue.apps.autoreload.tabId]&&sue.apps.autoreload.value[sue.apps.autoreload.tabId].timeRemain){
			sue.apps.autoreload.timeRemain=sue.apps.autoreload.value[sue.apps.autoreload.tabId].timeRemain-1;
			sue.apps.autoreload.timerOn();
		}
		dom.addEventListener("click",this.handleEvent,false);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("btn")){
					chrome.runtime.sendMessage({type:"appsAction",app:"autoreload",action:"reload",value:{type:e.target.id,interval:parseInt(sue.apps.autoreload.dom.querySelector("#su_autoreload_interval").value),iconCountdown:sue.apps.autoreload.dom.querySelector("#su_autoreload_icon").checked,bypassCache:sue.apps.autoreload.dom.querySelector("#su_autoreload_cache").checked}});
					if(e.target.id=="start"){
						sue.apps.autoreload.timerClear();
						sue.apps.autoreload.timeRemain=parseInt(sue.apps.autoreload.dom.querySelector("#su_autoreload_interval").value);
						sue.apps.autoreload.timerOn();						
					}else{
						sue.apps.autoreload.timerClear();
					}
				}
		}
	},
	timerOn:function(){
		let _countdown=sue.apps.autoreload.dom.querySelector("#su_autoreload_countdown");
		_countdown.textContent=sue.apps.autoreload.timeRemain;
		sue.apps.autoreload.timer=window.setInterval(function(){
			sue.apps.autoreload.timeRemain--;
			_countdown.textContent=sue.apps.autoreload.timeRemain;
		},1000)
	},
	timerClear:function(){
		window.clearInterval(sue.apps.autoreload.timer);
	}
}
chrome.runtime.sendMessage({type:"appsAction",app:"autoreload",action:"getConf"},function(response){
	sue.apps.autoreload.config=response.config;
	sue.apps.autoreload.value=response.value;
	sue.apps.autoreload.tabId=response.tabId;
	sue.apps.autoreload.initUI();
})
