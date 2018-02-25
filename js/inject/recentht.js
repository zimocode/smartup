console.log("recentht");
sue.apps.recentht={
	cons:{},
	initUI:function(){
		sue.apps.init();
		var _appname="recentht",
			_time=parseInt((new Date().getTime())/1000);
		var dom=sue.apps.domCreate("smartup",{setName:["className","id"],setValue:["su_apps","su_apps_"+_appname]},null,"z-index:"+_time,{setName:["appname"],setValue:[_appname]});
		dom.innerHTML=
			'<div class="su_head">'
				+'<span class="su_title">'+sue.apps.i18n("recentht")+'</span>'
				+'<div class="su_btn_close">x</div>'
			+'</div>'
			+'<div class="su_main">'
				+'<div class="recenthtbox"></div>'
			+'</div>'
			+'<div class="su_menu">'
				+'<img class="menu_item menu_item_opt" src="'+chrome.runtime.getURL("/image/options.png")+'" /><br />'
			+'</div>'
			+'<div class="su_options">'
				+'<label class="options_labelname">'+sue.apps.i18n("n_optype")+'</label><select name="n_optype"><option value="s_new">'+sue.apps.i18n("s_new")+'</option><option value="s_back">'+sue.apps.i18n("s_back")+'</option><option value="s_current">'+sue.apps.i18n("s_current")+'</option><option value="s_incog">'+sue.apps.i18n("s_incog")+'</option></select><br />'
				+'<label class="options_labelname">'+sue.apps.i18n("n_position")+'</label><select name="n_position"><option value="s_default">'+sue.apps.i18n("s_default")+'</option><option value="s_left">'+sue.apps.i18n("s_left")+'</option><option value="s_right">'+sue.apps.i18n("s_right")+'</option><option value="s_head">'+sue.apps.i18n("s_head")+'</option><option value="s_last">'+sue.apps.i18n("s_last")+'</option></select><br />'
				+'<label class="options_labelname">'+sue.apps.i18n("n_num")+'</label>'+'<input name="n_num" min="5" max="50" type="range"><span class="options_rangebox"></span><br />'
				+'<input id="n_pin_'+_time+'" name="n_pin" type="checkbox"><label for="n_pin_'+_time+'" class="options_labeldes">'+sue.apps.i18n("n_pin")+'</label><br />'
				+'<input id="n_closebox_'+_time+'" name="n_closebox" type="checkbox"><label for="n_closebox_'+_time+'" class="options_labeldes">'+sue.apps.i18n("n_closebox")+'</label><br />'
				+'<div class="options_btnbox">'
					+'<input class="options_btn_cancel" type="button" value="'+sue.apps.i18n("btn_cancel")+'">'
					+'<input class="options_btn_save" type="button" value="'+sue.apps.i18n("btn_save")+'">'
				+'</div>'
			+'</div>';
		var domUL=sue.apps.domCreate("ul");
		for(var i=0;i<this.ht.length;i++){
			var list_li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_recentht_li"]},"<span class='li_0'>"+this.ht[i].title+"</span><span class='li_1'>"+this.ht[i].url+"</span>","",{setName:["id"],setValue:[i]},"");
			domUL.appendChild(list_li);
			list_li.removeEventListener("click",this,false);
			list_li.addEventListener("click",this,false);
		}
		dom.querySelector(".recenthtbox").appendChild(domUL);
		sue.apps.initPos(dom);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_recentht_li")||e.target.parentNode.classList.contains("su_recentht_li")){
					var theDom=e.target.classList.contains("su_recentht_li")?e.target:e.target.parentNode;
					chrome.runtime.sendMessage({type:"apps_action",apptype:"recentht",link:sue.apps.recentht.ht[theDom.dataset.id].url},function(response){})
					if(sue.apps.recentht.config.n_closebox){
						sue.apps.boxClose(e)
					}
				}
				break;
		}
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"recentht"},function(response){
	sue.apps.recentht.config=response.config;
	//sue.apps.recentht.zoom=response.value.zoom;
	sue.apps.recentht.ht=response.value.ht;
	sue.apps.recentht.initUI()
})