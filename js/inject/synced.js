console.log("synced");
sue.apps.synced={
	cons:{},
	initUI:function(){
		sue.apps.init();
		var _appname="synced",
			_time=parseInt((new Date().getTime())/1000);
		var dom=sue.apps.domCreate("smartup",{setName:["className","id"],setValue:["su_apps","su_apps_"+_appname]},null,"z-index:"+_time,{setName:["appname"],setValue:[_appname]});
		dom.innerHTML=
			'<div class="su_head" style="">'
				+'<span class="su_title">'+sue.apps.i18n("synced")+'</span>'
				+'<div class="su_btn_close">x</div>'
			+'</div>'
			+'<div class="su_main">'
					+'<div class="su_synced_head">'
						+'<span class="su_synced_switch">'+sue.apps.i18n("app_synced_switch")+'</span>'
						+'<select class="su_synced_device"></select>'
					+'</div>'
					+'<div class="su_synced_box"></div>'
			+'</div>'
			+'<div class="su_options">'
				+'<input id="n_closebox_'+_time+'" class="su_options_radio" name="n_closebox" type="checkbox"><label for="n_closebox_'+_time+'" class="su_options_labeldes">'+sue.apps.i18n("n_closebox")+'</label><br />'
				+'<div class="options_btnbox">'
					+'<input class="options_btn_cancel" type="button" value="'+sue.apps.i18n("btn_cancel")+'">'
					+'<input class="options_btn_save" type="button" value="'+sue.apps.i18n("btn_save")+'">'
				+'</div>'
			+'</div>'
			+'<div class="su_menu">'
				+'<img class="menu_item menu_item_opt" src="'+chrome.runtime.getURL("/image/options.png")+'" /><br />'
			+'</div>';
		for(var i=0;i<sue.apps.synced.sync.length&&sue.apps.synced.sync.length>0;i++){
			dom.querySelector("select.su_synced_device").appendChild(sue.apps.domCreate("option",null,sue.apps.synced.sync[i].deviceName));
		}

		if(sue.apps.synced.sync.length<1){
			dom.querySelector("smartup .su_synced_switch").innerHTML=sue.apps.i18n("app_synced_nodevice");
		}else{
			dom.querySelector("select.su_synced_device").removeEventListener("change",this,false);
			dom.querySelector("select.su_synced_device").addEventListener("change",this,false);			
		}
		var domBox=dom.querySelector(".su_synced_box");
		var domUL=sue.apps.domCreate("ul");
		for(var i=0;sue.apps.synced.sync.length>0&&i<sue.apps.synced.sync[0].sessions.length;i++){
			var theobj=sue.apps.synced.sync[0].sessions[i].window.tabs;
			for(var ii=0;ii<theobj.length;ii++){
				var domli=sue.apps.domCreate("li",{setName:["className"],setValue:["su_synced_li"]},theobj[ii].title,null,{setName:["id"],setValue:[theobj[ii].sessionId]});
				domUL.appendChild(domli);
				domli.removeEventListener("click",this,false);
				domli.addEventListener("click",this,false);
			}
		}
		domBox.appendChild(domUL)
		sue.apps.initPos(dom);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_synced_li")){
					chrome.runtime.sendMessage({type:"apps_action",apptype:"synced",id:e.target.dataset.id},function(response){})
					if(sue.apps.synced.config.n_closebox){
						sue.apps.boxClose(e)
					}
				}
				break;
			case"change":
				this.deviceChange(e);
				break;
		}
	},
	deviceChange:function(e){
		var domBox=sue.apps.getAPPboxEle(e).querySelector(".su_synced_box");
			domBox.innerHTML="";
		var sessionId=e.target.selectedIndex;
		var domUL=sue.apps.domCreate("ul");
		for(var i=0;i<sue.apps.synced.sync[sessionId].sessions.length;i++){
			var theobj=sue.apps.synced.sync[sessionId].sessions[i].window.tabs;
			for(var ii=0;ii<theobj.length;ii++){
				var domli=sue.apps.domCreate("li",{setName:["className"],setValue:["su_synced_li"]},theobj[ii].title,null,{setName:["id"],setValue:[theobj[ii].sessionId]});
				domUL.appendChild(domli);
				domli.removeEventListener("click",this,false);
				domli.addEventListener("click",this,false);
			}
		}
		domBox.appendChild(domUL)
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"synced"},function(response){
	sue.apps.synced.config=response.config;
	sue.apps.synced.sync=response.value.sync;
	sue.apps.synced.initUI()
})
