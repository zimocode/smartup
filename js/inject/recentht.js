console.log("recentht");
sue.apps.recentht={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"recentht",
			headTitle:"recentht",
			headCloseBtn:true,
			menu:[
				{src:"/image/options.png",title:"app_tip_opt",className:"menu_item menu_item_opt"}
			],
			options:[
				{type:"select",label:"n_optype",name:"n_optype",value:["s_new","s_back","s_current","s_incog"]},
				{type:"select",label:"n_position",name:"n_position",value:["s_default","s_left","s_right","s_head","s_last"]},
				{type:"range",label:"app_recentbk_recentlength",name:"n_num",min:5,max:50},
				{type:"checkbox",label:"n_pin",name:"n_pin",checked:true},
				{type:"checkbox",label:"n_closebox",name:"n_closebox",checked:true}
			]
		}
		sue.apps.init();
		var dom=sue.apps.initBox(appInfo);
			dom.id="su_apps_"+appInfo.appName;
		sue.apps[appInfo.appName].dom=dom;
		sue.apps.initPos(dom);

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["recenthtbox"]});
		dom.querySelector(".su_main").appendChild(theAppBox);

		var _ul=sue.apps.domCreate("ul");
		for(var i=0;i<this.ht.length;i++){
			var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_recentht_li"]},"<span class='li_0'>"+this.ht[i].title+"</span><span class='li_1'>"+this.ht[i].url+"</span>","",{setName:["id"],setValue:[i]},"");
			_ul.appendChild(_li);
			_li.removeEventListener("click",this,false);
			_li.addEventListener("click",this,false);
		}
		theAppBox.appendChild(_ul);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_recentht_li")||e.target.parentNode.classList.contains("su_recentht_li")){
					var theDom=e.target.classList.contains("su_recentht_li")?e.target:e.target.parentNode;
					chrome.runtime.sendMessage({type:"appsAction",app:"recentht",action:"openItem",value:sue.apps.recentht.ht[theDom.dataset.id].url},function(response){})
					if(sue.apps.recentht.config.n_closebox){
						sue.apps.boxClose(e);
					}
				}
				break;
		}
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"recentht"},function(response){
	sue.apps.recentht.config=response.config;
	sue.apps.recentht.ht=response.value.ht;
	sue.apps.recentht.initUI()
})