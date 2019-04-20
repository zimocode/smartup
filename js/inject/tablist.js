console.log("tablist")
sue.apps.tablist={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"tablist",
			headTitle:"tablist",
			headCloseBtn:true,
			menu:[
				{src:"/image/options.png",title:"app_tip_opt",className:"menu_item menu_item_opt"}
			],
			options:[
				{type:"checkbox",label:"n_closebox",name:"n_closebox",checked:true}
			]
		}
		sue.apps.init();
		var dom=sue.apps.initBox(appInfo);
			dom.id="su_apps_"+appInfo.appName;
		sue.apps.initPos(dom);

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["tablistbox"]});
		dom.querySelector(".su_main").appendChild(theAppBox);
		var domUL=sue.apps.domCreate("ul");
		for(var i=0;i<this.list.length;i++){
			var inner="<img src='"+this.list[i].favIconUrl+"'>"+this.list[i].title+"<span class='su_tablist_button_liclose'>x</span>"
			var list_li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_tablist_li"]},inner,"",{setName:["id"],setValue:[i]},"");
			if(sue.apps.tablist.list[i].id==sue.apps.tablist.curtab.id){
				list_li.classList.add("su_tablist_cur");
			}
			list_li.addEventListener("click",this,false);
			domUL.appendChild(list_li);
		}
		dom.querySelector(".tablistbox").appendChild(domUL);


		return false;
		sue.apps.init();
		var _appname="tablist",
			_time=parseInt((new Date().getTime())/1000);
		var dom=sue.apps.domCreate("smartup",{setName:["className","id"],setValue:["su_apps","su_apps_"+_appname]},null,"z-index:"+_time,{setName:["appname"],setValue:[_appname]});
		dom.innerHTML=
			'<div class="su_head" style="">'
				+'<span class="su_title">'+sue.apps.i18n(_appname)+'</span>'
				+'<div class="su_btn_close">x</div>'
			+'</div>'
			+'<div class="su_main">'
				+'<div class="tablistbox"></div>'
			+'</div>'
			+'<div class="su_options">'
				+'<input id="n_closebox_'+_time+'" name="n_closebox" type="checkbox"><label for="n_closebox_'+_time+'" class="options_labeldes">'+sue.apps.i18n("n_closebox")+'</label>'
				+'<div class="options_btnbox">'
					+'<input class="options_btn_cancel" type="button" value="'+sue.apps.i18n("btn_cancel")+'">'
					+'<input class="options_btn_save" type="button" value="'+sue.apps.i18n("btn_save")+'">'
				+'</div>'
			+'</div>'
			+'<div class="su_menu">'
				+'<img class="menu_item menu_item_opt" src="'+chrome.runtime.getURL("/image/options.png")+'" /><br />'
			+'</div>';
		var domUL=sue.apps.domCreate("ul");
		for(var i=0;i<this.list.length;i++){
			var inner="<img src='"+this.list[i].favIconUrl+"'>"+this.list[i].title+"<span class='su_tablist_button_liclose'>x</span>"
			var list_li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_tablist_li"]},inner,"",{setName:["id"],setValue:[i]},"");
			if(sue.apps.tablist.list[i].id==sue.apps.tablist.curtab.id){
				list_li.classList.add("su_tablist_cur");
			}
			list_li.addEventListener("click",this,false);
			domUL.appendChild(list_li);
		}
		//dom.querySelector(".su_content").style.cssText+="max-height:"+(window.innerHeight-150)+"px;";
		dom.querySelector(".tablistbox").appendChild(domUL);
		//sue.apps.initOpt(dom);
		//sue.apps.initZoom(dom);
		sue.apps.initPos(dom);
	},
	handleEvent:function(e){
		sue.apps.handleEvent(e);
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_tablist_button_liclose")){
					var theDom=e.target.parentNode;
					chrome.runtime.sendMessage({type:"apps_action",apptype:"tablist",id:sue.apps.tablist.list[theDom.dataset.id].id,type_action:"list_close"},function(response){})
					e.target.parentNode.style.cssText+="height:0;opacity:0;";
					window.setTimeout(function(){
						e.target.parentNode.remove();
					},500)
				}
				if(e.target.classList.contains("su_tablist_li")||(e.target.parentNode.classList.contains("su_tablist_li")&&!e.target.classList.contains("su_tablist_button_liclose"))){
					var theDom=e.target.classList.contains("su_tablist_li")?e.target:e.target.parentNode;
					chrome.runtime.sendMessage({type:"apps_action",apptype:"tablist",id:sue.apps.tablist.list[theDom.dataset.id].id,type_action:"list_switch"},function(response){})
					if(sue.apps.tablist.config.n_closebox){
						sue.apps.boxClose(e);
					}
				}
				break;
		}
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"tablist"},function(response){
	sue.apps.tablist.config=response.config;
	//sue.apps.tablist.zoom=response.value.zoom;
	sue.apps.tablist.list=response.value.list;
	sue.apps.tablist.curtab=response.value.curtab;
	sue.apps.tablist.initUI()
})