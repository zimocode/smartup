console.log("recentclosed");
sue.apps.recentclosed={
	cons:{
		recentclosed:null
	},
	initUI:function(){
		sue.apps.init();
		var _appname="recentclosed",
			_time=parseInt((new Date().getTime())/1000);
		var dom=sue.apps.domCreate("smartup",{setName:["className","id"],setValue:["su_apps","su_apps_"+_appname]},null,"z-index:"+_time,{setName:["appname"],setValue:[_appname]});
		dom.innerHTML=
			'<div class="su_head" style="">'
				+'<span class="su_title">'+sue.apps.i18n("recentclosed")+'</span>'
				+'<div class="su_btn_close">x</div>'
			+'</div>'
			+'<div class="su_main">'
				+'<div class="recentclosedbox"></div>'
			+'</div>'
			+'<div class="su_menu">'
				+'<img class="menu_item menu_item_opt" src="'+chrome.runtime.getURL("/image/options.png")+'" /><br />'
			+'</div>'
			+'<div class="su_options">'
				+'<label class="options_labelname">'+sue.apps.i18n("app_recentbk_recentlength")+'</label>'+'<input name="n_num" min="5" max="25" type="range"><span class="options_rangebox"></span><br />'
				+'<input id="n_closebox_'+_time+'" name="n_closebox" type="checkbox"><label for="n_closebox_'+_time+'" class="options_labeldes">'+sue.apps.i18n("n_closebox")+'</label><br />'
				+'<div class="options_btnbox">'
					+'<input class="options_btn_cancel" type="button" value="'+sue.apps.i18n("btn_cancel")+'">'
					+'<input class="options_btn_save" type="button" value="'+sue.apps.i18n("btn_save")+'">'
				+'</div>'
			+'</div>';
		var domUL=sue.apps.domCreate("ul");
		for(var i=0;i<this.tabs.length;i++){
			var rctype=!this.tabs[i].window?this.tabs[i].tab:this.tabs[i].window;
			var list_li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_recentclosed_li"]},(!this.tabs[i].window?this.tabs[i].tab.title:this.tabs[i].window.tabs.length+" "+sue.apps.i18n("app_recentclosed_tabs")),"",{setName:["id"],setValue:[rctype.sessionId]},"");
			var rc_title;

			if(rctype.tabs){
				rc_title=rctype.tabs.length+" "+sue.apps.i18n("app_recentclosed_tabs")
				for(var ii=0;ii<rctype.tabs.length;ii++){
					rc_title+=" | "+rctype.tabs[ii].title;
				}
				list_li.classList.add("su_recentclosed_win");
				list_li.innerHTML=rc_title;
			}
			
			domUL.appendChild(list_li);
			list_li.removeEventListener("click",this,false);
			list_li.addEventListener("click",this,false);
		}
		dom.querySelector(".recentclosedbox").appendChild(domUL);

		//sue.apps.initOpt(dom);
		//sue.apps.initZoom(dom);
		sue.apps.initPos(dom);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_recentclosed_li")){
					chrome.runtime.sendMessage({type:"apps_action",apptype:"recentclosed",id:e.target.dataset.id},function(response){})
					if(sue.apps.recentclosed.config.n_closebox){
						sue.apps.boxClose(e)
					}
				}
				break;
		}
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"recentclosed"},function(response){
	sue.apps.recentclosed.config=response.config;
	//sue.apps.recentclosed.zoom=response.value.zoom;
	sue.apps.recentclosed.tabs=response.value.tabs;
	sue.apps.recentclosed.initUI()
})
