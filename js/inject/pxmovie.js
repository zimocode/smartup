console.log("pxmovie");
sue.apps.pxmovie={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"pxmovie",
			headTitle:"pxmovie",
			headCloseBtn:true,
		}
		sue.apps.init();
		var dom=sue.apps.initBox(appInfo);
			dom.id="su_apps_"+appInfo.appName;
		sue.apps[appInfo.appName].dom=dom;
		sue.apps.initPos(dom);

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_pxmovie_box"]});
		dom.querySelector(".su_main").appendChild(theAppBox);

		theAppBox.appendChild(sue.apps.domCreate("div",{setName:["className"],setValue:["list"]},null,"display:none;"));
		theAppBox.appendChild(sue.apps.domCreate("div",{setName:["className"],setValue:["data"]},null,"display:none;"));
		theAppBox.appendChild(sue.apps.domCreate("img",{setName:["className","src"],setValue:["loading",chrome.runtime.getURL("/image/loading.gif")]}));

		dom.style.cssText+="border-color:#d61717;";
		dom.querySelector(".su_head").style.cssText+="background-color:#d61717;";
		theAppBox.addEventListener("click",this.handleEvent,false);
		chrome.runtime.sendMessage({type:"appsAction",app:"pxmovie",action:"getList"});
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("item")){
					var _list=sue.apps.pxmovie.dom.querySelector(".list"),
						_loading=sue.apps.pxmovie.dom.querySelector(".loading");
					_list.style.cssText+="display:none;";
					_loading.style.cssText+="display:block;";
					chrome.runtime.sendMessage({type:"appsAction",app:"pxmovie",action:"getData",value:e.target.dataset.url});
				}else if(e.target.classList.contains("back")){
					var _list=sue.apps.pxmovie.dom.querySelector(".list"),
						_data=sue.apps.pxmovie.dom.querySelector(".data"),
						_back=sue.apps.pxmovie.dom.querySelector(".back");
					_data.style.cssText+="display:none;";
					_list.style.cssText+="display:block;";
				}
				break;
		}
	},
	list:function(message){
		let value=message.value,
			dom=sue.apps.pxmovie.dom;
		dom=dom.querySelector(".su_pxmovie_box");
		let _boxList=dom.querySelector(".list"),
			_loading=dom.querySelector(".loading"),
			_ul=sue.apps.domCreate("ul");
		_boxList.textContent="";
		_boxList.appendChild(_ul);
		for(var i=0;i<value.length;i++){
			var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["item"]},null,null,{setName:["url"],setValue:[value[i][3]]},"["+value[i][0]+"]"+value[i][2]);
			_ul.appendChild(_li);
		}
		_loading.style.cssText+="display:none;";
		_boxList.style.cssText+="display:block;";
	},
	data:function(message){
		console.log(message)
		let value=message.value,
			dom=sue.apps.pxmovie.dom;
		dom=dom.querySelector(".su_pxmovie_box");
		let _data=dom.querySelector(".data"),
			_loading=dom.querySelector(".loading"),
			_name=sue.domCreate("div",{setName:["className"],setValue:["name"]},null,null,null,value.name),
			_back=sue.apps.domCreate("button",{setName:["className"],setValue:["back"]},null,"display: inline-block;",null,sue.apps.i18n("btn_back"));
			_info=sue.apps.domCreate("div",{setName:["className"],setValue:["info"]});
		_data.textContent="";
		_data.appendChild(_name);
		_data.appendChild(_back);
		_data.appendChild(_info);

		for(var i=0;i<value.info.length;i++){
			var _infolist=sue.apps.domCreate("div")
			_infolist.appendChild(sue.apps.domCreate("span",{setName:["className"],setValue:["infolist"]},null,null,null,value.info[i][0]));
			_infolist.appendChild(sue.apps.domCreate("span",null,null,null,null,value.info[i][(i==7?4:1)]))
			_info.appendChild(_infolist);
		}
		for(var i=0;i<value.dl.length;i++){
			var _dl=sue.apps.domCreate("textarea",{setName:["className","value"],setValue:["url",value.dl[i][1]]});
			_info.appendChild(_dl);
		}
		_info.appendChild(sue.apps.domCreate("div",{setName:["className"],setValue:["des"]},null,null,null,value.des));

		_data.style.cssText+="display:block;";
		_loading.style.cssText+="display:none;";
		console.log(value);
	}
}
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse) {
	switch(message.type){
		case"list":
			sue.apps.pxmovie.list(message);
			break;
		case"data":
			sue.apps.pxmovie.data(message);
			break;
	}
});
sue.apps.pxmovie.initUI();