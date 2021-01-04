sue.apps.shorturl={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"shorturl",
			headTitle:"shorturl",
			headCloseBtn:true,
			menu:[
				{src:"/image/options.svg",title:"app_tip_opt",className:"menu_item menu_item_opt"}/*,
				{src:"/image/edit.svg",title:"editmode",className:"menu_item menu_item_edit"}*/
			],
			options:[
				{type:"checkbox",label:"n_qr",name:"n_qr",checked:true}/*,
				{type:"checkbox",label:"n_suyourls",name:"n_suyourls",checked:true},
				{type:"text",label:"n_yourls",name:"n_yourls",checked:true},
				{type:"text",label:"n_sign",name:"n_sign",checked:true}*/
			]
		}
		sue.apps.init();
		var dom=sue.apps.initBox(appInfo);
			dom.id="su_apps_"+appInfo.appName;
		sue.apps[appInfo.appName].dom=dom;
		sue.apps.initPos(dom);

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_shorturl_box"]});
		dom.querySelector(".su_main").appendChild(theAppBox);

		let domInfo=sue.apps.domCreate("div",{setName:["className"],setValue:["su_shorturl_info"]},null,null,null,sue.apps.i18n("app_shorturl_wait"));
		let domAction=sue.apps.domCreate("div",{setName:["className"],setValue:["su_shorturl_action"]}),
			domQr=sue.apps.domCreate("div",{setName:["className"],setValue:["su_shorturl_qr"]});
		theAppBox.appendChild(domAction);
		theAppBox.appendChild(domQr);

		let domSourceText=sue.apps.domCreate("textarea",{setName:["className","type","value","disabled"],setValue:["su_shorturl_textsource","text",window.location.href,"disabled"]},null,null,null),
			domKey=sue.apps.domCreate("input",{setName:["className","type","placeholder","title"],setValue:["su_shorturl_textkey","text",sue.apps.i18n("app_shorturl_keyholder"),sue.apps.i18n("app_shorturl_keyholder")]},null,null,null),
			domBtn=sue.apps.domCreate("button",{setName:["className"],setValue:["su_shorturl_btn"]},null,null,null,sue.apps.i18n("app_shorturl_btn")),
			domShortText=sue.apps.domCreate("input",{setName:["className","type","disabled"],setValue:["su_shorturl_textshort","text","disabled"]},null,null,null,null);

		let labelSource=sue.apps.domCreate("label",{setName:["className"],setValue:["su_shorturl_labelsource"]},null,null,null,sue.apps.i18n("app_shorturl_source")),
			labelkey=sue.apps.domCreate("label",{setName:["className"],setValue:["su_shorturl_labelkey"]},null,"clear:both;",null,sue.apps.i18n("app_shorturl_key")),
			labelshort=sue.apps.domCreate("label",{setName:["className"],setValue:["su_shorturl_labelshort"]},null,"clear:both;",null,sue.apps.i18n("app_shorturl_short"));

		domAction.appendChild(labelSource);
		domAction.appendChild(domSourceText);
		domAction.appendChild(labelkey);
		domAction.appendChild(domKey);
		domAction.appendChild(labelshort);
		domAction.appendChild(domShortText);
		domAction.appendChild(domBtn);
		domAction.appendChild(domInfo);
		dom.addEventListener("click",this.handleEvent,false);

	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_shorturl_btn")){
					sue.apps.shorturl.getURL(e);
				}
				break;
		}
	},
	initValue:function(responseData){
		console.log(responseData);
		if(responseData.status=="fail"&&!responseData.shorturl){
			sue.apps.shorturl.error(responseData.code);
			return;
		}
		let dom=sue.apps.shorturl.dom;
		let textSourceurl=dom.querySelector(".su_shorturl_textsource"),
			textShorturl=dom.querySelector(".su_shorturl_textshort"),
			divInfo=dom.querySelector(".su_shorturl_info"),
			qr=dom.querySelector(".su_shorturl_qr");

		divInfo.innerText=sue.apps.i18n("app_shorturl_success");
		textSourceurl.value=responseData.url.url;
		textShorturl.value=responseData.shorturl;
		if(sue.apps.shorturl.config.n_qr){
			sue.apps.shorturl.initQr(responseData.shorturl);
			qr.style.cssText+="display:block;";
		}else{
			qr.style.cssText+="display:none;";
		}
	},
	initQr:function(str){
		let domQr=sue.apps.shorturl.dom.querySelector(".su_shorturl_qr");
			domQr.textContent="";
		new QRCode(domQr,str);
	},
	getURL:function(e){
		sue.apps.getAPPboxEle(e).querySelector(".su_shorturl_info").innerText=sue.apps.i18n("app_shorturl_Waitserver");
		chrome.runtime.sendMessage({type:"appsAction",app:"shorturl",action:"getURL",value:{key:sue.apps.getAPPboxEle(e).querySelector(".su_shorturl_textkey").value}});
	},
	error:function(err){
		sue.apps.shorturl.dom.querySelector(".su_shorturl_info").innerText=sue.apps.i18n("app_shorturl_err")+err;
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"shorturl"},function(response){
	sue.apps.shorturl.config=response.config;
	sue.apps.shorturl.initUI();
})
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	console.log(message)
	if(message.app!="shorturl"){return;}
	switch(message.type){
		case"url":
			sue.apps.shorturl.initValue(message.value);
			break;
		case"err":
			sue.apps.shorturl.error(message.value);
			break;
	}
})