// console.log("homepage");
sue.apps.homepage={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"homepage",
			headTitle:"homepage",
			headCloseBtn:true,
			menu:[
				{src:"/image/menu.svg",title:"app_homepage_list",className:"menu_item menu_item_homepagelist"},
				{src:"/image/options.png",title:"app_tip_opt",className:"menu_item menu_item_opt"},
				{src:"/image/edit.png",title:"app_homepage_edit",className:"menu_item menu_item_homepageedit"}
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

		// 
		let _listBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_listbox"]});
		dom.appendChild(_listBox);

		let _listName=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_listnamebox"]},null,null,null,"网站分组");
		_listBox.appendChild(_listName);

		let _listAddBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_listaddbox"]}),

			_listAddBtnbox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_listaddbtnbox"]},null,"background:url("+chrome.runtime.getURL("image/add.svg")+") no-repeat 2px 5px;padding:10px 32px;",null,"Add an new group"),
			_listAddBtnimg=sue.apps.domCreate("img",{setName:["className","src"],setValue:["su_homepage_listaddbtnimg",chrome.runtime.getURL("image/add.svg")]}),
			_listAddBtnspan=sue.apps.domCreate("span",{setName:["className"],setValue:["su_homepage_listaddbtnspan"]},null,null,null,"Add an new group"),

			_listAddValuebox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_listaddvaluebox"]}),
			_listAddValuetext=sue.apps.domCreate("input",{setName:["className","type"],setValue:["su_homepage_listaddtext","text"]}),
			_listAddValuebtn=sue.apps.domCreate("button",{setName:["className"],setValue:["su_homepage_listaddbtn"]},null,null,null,"确定");
		// _listAddBtnbox.appendChild(_listAddBtnimg);
		// _listAddBtnbox.appendChild(_listAddBtnspan);

		_listAddValuebox.appendChild(_listAddValuetext);
		_listAddValuebox.appendChild(_listAddValuebtn);

		_listAddBox.appendChild(_listAddBtnbox);
		_listAddBox.appendChild(_listAddValuebox);

		let _listItemBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_listitembox"]});

		_listBox.appendChild(_listAddBox);
		_listBox.appendChild(_listItemBox);

		sue.apps.homepage.listInit();

		// 

		if(sue.apps.homepage.config.n_homepage_bg){
			dom.querySelector(".su_head").style.background="none";
			dom.querySelector(".su_main").style.cssText+="background:none;box-shadow:rgba(0,0,0,0.8) 0 0 5px;";
			dom.style.cssText+="background-color:#ccc;background-size:cover;border-color:rgba(252, 252, 252, 0);";
			chrome.runtime.sendMessage({type:"appsAction",app:"homepage",action:"getImageURL"});
		}

		// sue.apps.homepage.itemInit(0);
		dom.addEventListener("click",this.handleEvent,false);
	},
	listInit:function(){
		let _dom=sue.apps.homepage.dom.querySelector(".su_homepage_listitembox");
		let _ul=sue.apps.domCreate("ul",{setName:["className"],setValue:["su_homepage_listul"]});
		_dom.textContent="";
		let _groups=sue.apps.homepage.config.sitegroup.slice(0);
		_groups.unshift(sue.apps.i18n("apps_homepage_grouptopsites"));
		for(var i=0;i<_groups.length;i++){
			var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_homepage_listli"]},null,null,{setName:["id"],setValue:[i]},_groups[i]);
			_ul.appendChild(_li);
		}
		_dom.appendChild(_ul);
		sue.apps.homepage.listSwitch(0)
	},
	listSwitch:function(id){
		sue.apps.homepage.itemInit(id);
		let _lis=sue.apps.homepage.dom.querySelectorAll(".su_homepage_listul li");
		for(var i=0;i<_lis.length;i++){
			if(i==Number(id)){
				_lis[i].classList.add("su_homepage_listlicur");
			}else{
				_lis[i].classList.remove("su_homepage_listlicur");
			}
		}
		sue.apps.homepage.listShow();
	},
	listAdd:function(e){
		let _domAdd=e.target.parentNode;
		_domAdd.style.display=window.getComputedStyle(_domAdd).display=="none"?"block":"none";

		let _value=e.target.parentNode.querySelector(".su_homepage_listaddtext").value;
		if(_value){
			sue.apps.homepage.config.sitegroup.push(_value);
			sue.apps.homepage.saveConf();
			sue.apps.homepage.listInit();
			sue.apps.homepage.listSwitch(sue.apps.getAPPboxEle(e).querySelectorAll(".su_homepage_listul li").length-1);
		}
	},
	listDel:function(){},
	listShow:function(e){
		let _dom=(e?sue.apps.getAPPboxEle(e):false)||sue.apps.homepage.dom;
			_dom=_dom.querySelector(".su_homepage_listbox");
		_dom.style.display=window.getComputedStyle(_dom).display=="none"?"block":"none";
	},
	saveConf:function(){
		chrome.runtime.sendMessage({type:"apps_saveconf",apptype:"homepage",config:sue.apps.homepage.config},function(response){});
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_homepage_item")){
					chrome.runtime.sendMessage({type:"appsAction",app:"homepage",action:"openItem",value:e.target.dataset.url})
					if(sue.apps.homepage.config.n_closebox){
						sue.apps.boxClose(e);
					}
				}else if(e.target.classList.contains("su_homepage_listli")){
					sue.apps.homepage.listSwitch(Number(e.target.dataset.id));
				}else if(e.target.classList.contains("su_homepage_listaddbtnbox")){
					sue.apps.homepage.showAddbox(e);
				}else if(e.target.classList.contains("su_homepage_listaddbtn")){
					sue.apps.homepage.listAdd(e);
				}else if(e.target.classList.contains("menu_item_homepagelist")){
					sue.apps.homepage.listShow(e);
				}else if(e.target.classList.contains("menu_item_homepageedit")){
					sue.apps.homepage.editMode(e)
				}
		}
	},
	editMode:function(e){
		if(e.target.classList.contains("su_homepage_editmode")){
			e.target.classList.remove("su_homepage_editmode");
			sue.apps.homepage.cons.editMode=false;
		}else{
			e.target.classList.add("su_homepage_editmode");
			sue.apps.homepage.cons.editMode=true;
		}
		let _dom=sue.apps.homepage.dom.querySelector(".su_homepage_box ul");
		if(sue.apps.homepage.cons.editMode){
			let _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_homepage_li su_homepage_item su_homepage_itemadd"]});
			_li.appendChild(sue.apps.domCreate("div",null,null,"text-align:center",null,"+"));
			_dom.appendChild(_li);
		}else{
			let _li=_dom.querySelector(".su_homepage_itemadd");
			_li.remove();
		}
	},
	showAddbox:function(e){
		let _dom=e.target.parentNode.querySelector(".su_homepage_listaddvaluebox");
		
		_dom.style.display=window.getComputedStyle(_dom).display=="none"?"block":"none";
	},
	itemInit:function(id){
		console.log(id);
		let _dom=sue.apps.homepage.dom.querySelector(".su_homepage_box");
		let _ul=sue.apps.domCreate("ul");
		_dom.textContent="";
		let sites=sue.apps.homepage.config.sites.slice(0);
		sites.unshift(sue.apps.homepage.topSites);
		if(!sites[id]){return false;}
		for(var i=0;i<sites[id].length;i++){
			var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_homepage_li su_homepage_item"]},null,null,{setName:["url"],setValue:[sites[id][i].url]});
			var _div=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_item"]},null,null,{setName:["url"],setValue:[sites[id][i].url]});
			if(sue.apps.homepage.config.n_homepage_icon){
				var _img=sue.apps.domCreate("img",{setName:["className","src"],setValue:["su_homepage_item","https://www.google.com/s2/favicons?domain="+sites[id][i].url]},null,null,{setName:["url"],setValue:[sites[id][i].url]});
			}
			var _span=sue.apps.domCreate("span",{setName:["className"],setValue:["su_homepage_item"]},null,null,{setName:["url"],setValue:[sites[id][i].url]},sites[id][i].title)
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