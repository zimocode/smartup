console.log("jslist");
sue.apps.jslist={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"jslist",
			headTitle:"jslist",
			headCloseBtn:true,
			menu:[
				{src:"/image/options.png",title:"app_tip_opt",className:"menu_item menu_item_opt"}
			],
			options:[
				{type:"checkbox",label:"n_closebox",name:"n_closebox"},
				{type:"checkbox",label:"n_jq",name:"n_jq"}
			]
		}
		sue.apps.init();
		var dom=sue.apps.initBox(appInfo);
			dom.id="su_apps_"+appInfo.appName;
		sue.apps[appInfo.appName].dom=dom;
		sue.apps.initPos(dom);

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_jslist_box"]});
		dom.querySelector(".su_main").appendChild(theAppBox);

		let _ul=sue.apps.domCreate("ul");
		let theobj=sue.apps.jslist.js; 
		for(var i=0;i<theobj.length;i++){
			var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_jslist_li"]},theobj[i],null,{setName:["id"],setValue:[i]});
			_ul.appendChild(_li);
		}
		theAppBox.appendChild(_ul);
		dom.addEventListener("click",this.handleEvent,false)
		dom.style.cssText+="border-color:#e91e63;";
		dom.querySelector(".su_head").style.cssText+="background-color:#e91e63;";

		return false;
		// sue.apps.init();
		// var _appname="jslist",
		// 	_time=parseInt((new Date().getTime())/1000);
		// var dom=sue.apps.domCreate("smartup",{setName:["className","id"],setValue:["su_apps","su_apps_"+_appname]},null,"z-index:"+_time,{setName:["appname"],setValue:[_appname]});
		// dom.innerHTML=
		// 	'<div class="su_head" style="">'
		// 		+'<span class="su_title">'+sue.apps.i18n("jslist")+'</span>'
		// 		+'<div class="su_btn_close">x</div>'
		// 	+'</div>'
		// 	+'<div class="su_main">'
		// 		+'<div class="su_jslist_box"></div>'
		// 	+'</div>'
		// 	+'<div class="su_menu">'
		// 		+'<img class="menu_item menu_item_opt" src="'+chrome.runtime.getURL("/image/options.png")+'" /><br />'
		// 	+'</div>'
		// 	+'<div class="su_options">'
		// 		+'<input id="n_closebox" name="n_closebox" type="checkbox"><label for="n_closebox" class="options_labeldes">'+sue.apps.i18n("n_closebox")+'</label><br />'
		// 		+'<input id="n_jq" name="n_jq" type="checkbox"><label for="n_jq" class="options_labeldes">'+sue.apps.i18n("n_jq")+'</label>'
		// 		+'<div class="options_btnbox">'
		// 			+'<input class="options_btn_cancel" type="button" value="'+sue.apps.i18n("btn_cancel")+'">'
		// 			+'<input class="options_btn_save" type="button" value="'+sue.apps.i18n("btn_save")+'">'
		// 		+'</div>'
		// 	+'</div>';
		// dom.style.cssText+="border-color:#e91e63;";
		// dom.querySelector(".su_head").style.cssText+="background-color:#e91e63;";

		// var domBox=dom.querySelector(".su_jslist_box");
		// var domUL=sue.apps.domCreate("ul");
		// var theobj=sue.apps.jslist.js; 
		// for(var i=0;i<theobj.length;i++){
		// 	var domli=sue.apps.domCreate("li",{setName:["className"],setValue:["su_jslist_li"]},theobj[i],null,{setName:["id"],setValue:[i]});
		// 	domUL.appendChild(domli);
		// }
		// domBox.appendChild(domUL);
		// dom.addEventListener("click",this.handleEvent,false)
		// sue.apps.initPos(dom);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_jslist_li")){
					chrome.runtime.sendMessage({type:"appsAction",app:"jslist",action:"jsRun",value:e.target.dataset.id})
					if(sue.apps.jslist.config.n_closebox){
						sue.apps.boxClose(e);
					}
				}
		}
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"jslist"},function(response){
	sue.apps.jslist.config=response.config;
	sue.apps.jslist.js=response.value.js;
	sue.apps.jslist.initUI();
})
