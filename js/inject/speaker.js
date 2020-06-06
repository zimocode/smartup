console.log("speaker")
sue.apps.speaker={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"speaker",
			headTitle:"speaker",
			headCloseBtn:true,
			menu:[
				{src:"/image/options.svg",title:"app_tip_opt",className:"menu_item menu_item_opt"}
			],
			options:[
				{type:"select",label:"n_voicename",name:"n_voicename",value:[]},
				{type:"select",label:"n_gender",name:"n_gender",value:["s_female","s_male"]},
				{type:"range",label:"n_rate",name:"n_rate",min:0.1,max:2,step:0.1},
				{type:"range",label:"n_pitch",name:"n_pitch",min:0.1,max:1,step:0.1},
				{type:"range",label:"n_volume",name:"n_volume",min:0.1,max:1,step:0.1}
			]
		}
		for(var i=0;i<sue.apps.speaker.voicename.length;i++){
			appInfo.options[0].value.push(sue.apps.speaker.voicename[i]);
		}
		sue.apps.init();
		var dom=sue.apps.initBox(appInfo);
			dom.id="su_apps_"+appInfo.appName;
		sue.apps[appInfo.appName].dom=dom;
		sue.apps.initPos(dom);

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_speakerbox"]});
		dom.querySelector(".su_main").appendChild(theAppBox);

		let _inputbox=sue.apps.domCreate("div",{setName:["className"],setValue:["speaker_inputbox"]}),
			_textarea=sue.apps.domCreate("textarea",{setName:["className"],setValue:["speaker_inputarea"]}),
			_br=sue.apps.domCreate("br"),
			_btnPlay=sue.apps.domCreate("button",{setName:["className"],setValue:["speaker_btn_play"]},null,null,null,sue.apps.i18n("btn_play")),
			_btnPause=sue.apps.domCreate("button",{setName:["className"],setValue:["speaker_btn_pause"]},null,"display:none;",null,sue.apps.i18n("btn_pause")),
			_btnStop=sue.apps.domCreate("button",{setName:["className"],setValue:["speaker_btn_stop"]},null,null,null,sue.apps.i18n("btn_stop"));
		_inputbox.appendChild(_textarea);
		_inputbox.appendChild(_br);
		_inputbox.appendChild(_btnPlay);
		_inputbox.appendChild(_btnPause);
		_inputbox.appendChild(_btnStop);
		theAppBox.appendChild(_inputbox);
        _btnPause.addEventListener("click",this,false);
        _btnPlay.addEventListener("click",this,false);
        _btnStop.addEventListener("click",this,false);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.className.indexOf("speaker_btn")==0){
					if(!sue.apps.getAPPboxEle(e).querySelector("textarea").value){return;}
					sue.apps.speaker.speaker(e);
					pausebtn=sue.apps.getAPPboxEle(e).querySelectorAll("button")[1];
					if(e.target.className=="speaker_btn_pause"){
						e.target.className="speaker_btn_resume";
						e.target.innerText=sue.apps.i18n("btn_resume");
					}else if(e.target.className=="speaker_btn_resume"){
						e.target.className="speaker_btn_pause";
						e.target.innerText=sue.apps.i18n("btn_pause");
					}else if(e.target.className=="speaker_btn_play"){
						pausebtn.style.cssText+="display:inline-block;";
					}else if(e.target.className=="speaker_btn_stop"){
						pausebtn.style.cssText+="display:none";
					}
				}
				break;
		}
	},
	speaker:function(e){
		chrome.runtime.sendMessage({type:"appsAction",app:"speaker",action:"speak",value:{type:e.target.className.substr(12),txt:sue.apps.getAPPboxEle(e).querySelector("textarea").value}})
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"speaker"},function(response){
	sue.apps.speaker.config=response.config;
	sue.apps.speaker.voicename=response.value.voicename;
	sue.apps.speaker.seltxt=response.value.seltxt;
	sue.apps.speaker.initUI();
})
