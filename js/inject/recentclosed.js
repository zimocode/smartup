console.log("recentclosed");
sue.apps.recentclosed={
	cons:{
		recentclosed:null
	},
	initUI:function(){
		let appInfo={
			appName:"recentclosed",
			headTitle:"recentclosed",
			headCloseBtn:true,
			menu:[
				{src:"/image/options.png",title:"app_tip_opt",className:"menu_item menu_item_opt"}
			],
			options:[
				{type:"range",label:"app_recentbk_recentlength",name:"n_num",min:5,max:25},
				{type:"checkbox",label:"n_closebox",name:"n_closebox",checked:true}
			]
		}
		sue.apps.init();
		var dom=sue.apps.initBox(appInfo);
			dom.id="su_apps_"+appInfo.appName;
		sue.apps[appInfo.appName].dom=dom;
		sue.apps.initPos(dom);

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["recentclosedbox"]});
		dom.querySelector(".su_main").appendChild(theAppBox);

		var _ul=sue.apps.domCreate("ul");
		for(var i=0;i<this.tabs.length;i++){
			var rctype=!this.tabs[i].window?this.tabs[i].tab:this.tabs[i].window;
			var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_recentclosed_li"]},(!this.tabs[i].window?this.tabs[i].tab.title:this.tabs[i].window.tabs.length+" "+sue.apps.i18n("app_recentclosed_tabs")),"",{setName:["id"],setValue:[rctype.sessionId]},"");
			var rc_title;

			if(rctype.tabs){
				rc_title=rctype.tabs.length+" "+sue.apps.i18n("app_recentclosed_tabs")
				for(var ii=0;ii<rctype.tabs.length;ii++){
					rc_title+=" | "+rctype.tabs[ii].title;
				}
				_li.classList.add("su_recentclosed_win");
				_li.innerHTML=rc_title;
			}
			
			_ul.appendChild(_li);
			_li.removeEventListener("click",this,false);
			_li.addEventListener("click",this,false);
		}
		theAppBox.appendChild(_ul);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_recentclosed_li")){
					chrome.runtime.sendMessage({type:"appsAction",app:"recentclosed",action:"openItem",value:e.target.dataset.id});
					if(sue.apps.recentclosed.config.n_closebox){
						sue.apps.boxClose(e);
					}
				}
				break;
		}
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"recentclosed"},function(response){
	sue.apps.recentclosed.config=response.config;
	sue.apps.recentclosed.tabs=response.value.tabs;
	sue.apps.recentclosed.initUI()
})
