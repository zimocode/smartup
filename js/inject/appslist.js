console.log("appslist");
sue.apps.appslist={
	cons:{},
	initUI:function(){
		console.log("apslist_init");
		sue.apps.init();
		var _appname="appslist",
			_time=parseInt((new Date().getTime())/1000);
		var dom=sue.apps.domCreate("smartup",{setName:["className","id"],setValue:["su_apps","su_apps_"+_appname]},null,"z-index:"+_time,{setName:["appname"],setValue:[_appname]});
		dom.innerHTML=
			'<div class="su_head" style="">'
				+'<span class="su_title">'+sue.apps.i18n("appslist")+'</span>'
				+'<div class="su_btn_close">x</div>'
			+'</div>'
			+'<div class="su_main">'
				+'<div class="su_appslist_box"></div>'
			+'</div>'
			+'<div class="su_menu">'
				+'<img class="menu_item menu_item_opt" src="'+chrome.runtime.getURL("/image/options.png")+'" /><br />'
			+'</div>'
			+'<div class="su_options">'
				+'<input id="n_closebox" name="n_closebox" type="checkbox"><label for="n_closebox" class="options_labeldes">'+sue.apps.i18n("n_closebox")+'</label>'
				+'<div class="options_btnbox">'
					+'<input class="options_btn_cancel" type="button" value="'+sue.apps.i18n("btn_cancel")+'">'
					+'<input class="options_btn_save" type="button" value="'+sue.apps.i18n("btn_save")+'">'
				+'</div>'
			+'</div>';
		dom.style.cssText+="border-color:#e91e63;";
		dom.querySelector(".su_head").style.cssText+="background-color:#e91e63;";

		var domBox=dom.querySelector(".su_appslist_box");
		var domUL=sue.apps.domCreate("ul");
		var theobj=sue.apps.appslist.apps; //sue.cons.appslist.value.apps; //SU_apps_appslist.cons.apps;
		for(var i=0;i<theobj.length;i++){
			var domli=sue.apps.domCreate("li",{setName:["className"],setValue:["su_appslist_li"]},sue.apps.i18n(theobj[i]),null,{setName:["id"],setValue:[theobj[i]]});
			domUL.appendChild(domli);
			//domli.removeEventListener("click",this,false);
			//domli.addEventListener("click",this,false);
		}
		domBox.appendChild(domUL);
		//alert(domBox)
		dom.addEventListener("click",this.handleEvent,false)
		sue.apps.initPos(dom);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_appslist_li")){
					chrome.runtime.sendMessage({type:"apps_action",apptype:"appslist",id:e.target.dataset.id},function(response){})
					if(sue.apps.appslist.config.n_closebox){
						sue.apps.boxClose(e);
					}
				}
		}
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"appslist"},function(response){
	sue.apps.appslist.config=response.config;
	sue.apps.appslist.apps=response.value.apps;
	sue.apps.appslist.initUI();
})
