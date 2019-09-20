console.log("tbkjx");
sue.apps.tbkjx={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"tbkjx",
			headTitle:"tbkjx",
			headCloseBtn:true,
			menu:[
				{src:"/image/options.png",title:"app_tip_opt",className:"menu_item menu_item_opt"}
			],
			options:[
				{type:"range",label:"app_tbkjx_num",name:"n_num",min:10,max:100,step:10},
			]
		}
		sue.apps.init();
		var dom=sue.apps.initBox(appInfo);
			dom.id="su_apps_"+appInfo.appName;
		sue.apps[appInfo.appName].dom=dom;
		sue.apps.initPos(dom);

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_tbkjx_box"]});
		dom.querySelector(".su_main").appendChild(theAppBox);

		let boxContent=sue.apps.domCreate("div",{setName:["className"],setValue:["su_tbkjx_boxcontent"]});
		boxContent.appendChild(sue.apps.domCreate("img",{setName:["src"],setValue:[chrome.runtime.getURL("/image/loading.gif")]},null,"margin: 100px 140px;"));

		let boxList=sue.apps.domCreate("div",{setName:["className"],setValue:["su_tbkjx_boxlist"]}),
			listHead=sue.apps.domCreate("div",{setName:["className"],setValue:["su_tbkjx_listhead"]}),
			listJing=sue.apps.domCreate("div",{setName:["className"],setValue:["su_tbkjx_listjing"]}),
			listBottom=sue.apps.domCreate("div",{setName:["className"],setValue:["su_tbkjx_listbottom"]});

		let boxSearch=sue.apps.domCreate("div",{setName:["className"],setValue:["su_tbkjx_boxsearch"]});
		boxSearch.appendChild(sue.apps.domCreate("input",{setName:["id","placeholder","type"],setValue:["su_tbkjx_searchkey","键入关键字搜索","text"]},null,null,null));
		boxSearch.appendChild(sue.apps.domCreate("button",{setName:["id"],setValue:["su_tbkjx_search"]},null,null,null,"搜索"));

		let headSpan=sue.apps.domCreate("span",{setName:["className"],setValue:["su_tbkjx_headspan"]},null,null,null,"1.部分商品由于商家调价，价格有一定变化\n2.只买对的，不买便宜的(*^_^*)")

		let _bottomPre=sue.apps.domCreate("button",{setName:["id","className","title"],setValue:["su_tbkjx_btnpre","su_tbkjx_page","上一页"]},null,null,null,"<"),
			_bottomHome=sue.apps.domCreate("button",{setName:["id","className","title"],setValue:["su_tbkjx_btnhome","su_tbkjx_page","第一页"]},null,"width:40px;margin:0 4px;",{setName:["page"],setValue:["0"]},"□"),
			_bottomNext=sue.apps.domCreate("button",{setName:["id","className","title"],setValue:["su_tbkjx_btnnext","su_tbkjx_page","下一页"]},null,null,null,">");
		listBottom.appendChild(_bottomPre);
		listBottom.appendChild(_bottomHome);
		listBottom.appendChild(_bottomNext);

		listHead.appendChild(boxSearch);
		listHead.appendChild(headSpan);

		boxList.appendChild(listHead);
		boxList.appendChild(listJing);
		boxList.appendChild(listBottom);

		theAppBox.appendChild(boxContent);
		theAppBox.appendChild(boxList);

		chrome.runtime.sendMessage({type:"appsAction",app:"tbkjx",action:"getData",value:"jingxuan"})

		dom.style.cssText+="border-color:#2b2b34;";
		dom.querySelector(".su_head").style.cssText+="background-color:#2b2b34;";
		dom.addEventListener("click",this.handleEvent,false);
		dom.addEventListener("keypress",this.handleEvent,false);
	},
	itemInit:function(data){
		let _dom=sue.apps.tbkjx.dom.querySelector(".su_main .su_tbkjx_boxcontent");
		_dom.textContent="";
		let _img=sue.apps.domCreate("img",{setName:["className","src"],setValue:["su_tbkjx_img",data[1]]}),
			_name=sue.apps.domCreate("div",{setName:["className","title"],setValue:["su_tbkjx_name",data[0]]},null,null,null,data[0]),

			_spanPrice=sue.apps.domCreate("span",{setName:["className"],setValue:["su_tbkjx_spanprice su_tbkjx_open"]},null,null,{setName:["link"],setValue:[data[3]]},"券后价"),
			_price=sue.apps.domCreate("span",{setName:["className"],setValue:["su_tbkjx_price su_tbkjx_open"]},null,null,{setName:["link"],setValue:[data[3]]},"￥"+data[2]),
			_buy=sue.apps.domCreate("span",{setName:["className"],setValue:["su_tbkjx_buy su_tbkjx_open"]},null,null,{setName:["link"],setValue:[data[3]]},"前往领券"),

			_btnBox=sue.apps.domCreate("button",{setName:["className"],setValue:["su_tbkjx_btnbox su_tbkjx_open"]},null,null,{setName:["link"],setValue:[data[3]]});

		_btnBox.appendChild(_spanPrice);
		_btnBox.appendChild(_price);
		_btnBox.appendChild(_buy);

		_dom.appendChild(_img);
		_dom.appendChild(_name);
		_dom.appendChild(_btnBox);
	},
	initList:function(data,page){
		sue.apps.tbkjx.cons.curData=data;
		////
			let _listLength=sue.apps.tbkjx.config.n_num;
			let _page=page;
			let _pagePre=_page=="0"?"-1":(page-1),
				_pageNext=_page==parseInt(data.length/_listLength)?"-1":Number(_page)+1;
			data=data.slice(_page*_listLength,(_page*_listLength+_listLength));

			sue.apps.tbkjx.dom.querySelector("#su_tbkjx_btnpre").dataset.page=_pagePre;
			sue.apps.tbkjx.dom.querySelector("#su_tbkjx_btnnext").dataset.page=_pageNext;
			_pagePre==-1?sue.apps.tbkjx.dom.querySelector("#su_tbkjx_btnpre").disabled=true:sue.apps.tbkjx.dom.querySelector("#su_tbkjx_btnpre").disabled=false;
			_pageNext==-1?sue.apps.tbkjx.dom.querySelector("#su_tbkjx_btnnext").disabled=true:sue.apps.tbkjx.dom.querySelector("#su_tbkjx_btnnext").disabled=false;

			sue.apps.tbkjx.dom.querySelector(".su_tbkjx_boxlist").scrollIntoView();

		////
		let _dom=sue.apps.tbkjx.dom.querySelector(".su_tbkjx_listjing");
		_dom.textContent="";
		let _listUL=sue.apps.domCreate("ul");
		_dom.appendChild(_listUL);
		if(data.length==0){
			_listUL.textContent="无匹配的商品";
			return false;
		}
		for(var i=0;i<data.length;i++){
			_listUL.appendChild(sue.apps.domCreate("li",{setName:["className","title"],setValue:["su_tbkjx_listitem",data[i][0]]},null,null,{setName:["id"],setValue:[i+_page*_listLength]},data[i][0]));
		}

		sue.apps.tbkjx.itemSwitch(_dom.querySelector("li"));
		sue.apps.tbkjx.itemInit(data[0]);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("xxx")){
					chrome.runtime.sendMessage({type:"appsAction",app:"tbkjx",action:"openApp",value:e.target.dataset.id})
					if(sue.apps.tbkjx.config.n_closebox){
						sue.apps.boxClose(e);
					}
				}
				if(e.target.classList.contains("su_tbkjx_listitem")){
					sue.apps.tbkjx.itemSwitch(e.target);
				}
				if(e.target.classList.contains("su_tbkjx_open")){
					sue.apps.tbkjx.itemOpen(e.target.dataset.link);
				}
				if(e.target.id=="su_tbkjx_search"){
					sue.apps.tbkjx.itemSearch();
				}
				if(e.target.classList.contains("su_tbkjx_page")){
					sue.apps.tbkjx.initList(sue.apps.tbkjx.cons.curData,e.target.dataset.page);
				}
				break
			case"keypress":
				if(e.keyCode==13){
					sue.apps.tbkjx.itemSearch();
				}
				break
		}
	},
	itemSearch:function(){
		console.log("itemSearch")
		let _key=sue.apps.tbkjx.dom.querySelector("#su_tbkjx_searchkey").value;
		console.log(_key);
		let newData=[],
			data=sue.apps.tbkjx.cons.data;
		for(var i=0;i<data.length;i++){
			if(data[i][0].indexOf(_key)!=-1){
				newData.push(data[i]);
			}
		}
		sue.apps.tbkjx.initList(newData,0);
	},
	itemSwitch:function(ele){
		sue.apps.tbkjx.itemInit(sue.apps.tbkjx.cons.curData[ele.dataset.id]);
		let items=ele.parentNode.querySelectorAll("li");
		for(var i=0;i<items.length;i++){
			items[i].classList.remove("su_tbkjx_listcurrent");
		}
		ele.classList.add("su_tbkjx_listcurrent");
	},
	itemOpen:function(link){
		chrome.runtime.sendMessage({type:"appsAction",app:"tbkjx",action:"itemOpen",value:link});
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"tbkjx"},function(response){
	sue.apps.tbkjx.config=response.config;
	sue.apps.tbkjx.initUI();
})
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse) {
	switch(message.type){
		case"data":
			sue.apps.tbkjx.cons.data=message.value.data;
			sue.apps.tbkjx.initList(message.value.data,0);
			break;
	}
});
// sue.apps.tbkjx.initUI();