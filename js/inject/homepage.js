// console.log("homepage");
sue.apps.homepage={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"homepage",
			headTitle:"homepage",
			headCloseBtn:true,
			menu:[
				{src:"/image/options.png",title:"app_tip_opt",className:"menu_item menu_item_opt"}
			],
			options:[
				{type:"select",label:"n_optype",name:"n_optype",value:["s_new","s_back","s_current","s_incog"]},
				{type:"select",label:"n_position",name:"n_position",value:["s_default","s_left","s_right","s_head","s_last"]},
				{type:"checkbox",label:"n_pin",name:"n_pin",checked:true},
				{type:"checkbox",label:"n_closebox",name:"n_closebox",checked:true},
				{type:"checkbox",label:"n_homepage_icon",name:"n_homepage_icon",checked:true},
				{type:"checkbox",label:"n_homepage_bg",name:"n_homepage_bg",checked:true},
				{type:"checkbox",label:"n_homepage_resize",name:"n_homepage_resize",checked:true}
			]
		}
		sue.apps.init();
		var dom=sue.apps.initBox(appInfo);
			dom.id="su_apps_"+appInfo.appName;
		sue.apps[appInfo.appName].dom=dom;
		sue.apps.initPos(dom);

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_box"]});
		dom.querySelector(".su_main").appendChild(theAppBox);

		if(sue.apps.homepage.config.n_homepage_bg){
			dom.querySelector(".su_head").style.background="none";
			dom.querySelector(".su_main").style.cssText+="background:none;box-shadow:rgba(0,0,0,0.8) 0 0 5px;";
			dom.style.cssText+="background-color:#ccc;background-size:cover;border-color:rgba(252, 252, 252, 0);";
			chrome.runtime.sendMessage({type:"appsAction",app:"homepage",action:"getImageURL"});
		}

		sue.apps.homepage.initItem();
		dom.addEventListener("click",this.handleEvent,false);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_homepage_item")){
					chrome.runtime.sendMessage({type:"appsAction",app:"homepage",action:"openItem",value:e.target.dataset.url})
					if(sue.apps.homepage.config.n_closebox){
						sue.apps.boxClose(e);
					}
				}
		}
	},
	initItem:function(){
		let _dom=sue.apps.homepage.dom.querySelector(".su_homepage_box");
		let _ul=sue.apps.domCreate("ul");
		for(var i=0;i<sue.apps.homepage.topSites.length;i++){
			var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_homepage_li su_homepage_item"]},null,null,{setName:["url"],setValue:[sue.apps.homepage.topSites[i].url]});
			var _div=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_item"]},null,null,{setName:["url"],setValue:[sue.apps.homepage.topSites[i].url]});
			if(sue.apps.homepage.config.n_homepage_icon){
				var _img=sue.apps.domCreate("img",{setName:["className","src"],setValue:["su_homepage_item","https://www.google.com/s2/favicons?domain="+sue.apps.homepage.topSites[i].url]},null,null,{setName:["url"],setValue:[sue.apps.homepage.topSites[i].url]});
			}
			var _span=sue.apps.domCreate("span",{setName:["className"],setValue:["su_homepage_item"]},null,null,{setName:["url"],setValue:[sue.apps.homepage.topSites[i].url]},sue.apps.homepage.topSites[i].title)
			if(sue.apps.homepage.config.n_homepage_icon){
				_div.appendChild(_img);
				_span.style.cssText+="margin-left:24px;";
			}
			_div.appendChild(_span);
			_li.appendChild(_div);
			_ul.appendChild(_li);
		}
		_dom.appendChild(_ul);
	},
	setBackground:function(data){
		let dom=sue.apps.homepage.dom;
		console.log(dom.querySelector(".su_head"));
		dom.style.cssText+="background-image:url("+data.imageURL+");background-size:cover;";
		if(sue.apps.homepage.config.n_homepage_resize){
			dom.style.padding="48px 32px";
			dom.querySelector(".su_head").style.height="168px;";
		}else{
			dom.style.cssText+="padding-bottom:10px;";
		}

		let _cp;
		if(dom.querySelector(".su_homepage_cp")){
			_cp=dom.querySelector(".su_homepage_cp");
			_cp.href=data.copyrightURL;
			_cp.innerText=data.copyrightString;
		}else{
			_cp=sue.apps.domCreate("a",{setName:["className","href","target"],setValue:["su_homepage_cp",data.copyrightURL,"_blank"]},null,null,null,data.copyrightString);
			dom.appendChild(_cp);
		}
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"homepage"},function(response){
	sue.apps.homepage.config=response.config;
	sue.apps.homepage.topSites=response.value;
	sue.apps.homepage.initUI();
})
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	switch(message.type){
		case"imageURL":
			sue.apps.homepage.setBackground(message.value);
			break;
	}
})