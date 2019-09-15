console.log("tbkjx");
sue.apps.tbkjx={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"tbkjx",
			headTitle:"tbkjx",
			headCloseBtn:true
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
			listMore=sue.apps.domCreate("div",{setName:["className"],setValue:["su_tbkjx_listmore"]});

		let boxSearch=sue.apps.domCreate("div",{setName:["className"],setValue:["su_tbkjx_boxsearch"]});
		boxSearch.appendChild(sue.apps.domCreate("input",{setName:["id","placeholder","type"],setValue:["su_tbkjx_searchkey","键入关键字搜索","text"]},null,null,null));
		boxSearch.appendChild(sue.apps.domCreate("button",{setName:["id"],setValue:["su_tbkjx_search"]},null,null,null,"搜索"));

		let headSpan=sue.apps.domCreate("span",{setName:["className"],setValue:["su_tbkjx_headspan"]},null,null,null,"1.部分商品由于商家调价，价格有一定变化\n2.只买对的，不买便宜的(*^_^*)")

		listHead.appendChild(boxSearch);
		listHead.appendChild(headSpan);

		boxList.appendChild(listHead);
		boxList.appendChild(listJing);
		boxList.appendChild(listMore);

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
	initList:function(data){
		sue.apps.tbkjx.cons.curData=data;
		let _dom=sue.apps.tbkjx.dom.querySelector(".su_tbkjx_listjing");
		data.length==0?_dom.textContent="无匹配的商品":_dom.textContent="";
		// _dom.textContent="";
		let _listUL=sue.apps.domCreate("ul");
		_dom.appendChild(_listUL);
		for(var i=0;i<data.length;i++){
			_listUL.appendChild(sue.apps.domCreate("li",{setName:["className","title"],setValue:["su_tbkjx_listitem",data[i][0]]},null,null,{setName:["id"],setValue:[i]},data[i][0]));
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
		sue.apps.tbkjx.initList(newData);
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
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse) {
	switch(message.type){
		case"data":
			sue.apps.tbkjx.cons.data=message.value.data;
			sue.apps.tbkjx.initList(message.value.data);
			break;
	}
});
sue.apps.tbkjx.initUI();