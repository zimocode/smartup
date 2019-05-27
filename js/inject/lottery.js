console.log("lottery");
sue.apps.lottery={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"lottery",
			headTitle:"lottery",
			headCloseBtn:true
		}
		sue.apps.init();
		var dom=sue.apps.initBox(appInfo);
			dom.id="su_apps_"+appInfo.appName;
		sue.apps[appInfo.appName].dom=dom;
		sue.apps.initPos(dom);

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["lottery_box"]});
		dom.querySelector(".su_main").appendChild(theAppBox);

		chrome.runtime.sendMessage({type:"appsAction",app:"lottery",action:"init"},function(s){
			console.log(s);
		})

		// let _ul=sue.apps.domCreate("ul");
		// let _conf=sue.apps.appslist.apps;
		// for(var i=0;i<_conf.length;i++){
		// 	var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_appslist_li"]},null,null,{setName:["id"],setValue:[_conf[i]]},sue.apps.i18n(_conf[i]));
		// 	_ul.appendChild(_li);
		// }
		// theAppBox.appendChild(_ul);
		// dom.style.cssText+="border-color:#e91e63;";
		// dom.querySelector(".su_head").style.cssText+="background-color:#e91e63;";
		// dom.addEventListener("click",this.handleEvent,false);
	},
	handleEvent:function(e){
		switch(e.type){
			case"change":
				chrome.runtime.sendMessage({type:"appsAction",app:"lottery",action:"getData",value:"19057"})
				break;
		}
	},
	initData:function(message){
		console.log(message.value);
	},
	data:function(message){
		console.log(message.value);
	}
}
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse) {
	console.log(message)
	switch(message.type){
		case"lotteryInit":
			sue.apps.lottery.initData(message);
			break;
		case"lotteryData":
			sue.apps.lottery.data(message);
			break;
	}
});
sue.apps.lottery.initUI();