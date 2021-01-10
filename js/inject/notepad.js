//console.log("notepad");
sue.apps.notepad={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"notepad",
			headTitle:"notepad",
			headCloseBtn:true,
			menu:[
				{src:"/image/options.svg",title:"app_tip_opt",className:"menu_item menu_item_opt"}/*,
				{src:"/image/more.svg",title:"tip_more",className:"menu_item menu_item_extmgmmore"},
				{src:"/image/lock.svg",title:"tip_lock",className:"menu_item su_notepad_menulock",action:"notepad-lock"}*/
			],
			options:[
				{type:"checkbox",label:"n_notepad_delconfirm",name:"n_notepad_delconfirm",checked:true},
				{type:"checkbox",label:"n_notepad_switchsave",name:"n_notepad_switchsave",checked:true},
				{type:"checkbox",label:"n_notepad_last",name:"n_notepad_last",checked:true}
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
			_boxMain=sue.apps.domCreate("div",{setName:["className"],setValue:["su_notepad_main"]}),
			_boxBottom=sue.apps.domCreate("div",{setName:["className"],setValue:["su_notepad_bottom"]});

		_boxList.appendChild(sue.apps.domCreate("ul"));

		_boxMain.appendChild(sue.apps.domCreate("textarea",{setName:["className",],setValue:["su_notepad_content"]}));

		_boxBottom.appendChild(sue.apps.domCreate("button",{setName:["className"],setValue:["su_notepad_btnadd"]},null,null,{setName:["action"],setValue:["add"]},sue.apps.i18n("btn_new")));
		_boxBottom.appendChild(sue.apps.domCreate("button",{setName:["className","id"],setValue:["su_notepad_btn su_notepad_btnsave","su_notepad_btnsave"]},null,null,{setName:["action","id"],setValue:["notepad-contentsave",0]},sue.apps.i18n("btn_save")));
		_boxBottom.appendChild(sue.apps.domCreate("div",{setName:["className"],setValue:["su_notepad_des"]},null,null,null,sue.apps.i18n("des_notepad_bottom")));

		theAppBox.appendChild(_boxList);
		theAppBox.appendChild(_boxMain);
		theAppBox.appendChild(_boxBottom);

		chrome.runtime.sendMessage({type:"appsAction",app:"notepad",action:"get",value:{method:"get"}});

		let _time=new Date().getTime();
		let boxLock=sue.apps.domCreate("div",{setName:["className"],setValue:["su_notepad_lock"]}),
			lockCheck=sue.apps.domCreate("input",{setName:["className","type","id"],setValue:["su_notepad_locksw","checkbox","su_notepad_locksw"+_time]}),
			lockLabel=sue.apps.domCreate("label",{setName:["className","for"],setValue:["su_notepas_lockswlabel","su_notepad_locksw"+_time]},null,null,null,"Protect your notes with password."),
			lockEnable=sue.apps.domCreate("div",{setName:["className"],setValue:["su_notepad_lockenable"]}),
			lockDisable=sue.apps.domCreate("div",{setName:["className"],setValue:["su_notepad_lockdisable"]});
		boxLock.appendChild(lockCheck);
		boxLock.appendChild(lockLabel);
		boxLock.appendChild(lockEnable);
		boxLock.appendChild(lockDisable);
		dom.querySelector(".su_main").appendChild(boxLock);


		dom.style.cssText+="border-color:rgb(128 123 67);";
		dom.querySelector(".su_head").style.cssText+="background-color:rgb(128 123 67);";
		dom.addEventListener("click",this.handleEvent,false);
		dom.addEventListener("keypress",this.handleEvent,false);
		dom.addEventListener("keydown",this.handleEvent,false);
		// dom.addEventListener("mousemove",this.handleEvent,false);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_notepad_btnadd")){
					sue.apps.notepad.itemAdd(e)
				}else if(e.target.classList.contains("su_notepad_listitem")){
					sue.apps.notepad.itemSwitch(e);
				}
				switch(e.target.dataset.action){
					case"notepad-edit":
						sue.apps.notepad.itemEdit(e);
						break;
					case"notepad-save":
						sue.apps.notepad.itemEditSave(e);
						break;
					case"notepad-switch":
						sue.apps.notepad.itemSwitch(e);
						break;
					case"notepad-del":
						sue.apps.notepad.itemDel(e);
						break;
					case"notepad-cancel":
						sue.apps.notepad.itemEditCancel(e);
						break;
					case"notepad-contentsave":
						sue.apps.notepad.contentSave(e);
						break;
					case"notepad-lock":
						sue.apps.notepad.showLock(e);
						break;
				}
				break;
			case"keypress":
				console.log(e);
				if(e.keyCode==13&&e.target.classList.contains("su_notepad_litext")){
					sue.apps.notepad.itemEditSave(e);
				}
				break;
			case"keydown":
				if(e.keyCode==27&&e.target.classList.contains("su_notepad_litext")){
					sue.apps.notepad.itemEditCancel(e);
				}
				break;
			case"blur":
				console.log("blur")
				sue.apps.notepad.itemEditCancel(e);
				break;
		}
	},
	saveConf:function(e){
		// chrome.runtime.sendMessage({type:"apps_saveconf",apptype:"notepad",config:sue.apps.notepad.config});
		chrome.runtime.sendMessage({type:"appsAction",app:"notepad",action:"set",value:{
			method:"put",
			data:{
				id:0,
				last:0,
				item:sue.apps.notepad.cons.message.data.item
			}
		}});
		sue.apps.notification(e.target||e)
	},
	itemInit:function(e){
		let ele=e.target||e;
		let _id=parseInt(ele.dataset.id);
		let data=sue.apps.notepad.cons.message.data.item;
		sue.apps.getAPPboxEle(ele).querySelector("textarea").value=data[_id].content;
		sue.apps.getAPPboxEle(ele).querySelector("textarea").focus();
		sue.apps.getAPPboxEle(ele).querySelector(".su_notepad_btnsave").dataset.id=_id;
	},
	itemAdd:function(e){
		sue.apps.notepad.cons.message.data.item.unshift({
			title:sue.apps.i18n("notepad_defalut_title"),
			content:sue.apps.i18n("notepad_defalut_content")
		});
		console.log(sue.apps.notepad.cons.message.data.item);
		// return false;
		// chrome.runtime.sendMessage({type:"appsAction",app:"notepad",action:"DBAction",value:{
		// 	method:"put",
		// 	data:{
		// 		id:0,
		// 		last:0,
		// 		item:sue.apps.notepad.cons.message.data.item
		// 	}
		// }});
		// sue.apps.notification(e.target);
		sue.apps.notepad.saveConf(e);
		sue.apps.notepad.listInit();
		sue.apps.notepad.itemSwitch(sue.apps.notepad.dom.querySelectorAll(".su_notepad_list li")[0],false);
		sue.apps.notepad.itemEdit(sue.apps.notepad.dom.querySelectorAll(".su_notepad_list li")[0]);
	},
	itemSwitch:function(e,autosave){
		let _autoSave=autosave===undefined?sue.apps.notepad.config.n_notepad_switchsave:autosave;
		if(_autoSave){sue.apps.notepad.contentSave(sue.apps.getAPPboxEle(e).querySelector(".su_notepad_btnsave"));}
		let ele=e.target||e;
		let _lis=sue.apps.getAPPboxEle(ele).querySelectorAll("li");
		for(var i=0;i<_lis.length;i++){
			if(_lis[i].classList.contains("su_notepad_licur")){
				_lis[i].classList.remove("su_notepad_licur");
			}
		}
		_lis[ele.dataset.id].classList.add("su_notepad_licur");
		sue.apps.notepad.itemInit(e);
	},
	itemEdit:function(e){
		let ele=e.target||e;
		sue.apps.notepad.itemSwitch(e);
		let domText=ele.parentNode.querySelector(".su_notepad_litext"),
			domCancel=ele.parentNode.querySelector(".su_notepad_lidel"),
			domSave=ele.parentNode.querySelector(".su_notepad_liedit");
		console.log(domCancel);
		console.log(domSave);
		console.log(domText);
		domCancel.remove();
		domSave.remove();
		// domCancel.src=chrome.runtime.getURL("image/cancel.svg");
		// domCancel.title=sue.apps.i18n("tip_cancel");
		// domCancel.dataset.action="notepad-cancel";
		// domSave.src=chrome.runtime.getURL("image/save.svg");
		// domSave.title=sue.apps.i18n("tip_save");
		// domSave.dataset.action="notepad-save";
		domText.style.cssText+="display: inline-block;position: absolute;left: 0;width: 160px;margin-left: 2px;";
		domText.focus();
		domText.select();
		domText.addEventListener("blur",this.handleEvent,false);
	},
	itemEditSave:function(e){
		let _id=parseInt(e.target.dataset.id);
		sue.apps.notepad.cons.message.data.item[_id].title=e.target.parentNode.querySelector(".su_notepad_litext").value;
		// chrome.runtime.sendMessage({type:"appsAction",app:"notepad",action:"DBAction",value:{
		// 	method:"put",
		// 	data:{
		// 		id:0,
		// 		last:_id,
		// 		item:sue.apps.notepad.cons.message.data.item
		// 	}
		// }});
		// sue.apps.notification(e.target);
		sue.apps.notepad.saveConf(e);
		sue.apps.notepad.listInit();
		sue.apps.notepad.itemSwitch(sue.apps.notepad.dom.querySelectorAll(".su_notepad_list li>div")[_id]);
	},
	itemEditCancel:function(e){
		let _id=e.target.dataset.id;
		sue.apps.notepad.listInit();
		sue.apps.notepad.itemSwitch(sue.apps.notepad.dom.querySelectorAll(".su_notepad_list li>div")[_id]);
	},
	itemDel:function(e){
		let _id=parseInt(e.target.dataset.id);
		if(sue.apps.notepad.config.n_notepad_delconfirm){
			if(!window.confirm(sue.apps.i18n("notepad_delconfirm"))){return false;}
		}
		
		sue.apps.notepad.cons.message.data.item.splice(_id,1);
		// chrome.runtime.sendMessage({type:"appsAction",app:"notepad",action:"DBAction",value:{
		// 	method:"put",
		// 	data:{
		// 		id:0,
		// 		last:0,
		// 		item:sue.apps.notepad.cons.message.data.item
		// 	}
		// }});
		// sue.apps.notification(e.target);
		sue.apps.notepad.saveConf(e);
		sue.apps.notepad.listInit();
		sue.apps.notepad.itemSwitch(sue.apps.notepad.dom.querySelectorAll(".su_notepad_list li>div")[_id>0?_id-1:0],false);
	},
	listInit:function(){
		let data=sue.apps.notepad.cons.message.data.item;
		let _ul=sue.apps.notepad.dom.querySelector("ul");
		_ul.innerText="";
		console.log(data);
		for(var i=0;i<data.length;i++){
			var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_notepad_li"]},null,null,{setName:["action","id"],setValue:["notepad-switch",i]}),
				_div=sue.apps.domCreate("div",{setName:["className","title"],setValue:["su_notepad_listitem",data[i].title]},null,null,{setName:["action","id"],setValue:["notepad-switch",i]});
			_li.appendChild(_div);
			_div.appendChild(sue.apps.domCreate("span",{setName:["className"],setValue:["su_notepad_lispan"]},null,null,{setName:["action","id"],setValue:["notepad-switch",i]},data[i].title));
			_div.appendChild(sue.apps.domCreate("input",{setName:["className","type","value"],setValue:["su_notepad_litext","text",data[i].title]},null,null,{setName:["id"],setValue:[i]}));
			_div.appendChild(sue.apps.domCreate("img",{setName:["className","src","title"],setValue:["su_notepad_liedit",chrome.runtime.getURL("image/edit.svg"),sue.apps.i18n("tip_edit")]},"display:inline-block;",null,{setName:["id","action"],setValue:[i,"notepad-edit"]}));
			_div.appendChild(sue.apps.domCreate("img",{setName:["className","src","title"],setValue:["su_notepad_lidel",chrome.runtime.getURL("image/delete.svg"),sue.apps.i18n("tip_del")]},"display:inline-block;",null,{setName:["id","action"],setValue:[i,"notepad-del"]}));
			_ul.appendChild(_li);
		}
		// sue.apps.notepad.itemInit(0);
	},
	contentSave:function(e){
		let ele=e.target||e;
		console.log(ele);
		sue.apps.notepad.cons.message.data.item[parseInt(ele.dataset.id)].content=sue.apps.getAPPboxEle(e).querySelector("textarea").value;
		// chrome.runtime.sendMessage({type:"appsAction",app:"notepad",action:"DBAction",value:{
		// 	method:"put",
		// 	data:{
		// 		id:0,
		// 		last:parseInt(ele.dataset.id),
		// 		item:sue.apps.notepad.cons.message.data.item
		// 	}
		// }});
		// sue.apps.notification(ele);
		sue.apps.notepad.saveConf(e);
	},
	showLock:function(e){
		let ele=e.target||e;
		let dom=sue.apps.getAPPboxEle(ele).querySelector(".su_notepad_lock");
		dom.textContent="";

		let _time=new Date().getTime();
		let lockCheck=sue.apps.domCreate("input",{setName:["className","type","id"],setValue:["su_notepad_locksw","checkbox","su_notepad_locksw"+_time]}),
			lockLabel=sue.apps.domCreate("label",{setName:["className","for"],setValue:["su_notepas_lockswlabel","su_notepad_locksw"+_time]},null,null,null,"Protect your notes with password."),
			lockEnable=sue.apps.domCreate("div",{setName:["className"],setValue:["su_notepad_lockenable"]}),
			lockDisable=sue.apps.domCreate("div",{setName:["className"],setValue:["su_notepad_lockdisable"]});
		dom.appendChild(lockCheck);
		dom.appendChild(lockLabel);
		dom.appendChild(lockEnable);
		dom.appendChild(lockDisable);

		let spanenablePw=sue.apps.domCreate("span",{setName:["className"],setValue:["su_notepad_lockspan"]},null,null,null,"input password:"),
			enablePw=sue.apps.domCreate("input",{setName:["className","type"],setValue:["su_notepad_lockenable_pw","password"]}),
			spanenablePwre=sue.apps.domCreate("span",{setName:["className"],setValue:["su_notepad_lockspan"]},null,null,null,"confirm password:"),
			enablePwre=sue.apps.domCreate("input",{setName:["className","type"],setValue:["su_notepad_lockenable_pwre","password"]}),
			enableBtn=sue.apps.domCreate("button",null,null,null,{setName:["action"],setValue:["notepad-lockenable"]},sue.apps.i18n("btn_done")),
			spandisablePw=sue.apps.domCreate("span",{setName:["className"],setValue:["su_notepad_lockspan"]},null,null,null,"input password:"),
			disablePw=sue.apps.domCreate("input",{setName:["className","type"],setValue:["su_notepad_lockdisable_pw","password"]}),
			disableBtn=sue.apps.domCreate("button",null,null,null,{setName:["action"],setValue:["notepad-lockdisable"]},sue.apps.i18n("btn_done"));

		lockEnable.appendChild(spanenablePw);
		lockEnable.appendChild(enablePw);
		lockEnable.appendChild(spanenablePwre);
		lockEnable.appendChild(enablePwre);
		lockEnable.appendChild(enableBtn);
		lockDisable.appendChild(spandisablePw);
		lockDisable.appendChild(disablePw);
		lockDisable.appendChild(disableBtn);

		sue.apps.showPanel(dom);
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"notepad"},function(response){
	sue.apps.notepad.config=response.config;
	sue.apps.notepad.initUI();
});
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	console.log(message);
	switch(message.type){
		case"appsListener_get":
			sue.apps.notepad.cons.message={};
			sue.apps.notepad.cons.message=message;
			sue.apps.notepad.listInit();
			sue.apps.notepad.itemSwitch(sue.apps.notepad.dom.querySelectorAll(".su_notepad_list li>div")[sue.apps.notepad.config.n_notepad_last?sue.apps.notepad.cons.message.data.last:0],false);
			break;
	}
});