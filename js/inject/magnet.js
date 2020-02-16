console.log("magnet");
sue.apps.magnet={
	initUI:function(){
		let appInfo={
			appName:"magnet",
			headTitle:"magnet",
			headCloseBtn:true
		}
		sue.apps.init();
		var dom=sue.apps.initBox(appInfo);
			dom.id="su_apps_"+appInfo.appName;
		sue.apps[appInfo.appName].dom=dom;
		sue.apps.initPos(dom);

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_magnetbox"]});
		dom.querySelector(".su_main").appendChild(theAppBox);

		let domLeft=sue.apps.domCreate("div",{setName:["className"],setValue:["su_magenet_domleft"]});
		let domInput=sue.apps.domCreate("textarea",{setName:["className","placeholder"],setValue:["su_magenet_input",sue.apps.i18n("magnet_placeholder_input")]}),
			btnClear=sue.apps.domCreate("button",{setName:["className"],setValue:["su_magenet_btn su_magnet_clear"]},null,null,null,sue.apps.i18n("btn_clear")),
			btnDone=sue.apps.domCreate("button",{setName:["className"],setValue:["su_magenet_btn su_magnet_done"]},null,null,null,sue.apps.i18n("btn_done")),
			domOutput=sue.apps.domCreate("textarea",{setName:["className","disabled"],setValue:["su_magenet_output",true]}),
			domLink=sue.apps.domCreate("a",{setName:["className"],setValue:["su_magenet_link"]});

		let	domQr=sue.apps.domCreate("div",{setName:["className"],setValue:["su_magenet_qr"]});

		domLeft.appendChild(domInput);
		domLeft.appendChild(btnClear);
		domLeft.appendChild(btnDone);
		domLeft.appendChild(domOutput);
		domLeft.appendChild(domLink);
		theAppBox.appendChild(domLeft);
		theAppBox.appendChild(domQr);

		domInput.value=sue.apps.magnet.seltxt.trim();
		sue.apps.magnet.action(btnDone);
		theAppBox.addEventListener("click",this,false);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_magnet_clear")){
					sue.apps.magnet.clear(e.target.previousSibling);
				}else if(e.target.classList.contains("su_magnet_done")){
					sue.apps.magnet.action(e);
				}
				break;
		}
	},
	clear:function(dom){
		dom.value="";
	},
	action:function(e){
		let dom=e.target||e;
		let domOutput=dom.nextSibling,
			domLink=dom.parentNode.lastChild;
			domQr=sue.apps.getAPPboxEle(e).querySelector(".su_magenet_qr"),
			_str="magnet:?xt=urn:btih:"+dom.parentNode.firstChild.value;
		console.log(domQr);
		domOutput.value=_str;
		domLink.href=_str;
		domLink.target="_blank";
		domLink.textContent=_str;
		domQr.textContent="";
		new QRCode(domQr,_str);
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"magnet"},function(response){
	sue.apps.magnet.seltxt=response.value.seltxt;
	sue.apps.magnet.drawtype=response.value.drawtype;
	sue.apps.magnet.initUI();
})