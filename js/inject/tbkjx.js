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

		let headSpan=sue.apps.domCreate("span",{setName:["className"],setValue:["su_tbkjx_headspan"]},null,null,null,"1.部分商品由于商家调价，价格有一定变化\n2.只买对的，不买便宜的(*^_^*)");

		let headSort=sue.apps.domCreate("div",{setName:["className"],setValue:["su_tbkjx_sort"]});
		let _sortReset=sue.apps.domCreate("button",{setName:["className"],setValue:["su_tbkjx_sortbtn su_tbkjx_sortreset"]},null,null,null,"默认排序"),
			_sortUp=sue.apps.domCreate("button",{setName:["className"],setValue:["su_tbkjx_sortbtn su_tbkjx_sortup"]},null,"margin:0 5px;",null,"价格由低到高"),
			_sortDn=sue.apps.domCreate("button",{setName:["className"],setValue:["su_tbkjx_sortbtn su_tbkjx_sortdn"]},null,null,null,"价格由高到低");
		headSort.appendChild(_sortReset);
		headSort.appendChild(_sortUp);
		headSort.appendChild(_sortDn);

		let headExtent=sue.apps.domCreate("div",{setName:["className"],setValue:["su_tbkjx_extent"]});
		let _extentSpan=sue.apps.domCreate("span",{setName:["className"],setValue:["su_tbkjx_extentspan"]},null,null,null,"价格范围："),
			_extentFrom=sue.apps.domCreate("input",{setName:["className","id","placeholder","type"],setValue:["su_tbkjx_extenttext","su_tbkjx_extentfrom","最低价","text"]},null,null,null),
			_extentDash=sue.apps.domCreate("span",{setName:["className"],setValue:["su_tbkjx_extenttext"]},null,"font-size:10px;",null,"~"),
			_extentTo=sue.apps.domCreate("input",{setName:["className","id","placeholder","type"],setValue:["su_tbkjx_extenttext","su_tbkjx_extento","最高价","text"]},null,null,null),
			_extentBtn=sue.apps.domCreate("button",{setName:["className","id"],setValue:["su_tbkjx_extentbtn","su_tbkjx_extentbtn"]},null,null,null,"确定");
		headExtent.appendChild(_extentSpan);
		headExtent.appendChild(_extentFrom);
		headExtent.appendChild(_extentDash);
		headExtent.appendChild(_extentTo);
		headExtent.appendChild(_extentBtn);


		let _bottomPre=sue.apps.domCreate("button",{setName:["id","className","title"],setValue:["su_tbkjx_btnpre","su_tbkjx_page","上一页"]},null,null,null,"<"),
			_bottomHome=sue.apps.domCreate("button",{setName:["id","className","title"],setValue:["su_tbkjx_btnhome","su_tbkjx_page","第一页"]},null,"width:40px;margin:0 4px;",{setName:["page"],setValue:["0"]},"□"),
			_bottomNext=sue.apps.domCreate("button",{setName:["id","className","title"],setValue:["su_tbkjx_btnnext","su_tbkjx_page","下一页"]},null,null,null,">"),
			_bottomDes=sue.apps.domCreate("div",{setName:["className"],setValue:["su_tbkjx_des"]},null,null,null,"只买需要的，不买便宜的(*^_^*)");
		listBottom.appendChild(_bottomPre);
		listBottom.appendChild(_bottomHome);
		listBottom.appendChild(_bottomNext);
		listBottom.appendChild(_bottomDes);

		listHead.appendChild(boxSearch);
		// listHead.appendChild(headSpan);
		listHead.appendChild(headSort);
		listHead.appendChild(headExtent);

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
			_name=sue.apps.domCreate("div",{setName:["className","title"],setValue:["su_tbkjx_name",DOMPurify.sanitize(data[0])]},null,null,null,DOMPurify.sanitize(data[0])),

			_spanPrice=sue.apps.domCreate("span",{setName:["className"],setValue:["su_tbkjx_spanprice su_tbkjx_open"]},null,null,{setName:["link"],setValue:[DOMPurify.sanitize(data[3])]},"券后价"),
			_price=sue.apps.domCreate("span",{setName:["className"],setValue:["su_tbkjx_price su_tbkjx_open"]},null,null,{setName:["link"],setValue:[DOMPurify.sanitize(data[3])]},"￥"+DOMPurify.sanitize(data[2])),
			_buy=sue.apps.domCreate("span",{setName:["className"],setValue:["su_tbkjx_buy su_tbkjx_open"]},null,null,{setName:["link"],setValue:[DOMPurify.sanitize(data[3])]},"前往领券"),

			_btnBox=sue.apps.domCreate("button",{setName:["className"],setValue:["su_tbkjx_btnbox su_tbkjx_open"]},null,null,{setName:["link"],setValue:[DOMPurify.sanitize(data[3])]});

		_btnBox.appendChild(_spanPrice);
		_btnBox.appendChild(_price);
		_btnBox.appendChild(_buy);

		_dom.appendChild(_img);
		_dom.appendChild(_name);
		_dom.appendChild(_btnBox);
	},
	initList:function(data,page){
		// sue.apps.tbkjx.cons.curData=data;
		sue.apps.tbkjx.cons.curData=data.slice(0);
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
			_listUL.appendChild(sue.apps.domCreate("li",{setName:["className","title"],setValue:["su_tbkjx_listitem",DOMPurify.sanitize(data[i][0])]},null,null,{setName:["id"],setValue:[i+_page*_listLength]},DOMPurify.sanitize(data[i][0])));
		}

		sue.apps.tbkjx.itemSwitch(_dom.querySelector("li"));
		sue.apps.tbkjx.itemInit(data[0]);
		sue.apps.tbkjx.setSortBtn();
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
				if(e.target.classList.contains("su_tbkjx_sortbtn")){
					let sortType="up";
					if(e.target.classList.contains("su_tbkjx_sortup")){
						sortType="up";
					}else if(e.target.classList.contains("su_tbkjx_sortdn")){
						sortType="dn";
					}else{
						sortType="reset";
					}
					sue.apps.tbkjx.itemSort(sortType);
				}
				if(e.target.classList.contains("su_tbkjx_extentbtn")){
					sue.apps.tbkjx.itemExtent();
				}
				break
			case"keypress":
				if(e.keyCode==13&&e.target.id=="su_tbkjx_searchkey"){
					sue.apps.tbkjx.itemSearch(e.target);
				}else if(e.keyCode==13&&e.target.classList.contains("su_tbkjx_extenttext")){
					sue.apps.tbkjx.itemExtent();
				}
				break
		}
	},
	itemSearch:function(){
		let _dom=sue.apps.tbkjx.dom;
		_dom.querySelector("#su_tbkjx_extentfrom").value="";
		_dom.querySelector("#su_tbkjx_extento").value="";

		let data=sue.apps.tbkjx.cons.data;
		let _keys=_dom.querySelector("#su_tbkjx_searchkey").value.split(" ");
		let _newD=[];
		let arrayDiff=function(arr) {
			let result = [];
			let obj = {};
			for(var i=0;i<arr.length;i++){
				if(!obj[arr[i]]){
					result.push(arr[i]);
					obj[arr[i]]=true;
				}
			}
			return result
		}
		for(var i=0;i<data.length;i++){
			var _num=-1;
			for(var ii=0;ii<_keys.length;ii++){
				if(_keys[ii]==" "){_keys.splice(ii,1);continue;}
				if(data[i][0].indexOf(_keys[ii])!=-1){
					_num++;
				}
			}
			if(_num>-1){
				if(!_newD[_num]){_newD[_num]=[]}
				_newD[_num].push(data[i]);
			}
		}
		let concatArray=_newD[_newD.length-1];
		for(var i=_newD.length-1;i>0;i--){
			concatArray=concatArray.concat(_newD[i-1]);
		}

		let newData=arrayDiff(concatArray);

		sue.apps.tbkjx.cons.curSort="reset";
		sue.apps.tbkjx.cons.reset=newData;
		sue.apps.tbkjx.cons.extentBase=newData;
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
	},
	itemSort:function(sortType){
		let compare=function(type){
			return function(m,n){
				var a = m[2];
				var b = n[2];
				if(type=="up"){
					return a - b;
				}else{
					return b - a;
				}
			}
		}
		if(sortType!="reset"){
			sue.apps.tbkjx.cons[sortType]=sue.apps.tbkjx.cons.curData.sort(compare(sortType));
		}
		sue.apps.tbkjx.initList(sue.apps.tbkjx.cons[sortType],0);
		sue.apps.tbkjx.cons.curSort=sortType;
		sue.apps.tbkjx.setSortBtn();

		// sue.apps.tbkjx.initList(sue.apps.tbkjx.cons.curData.sort(compare(sortType)),0);
	},
	setSortBtn:function(){
		console.log("setSortBtn");
		if(!sue.apps.tbkjx.cons.curSort){sue.apps.tbkjx.cons.curSort="reset"}
		let _btns=sue.apps.tbkjx.dom.querySelectorAll(".su_tbkjx_sortbtn");
		for(var i=0;i<_btns.length;i++){
			if(_btns[i].classList.contains("su_tbkjx_sortbtncur")){
				_btns[i].classList.remove("su_tbkjx_sortbtncur");
			}
			if(_btns[i].classList.contains("su_tbkjx_sort"+sue.apps.tbkjx.cons.curSort)){
				_btns[i].classList.add("su_tbkjx_sortbtncur");
			}
		}
	},
	itemExtent:function(){
		let _dom=sue.apps.tbkjx.dom;
		let _from=Number(_dom.querySelector("#su_tbkjx_extentfrom").value),
			_to=Number(_dom.querySelector("#su_tbkjx_extento").value);
		console.log(_from)

		let newData=[],
			data=sue.apps.tbkjx.cons.extentBase;
		for(var i=0;i<data.length;i++){
			if(_to==0){
				if(Number(data[i][2])>=_from){
					newData.push(data[i]);
				}
			}
			if(Number(data[i][2])>=_from&&Number(data[i][2])<=_to){
				newData.push(data[i]);
			}
		}

		sue.apps.tbkjx.cons.curSort="reset";
		sue.apps.tbkjx.cons.reset=newData;
		sue.apps.tbkjx.cons.curData=newData;
		sue.apps.tbkjx.itemSort(sue.apps.tbkjx.cons.curSort)
		// sue.apps.tbkjx.initList(newData,0);
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
			sue.apps.tbkjx.cons.reset=sue.apps.tbkjx.cons.data.slice(0);
			sue.apps.tbkjx.cons.extentBase=sue.apps.tbkjx.cons.data.slice(0);
			sue.apps.tbkjx.initList(message.value.data,0);
			break;
	}
});
// sue.apps.tbkjx.initUI();