//console.log("recentbk");
sue.apps.recentbk={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"recentbk",
			headTitle:"recentbk",
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

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["recentbkbox"]});
		dom.querySelector(".su_main").appendChild(theAppBox);

		var _ul=sue.apps.domCreate("ul");
		for(var i=0;i<this.bk.length;i++){
			var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_recentbk_li"]},"<span class='li_0'>"+this.bk[i].title+"</span><span class='li_1' title='"+this.bk[i].title+"''>"+this.bk[i].url+"</span>","",{setName:["id"],setValue:[i]},"");
			_ul.appendChild(_li);
			_li.querySelector(".li_1").removeEventListener("click",this,false);
			_li.querySelector(".li_1").addEventListener("click",this,false);
		}
		theAppBox.appendChild(_ul);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_recentbk_li")||e.target.parentNode.classList.contains("su_recentbk_li")){
					var theDom=e.target.classList.contains("su_recentbk_li")?e.target:e.target.parentNode;
					chrome.runtime.sendMessage({type:"appsAction",app:"recentbk",action:"openItem",value:sue.apps.recentbk.bk[theDom.dataset.id].url});
					if(sue.apps.recentbk.config.n_closebox){
						sue.apps.boxClose(e)
					}
				}
				break;
		}
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"recentbk"},function(response){
	sue.apps.recentbk.config=response.config;
	sue.apps.recentbk.bk=response.value.bk;
	sue.apps.recentbk.initUI()
})
