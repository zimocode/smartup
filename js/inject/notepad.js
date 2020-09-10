//console.log("notepad");
sue.apps.notepad={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"notepad",
			headTitle:"notepad",
			headCloseBtn:true,
			menu:[
				{src:"/image/options.svg",title:"app_tip_opt",className:"menu_item menu_item_opt"}
			],
			options:[
				{type:"checkbox",label:"n_notepad_delconfirm",name:"n_notepad_delconfirm",checked:true},
				{type:"checkbox",label:"n_notepad_switchsave",name:"n_notepad_switchsave",checked:true}
			]
		}
		sue.apps.init();
		var dom=sue.apps.initBox(appInfo);
			dom.id="su_apps_"+appInfo.appName;
		sue.apps[appInfo.appName].dom=dom;
		sue.apps.initPos(dom);

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_notepad_box"]});
		dom.querySelector(".su_main").appendChild(theAppBox);

		let _boxList=sue.apps.domCreate("div",{setName:["className"],setValue:["su_notepad_list"]}),
			_boxMain=sue.apps.domCreate("div",{setName:["className"],setValue:["su_notepad_main"]});

		let _listUl=sue.apps.domCreate("ul");
		_boxList.appendChild(_listUl);
		_boxList.appendChild(sue.apps.domCreate("button",{setName:["className"],setValue:["su_notepad_btnadd"]},null,null,{setName:["action"],setValue:["add"]},sue.apps.i18n("btn_new")));


		let _txtContent=sue.apps.domCreate("textarea",{setName:["className"],setValue:["su_notepad_content"]}),
			_boxBtn=sue.apps.domCreate("div",{setName:["className"],setValue:["su_notepad_boxbtn"]}),
			_btnSave=sue.apps.domCreate("button",{setName:["className","id"],setValue:["su_notepad_btn su_notepad_btnsave","su_notepad_btnsave"]},null,null,null,sue.apps.i18n("btn_save"));
		_boxMain.appendChild(_txtContent);
		_boxMain.appendChild(_boxBtn);
		_boxBtn.appendChild(_btnSave);

		let _des=sue.apps.domCreate("div",null,null,null,null,"The note are stored at locally without encrypted.");
		_boxBtn.appendChild(_des);

		theAppBox.appendChild(_boxList);
		theAppBox.appendChild(_boxMain);

		//sue.apps.notepad.listInit(dom);
		//sue.apps.notepad.itemInit(dom);

		chrome.runtime.sendMessage({type:"appsAction",app:"notepad",action:"DBAction",value:{method:"get"}});

		dom.style.cssText+="border-color:rgb(128 123 67);";
		dom.querySelector(".su_head").style.cssText+="background-color:rgb(128 123 67);";
		dom.addEventListener("click",this.handleEvent,false);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_notepad_btnadd")){
					sue.apps.notepad.itemAdd(e)
				}else if(e.target.classList.contains("su_notepad_btnsave")){
					sue.apps.notepad.itemSave(e);
				}else if(e.target.classList.contains("su_notepad_listitem")){
					sue.apps.notepad.itemSwitch(e);
				}
		}
	},
	editMode:function(e){
		if(e.target.classList.contains("su_notepad_editmode")){
			e.target.classList.remove("su_notepad_editmode");
			sue.apps.notepad.cons.editMode=false;
			sue.apps.getAPPboxEle(e).querySelector(".su_title").textContent=sue.apps.i18n("notepad");
			sue.apps.notepad.editModeClear(e);
		}else{
			e.target.classList.add("su_notepad_editmode");
			sue.apps.notepad.cons.editMode=true;
			sue.apps.getAPPboxEle(e).querySelector(".su_title").textContent=sue.apps.i18n("notepad")+" ("+sue.apps.i18n("editmode")+")";
			sue.apps.notepad.editModeInit(e);
		}
	},
	saveConf:function(){
		chrome.runtime.sendMessage({type:"apps_saveconf",apptype:"notepad",config:sue.apps.notepad.config});
	},
	itemInit:function(id){
		let data=sue.apps.notepad.cons.message.data.item;
		sue.apps.notepad.dom.querySelector("textarea").value=data[id].content;
		sue.apps.notepad.dom.querySelector(".su_notepad_main button").dataset.id=id;
	},
	itemAdd:function(e){
		sue.apps.notepad.cons.message.data.item.unshift({
			title:sue.apps.i18n("su_notepad_defalut_title"),
			content:sue.apps.i18n("su_notepad_defalut_content")
		});
		chrome.runtime.sendMessage({type:"appsAction",app:"notepad",action:"DBAction",value:{
			method:"put",
			data:{
				id:0,
				item:sue.apps.notepad.cons.message.data.item
			}
		}});
		sue.apps.notepad.listInit();
		sue.apps.notepad.itemSwitch(sue.apps.notepad.dom.querySelectorAll(".su_notepad_list li")[0]);
	},
	itemSave:function(e){
		sue.apps.notepad.cons.message.data.item[parseInt(e.target.dataset.id)].content=sue.apps.getAPPboxEle(e).querySelector("textarea").value;
		chrome.runtime.sendMessage({type:"appsAction",app:"notepad",action:"DBAction",value:{
			method:"put",
			data:{
				id:0,
				item:sue.apps.notepad.cons.message.data.item
			}
		}});
	},
	itemSwitch:function(e){
		//set current list
		let ele=e.target||e;
		let _lis=sue.apps.getAPPboxEle(ele).querySelectorAll("li");
		for(var i=0;i<_lis.length;i++){
			if(_lis[i].classList.contains("su_notepad_licur")){
				_lis[i].classList.remove("su_notepad_licur");
			}
		}
		_lis[ele.dataset.id].classList.add("su_notepad_licur");
		// ele.classList.add("su_notepad_licur");
		//set current item
		sue.apps.notepad.itemInit(parseInt(ele.dataset.id));
	},
	listInit:function(){
		let data=sue.apps.notepad.cons.message.data.item;
		let _ul=sue.apps.notepad.dom.querySelector("ul");
		_ul.innerText="";
		console.log(data);
		for(var i=0;i<data.length;i++){
			var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_notepad_li"]}/*,null,null,{setName:["id"],setValue:[i]},data[i].title*/),
				_div=sue.apps.domCreate("div",{setName:["className","title"],setValue:["su_notepad_listitem",data[i].title]},null,null,{setName:["id"],setValue:[i]},data[i].title);
			_li.appendChild(_div);
			_div.appendChild(sue.apps.domCreate("input",{setName:["className","type"],setValue:["su_notepad_litext","text"]}));
			_div.appendChild(sue.apps.domCreate("img",{setName:["className","src","title"],setValue:["su_notepad_liedit",chrome.runtime.getURL("image/edit.svg"),sue.apps.i18n("tip_edit")]},"display:inline-block;",null,{setName:["id"],setValue:[i]}));
			_div.appendChild(sue.apps.domCreate("img",{setName:["className","src","title"],setValue:["su_notepad_lidel",chrome.runtime.getURL("image/delete.svg"),sue.apps.i18n("tip_del")]},"display:inline-block;",null,{setName:["id"],setValue:[i]}));
			_ul.appendChild(_li);
		}
		// sue.apps.notepad.itemInit(0);
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"notepad"},function(response){
	sue.apps.notepad.config=response.config;
	sue.apps.notepad.initUI();
});
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	switch(message.type){
		case"appsListener_get":
			sue.apps.notepad.cons.message={};
			sue.apps.notepad.cons.message=message;
			sue.apps.notepad.listInit();
			sue.apps.notepad.itemSwitch(sue.apps.notepad.dom.querySelectorAll(".su_notepad_list li>div")[0]);
			break;
	}
});