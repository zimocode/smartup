console.log("rss")
sue.apps.rss={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"rss",
			headTitle:"rss",
			headCloseBtn:true,
			menu:[
				{src:"/image/menu.svg",title:"app_rss_menu",className:"menu_item menu_item_rss"},
				{src:"/image/options.png",title:"app_tip_opt",className:"menu_item menu_item_opt"}
			],
			options:[
				{type:"select",label:"n_optype",name:"n_optype",value:["s_new","s_back","s_current","s_incog"]},
				{type:"select",label:"n_position",name:"n_position",value:["s_default","s_left","s_right","s_head","s_last"]},
				{type:"checkbox",label:"n_pin",name:"n_pin",checked:true},
				{type:"checkbox",label:"n_closebox",name:"n_closebox",checked:true}
			]
		}

		sue.apps.init();
		var dom=sue.apps.initBox(appInfo);
			dom.id="su_apps_"+appInfo.appName;
		sue.apps.rss.dom=dom;
		sue.apps.initPos(dom);

		//rss head
		let _rssHead=sue.apps.domCreate("div",{setName:["className"],setValue:["rss_head"]});
		let _rssTitle=sue.apps.domCreate("span",{setName:["className"],setValue:["su_rss_rsshead"]});
		_rssHead.appendChild(_rssTitle);
		dom.querySelector(".su_main").appendChild(_rssHead);
		//rss box
		let _rssBox=sue.apps.domCreate("div",{setName:["className"],setValue:["rss_box"]});
		let _rssSpan=sue.apps.domCreate("div",null,null,"color: #3698F9;");
		let _rssImg=sue.apps.domCreate("img",null,null,"display: inline-block;margin-bottom: -10px;");
			_rssImg.src=chrome.runtime.getURL("/image/loading.gif");
		_rssBox.appendChild(_rssSpan);
		_rssBox.appendChild(_rssImg);
		dom.querySelector(".su_main").appendChild(_rssBox);
		//sub box
		let _rssSub=sue.apps.domCreate("div",{setName:["className"],setValue:["rss_sub"]});
		let _subBox=sue.apps.domCreate("div",{setName:["className"],setValue:["sub_box"]});
		let _subText=sue.apps.domCreate("input",{setName:["className"],setValue:["sub_text"]});
			_subText.type="text";
			_subText.placeholder=sue.apps.i18n("app_rss_subplace");
		let _subBtn=sue.apps.domCreate("input",{setName:["className"],setValue:["sub_add"]});
			_subBtn.type="button";
			_subBtn.value=sue.apps.i18n("app_rss_new");
		_subBox.appendChild(_subText);
		_subBox.appendChild(_subBtn);
		let _subItem=sue.apps.domCreate("ul",{setName:["className"],setValue:["sub_items"]});
		_rssSub.appendChild(_subBox);
		_rssSub.appendChild(_subItem);
		dom.appendChild(_rssSub);


		if(sue.apps.rss.config.feed&&sue.apps.rss.config.feed.length>0){
			sue.apps.rss.rss(dom,sue.apps.rss.config.feed[0]);
			sue.apps.rss.menu(dom);
		}else{
			dom.querySelector(".rssbox").textContent="there is no sub.";
			sue.apps.rss.showSub(dom)
		}

		dom.style.cssText+="border-color:rgb(255, 102, 0);";
		dom.querySelector(".su_head").style.cssText+="background-color:rgb(255, 102, 0);"
		dom.addEventListener("click",sue.apps.rss.handleEvent,false);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("rss_item")){
					sue.apps.rss.itemOpen(e);
					if(sue.apps.rss.config.n_closebox){
						sue.apps.boxClose(e);
					}
				}
				if(e.target.classList.contains("menu_item_rss")){
					sue.apps.rss.showSub(e);
				}
				if(e.target.classList.contains("sub_item")){
					sue.apps.rss.rssSwitch(e,e.target.dataset.url);
				}
				if(e.target.classList.contains("sub_itemdel")){
					sue.apps.rss.rssDel(e);
				}
				if(e.target.classList.contains("sub_add")){
					sue.apps.rss.rssAdd(e);
				}
				break;
		}
	},
	saveConf:function(){
		console.log("sdf")
		chrome.runtime.sendMessage({type:"apps_saveconf",apptype:"rss",config:sue.apps.rss.config},function(response){})
	},
	fixURL:function(url){
		var fixstrs=["http://","https://"];
		var theFlag=false;
		for(var i=0;i<fixstrs.length;i++){
			if(url.indexOf(fixstrs[i])==0){
				theFlag=true;
				break;
			}
		}
		if(!theFlag){
			return "http://"+url;
		}else{
			return url;
		}
	},
	rssDel:function(e){
		chrome.storage.local.get(function(items){
			var theid=e.target.parentNode.dataset.id;
			if(!items.localConfig.apps.rss.feedtitle[theid]){
			}else{
				items.localConfig.apps.rss.feedtitle.splice(theid,1);
				chrome.storage.local.set(items);
			}
			sue.apps.rss.config.feed.splice(theid,1);
			sue.apps.rss.saveConf();
			e.target.parentNode.remove();
		})
	},
	rssAdd:function(e){
		var dom=sue.apps.getAPPboxEle(e);
		var domadd=dom.querySelector(".sub_text");
		var domlist=dom.querySelector(".sub_items");
		if(!domadd.value){return;}
		var theurl=sue.apps.rss.fixURL(domadd.value);
		var domli=sue.apps.domCreate("li",{setName:["className","title"],setValue:["sub_item",theurl]},null,null,{setName:["url","id"],setValue:[theurl,sue.apps.rss.config.feed.length]},theurl);
		var domdel=sue.apps.domCreate("span",{setName:["className"],setValue:["sub_itemdel"]},null,null,null,"x");
		domli.appendChild(domdel);
		domlist.appendChild(domli);		
		sue.apps.rss.config.feed.push(theurl);
		sue.apps.rss.saveConf();
		domadd.value="";
	},
	rssSwitch:function(e,url){
		var rssheaddom=sue.apps.getAPPboxEle(e).querySelector(".rss_head"),
			rssboxdom=sue.apps.getAPPboxEle(e).querySelector(".rss_box")
		rssheaddom.textContent="";
		rssboxdom.textContent="";
		var _sw_span=sue.apps.domCreate("span");
			_sw_span.textContent="Loading";
			_sw_span.style.cssText+="color: #3698F9;";
		var _sw_img=sue.apps.domCreate("img");
			_sw_img.src=chrome.runtime.getURL("/image/loading.gif");
			_sw_img.style.cssText+="display: inline-block;margin-bottom: -10px;";
		_sw_span.appendChild(_sw_img);
		rssboxdom.appendChild(_sw_span);
		sue.apps.rss.showSub(e);
		sue.apps.rss.rss(e.target,url);
	},
	showSub:function(e){
		var dommenu=sue.apps.getAPPboxEle(e).querySelector(".rss_sub");
		console.log(dommenu)
		var _conf=window.getComputedStyle(dommenu).opacity==0?true:false
		if(_conf){
			dommenu.style.cssText+="display:block;opacity:1;"
		}else{
			dommenu.style.cssText+="display:none;opacity:0;"
		}
	},
	menu:function(dom){
		console.log("subitem")
		var domlist=sue.apps.getAPPboxEle(dom).querySelector(".sub_items");
		domlist.textContent="";
		chrome.storage.local.get(function(items){
			var feed=sue.apps.rss.config.feed;
			var feedtitle=items.localConfig.apps.rss.feedtitle;
			console.log(feedtitle)
			for(var i=0;i<feed.length;i++){
				var domli=sue.apps.domCreate("li",{setName:["className","title"],setValue:["sub_item",feed[i]]},null,null,{setName:["url","id"],setValue:[feed[i],i]},feedtitle[i]?feedtitle[i]:feed[i]);
				var domdel=sue.apps.domCreate("span",{setName:["className"],setValue:["sub_itemdel"]},null,null,null,"x");
				domli.appendChild(domdel);
				domlist.appendChild(domli);
			}
		})
	},
	rss:function(dom,url){
		chrome.runtime.sendMessage({type:"appsAction",app:"rss",action:"getMessage",value:url},function(s){
			console.log(s);
		})
	},
	itemOpen:function(e){
		chrome.runtime.sendMessage({type:"appsAction",app:"rss",action:"openItem",value:e.target.dataset.link},function(response){})
		if(sue.apps.rss.config.n_closebox){
			sue.apps.boxClose(e)
		}
	},
	itemList:function(message,sender,sendResponse){
		console.log(message)
		let data=message.value,
			feedURL=message.feedURL;
		//update rsstitle;
		chrome.storage.local.get(function(items){
			for(var i=0;i<sue.apps.rss.config.feed.length;i++){
				if(sue.apps.rss.config.feed[i]==feedURL){
					items.localConfig.apps.rss.feedtitle[i]=data.title;
					//break;
				}
			}
			chrome.storage.local.set(items);
		})
		sue.apps.rss.menu(sue.apps.rss.dom);

		//rss head
		let rssheaddom=sue.apps.rss.dom.querySelector(".su_main .rss_head");
		rssheaddom.textContent="";

		let _titleImg=sue.apps.domCreate("img");
			_titleImg.src=data.img;
		let _titleLink=sue.apps.domCreate("a");
			_titleLink.href=data.link;
			_titleLink.target="_blank";
			_titleLink.textContent=data.title;
		rssheaddom.appendChild(_titleImg);
		rssheaddom.appendChild(_titleLink);

		let rssdom=sue.apps.rss.dom.querySelector(".rss_box");
			rssdom.textContent="";
		let _ul=sue.apps.domCreate("ul");
		for(var i=0;i<data.items.length;i++){
			var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["rss_item"]},null,null,{setName:["link"],setValue:[data.items[i].link]},data.items[i].title)
			_ul.appendChild(_li);
		}
		rssdom.appendChild(_ul);
		sue.apps.initPos(sue.apps.rss.dom);
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"rss"},function(response){
	console.log(sue.apps.rss);
	sue.apps.rss.config=response.config;
	chrome.storage.local.get(function(items){
		!items.localConfig?(items.localConfig={},items.localConfig.apps={}):null;
		!items.localConfig.apps?items.localConfig.apps={}:null;
		console.log(items)
		if(!items.localConfig.apps.rss||!items.localConfig.apps.rss.feedtitle){
			items.localConfig.apps.rss={
				feedtitle:sue.apps.rss.config.feed
			}
		}else{
			for(var i=0;i<sue.apps.rss.config.feed.length;i++){
				if(!items.localConfig.apps.rss.feedtitle[i]){
					items.localConfig.apps.rss.feedtitle[i]=sue.apps.rss.config.feed[i];
				}
			}	
		}
		chrome.storage.local.set(items);
		sue.apps.rss.initUI();
	})
})
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse) {
	console.log(message)
	switch(message.type){
		case"rssData":
			sue.apps.rss.itemList(message,sender,sendResponse);
			break;
	}
});