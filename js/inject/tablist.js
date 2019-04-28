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
		sue.apps[appInfo.appName].dom=dom;
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
		theAppBox.appendChild(domUL);
	},
	handleEvent:function(e){
		sue.apps.handleEvent(e);
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_tablist_button_liclose")){
					chrome.runtime.sendMessage({type:"appsAction",app:"tablist",action:"tabClose",value:sue.apps.tablist.list[e.target.parentNode.dataset.id].id});
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