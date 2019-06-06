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

		let _typeLabel=sue.apps.domCreate("label",null,null,null,null,sue.apps.i18n("lottery_type")),
			_typeSelect=sue.apps.domCreate("select",{setName:["className"],setValue:["lottery_type"]}),
			_br0=sue.apps.domCreate("br");
			_termLable=sue.apps.domCreate("label",null,null,null,null,sue.apps.i18n("lottery_term")),
			_termSelect=sue.apps.domCreate("select",{setName:["className"],setValue:["lottery_term"]}),
			_br1=sue.apps.domCreate("br");
			_data=sue.apps.domCreate("div",{setName:["className"],setValue:["lottery_data"]});
		let typeArray=["lottery_dlt","lottery_pls","lottery_ssq","lottery_sd"];
		for(var i=0;i<typeArray.length;i++){
			_typeSelect.appendChild(sue.apps.domCreate("option",{setName:["value"],setValue:[typeArray[i]]},null,null,null,sue.apps.i18n(typeArray[i])));
		}
		let _dom=sue.apps.lottery.dom.querySelector(".lottery_box");
			_dom.textContent="";
		_dom.appendChild(_typeLabel);
		_dom.appendChild(_typeSelect);
		_dom.appendChild(_br0);
		_dom.appendChild(_termLable);
		_dom.appendChild(_termSelect);
		_dom.appendChild(_br1);
		_dom.appendChild(_data);
		chrome.runtime.sendMessage({type:"appsAction",app:"lottery",action:"getTerm",value:{type:typeArray[0],term:null}});
		sue.apps.lottery.loading();

		dom.addEventListener("change",this.handleEvent,false);
	},
	handleEvent:function(e){
		switch(e.type){
			case"change":
				chrome.runtime.sendMessage({type:"appsAction",app:"lottery",action:(e.target.classList.contains("lottery_type")?"getTerm":"getData"),value:{type:sue.apps.lottery.dom.querySelector(".lottery_type").value,term:sue.apps.lottery.dom.querySelector(".lottery_term").value}});
				sue.apps.lottery.loading();
				break;
		}
	},
	data:function(message){
		console.log(message);
		let _box=sue.apps.lottery.dom.querySelector(".lottery_data");
		_box.textContent="";
		for(var i=0;i<message.value.length;i++){
			_box.appendChild(sue.apps.domCreate("span",null,null,null,null,message.value[i]));
		}
		let _spans=_box.querySelectorAll("span");
		switch(message.lotteryType){
			case"lottery_dlt":
				_spans[5].style.cssText+="background-color:#35a7d9;";
				_spans[6].style.cssText+="background-color:#35a7d9;";
				break
			case"lottery_ssq":
				_spans[6].style.cssText+="background-color:#35a7d9;";
				break;	
		}
	},
	term:function(message){
		console.log(message.value);
		let _box=sue.apps.lottery.dom.querySelector(".lottery_term");
		_box.textContent="";
		for(var i=0;i<message.value.length;i++){
			_box.appendChild(sue.apps.domCreate("option",{setName:["value"],setValue:[message.value[i]]},null,null,null,message.value[i]));
		}
		chrome.runtime.sendMessage({type:"appsAction",app:"lottery",action:"getData",value:{type:sue.apps.lottery.dom.querySelector(".lottery_type").value,term:sue.apps.lottery.dom.querySelector(".lottery_term").value}});
	},
	loading:function(){
		let _box=sue.apps.lottery.dom.querySelector(".lottery_data");
		_box.textContent="";
		_box.appendChild(sue.apps.domCreate("img",{setName:["src"],setValue:[chrome.runtime.getURL("/image/loading.gif")]}));
	}
}
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse) {
	console.log(message)
	switch(message.type){
		case"data":
			sue.apps.lottery.data(message);
			break;
		case"term":
			sue.apps.lottery.term(message);
			break;
	}
});
sue.apps.lottery.initUI();