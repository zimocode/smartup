console.log("base64")
sue.apps.base64={
	cons:{
		boxmove:{}
	},
	initUI:function(){
		let appInfo={
			appName:"base64",
			headTitle:"base64",
			headCloseBtn:true
		}
		sue.apps.init();
		var dom=sue.apps.initBox(appInfo);
			dom.id="su_apps_"+appInfo.appName;
		sue.apps[appInfo.appName].dom=dom;
		sue.apps.initPos(dom);

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["base64box"]});
		dom.querySelector(".su_main").appendChild(theAppBox);

		let _str=sue.apps.domCreate("div",{setName:["className"],setValue:["base_str"]}),
			_textStr=sue.apps.domCreate("textarea",{setName:["className"],setValue:["base_areastr"]},null,null,null,"dGVzdA=="),
			_brStr=sue.apps.domCreate("br"),
			_btnEncode=sue.apps.domCreate("button",{setName:["className"],setValue:["base_btn_encode"]},null,null,null,sue.apps.i18n("btn_encode")),
			_btnDecode=sue.apps.domCreate("button",{setName:["className"],setValue:["base_btn_decode"]},null,null,null,sue.apps.i18n("btn_decode"));
		let _code=sue.apps.domCreate("div",{setName:["className"],setValue:["base_code"]}),
			_textCode=sue.apps.domCreate("textarea",{setName:["className"],setValue:["base_areacode"]}),
			_brCode=sue.apps.domCreate("br"),
			_btnBack=sue.apps.domCreate("button",{setName:["className"],setValue:["base_btn_back"]},null,null,null,sue.apps.i18n("btn_back"));
		let _copyright=sue.apps.domCreate("div",{setName:["className"],setValue:["su_copyright"]},null,null,null,"Based on "),
			_link=sue.apps.domCreate("a",null,null,null,null,"js-base64@Github");
		_link.href="https://github.com/dankogai/js-base64";
		_link.target="_blank";

		_str.appendChild(_textStr);
		_str.appendChild(_brStr);
		_str.appendChild(_btnEncode);
		_str.appendChild(_btnDecode);
		_code.appendChild(_textCode);
		_code.appendChild(_brCode);
		_code.appendChild(_btnBack);
		_copyright.appendChild(_link);
		theAppBox.appendChild(_str);
		theAppBox.appendChild(_code);
		theAppBox.appendChild(_copyright);

        _btnEncode.addEventListener("click",this,false);
        _btnDecode.addEventListener("click",this,false);
        _btnBack.addEventListener("click",this,false);
		sue.apps.initPos(dom);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				var objstr=sue.apps.getAPPboxEle(e).querySelector(".base_str textarea"),
					objcode=sue.apps.getAPPboxEle(e).querySelector(".base_code textarea");
				objcode.value="";
				if(!objstr.value){return;}
				if(e.target.classList.contains("base_btn_encode")){
					sue.apps.base64.showPanel(e);
					objcode.value=Base64.toBase64(objstr.value);
				}else if(e.target.classList.contains("base_btn_decode")){
					sue.apps.base64.showPanel(e);
					objcode.value=Base64.fromBase64(objstr.value);
				}else if(e.target.classList.contains("base_btn_back")){
					sue.apps.base64.showPanel(e);
				}
				break;
		}
	},
	showPanel:function(e){
		var obj=sue.apps.getAPPboxEle(e).querySelector(".base_code");
		if(e.target.classList.contains("base_btn_back")){
			obj.style.cssText+="left:-400px;"
		}else{
			obj.style.cssText+="left:8px;"
		}
	}
}
sue.apps.base64.initUI();