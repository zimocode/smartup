console.log("qr")
sue.apps.qr={
	cons:{
		boxmove:{}
	},
	initUI:function(){
		let appInfo={
			appName:"qr",
			headTitle:"qr",
			headCloseBtn:true
		}
		sue.apps.init();
		var dom=sue.apps.initBox(appInfo);
			dom.id="su_apps_"+appInfo.appName;
		sue.apps[appInfo.appName].dom=dom;
		sue.apps.initPos(dom);

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_qrbox"]});
		dom.querySelector(".su_main").appendChild(theAppBox);

		let _time=parseInt((new Date().getTime())/1000);
		let _inputBox=sue.apps.domCreate("div",{setName:["className"],setValue:["qr_inputbox"]}),
			_eleBox=sue.apps.domCreate("div",null,null,"text-align:left;",null,null);

		let _url=sue.apps.domCreate("input",{setName:["className","id"],setValue:["qr_type_url","qr_type_url_"+_time]}),
			_labelUrl=sue.apps.domCreate("label",null,null,null,null,sue.apps.i18n("app_qr_url")),
			_brUrl=sue.apps.domCreate("br");
		_url.name="qr_type_"+_time;
		_url.type="radio";
		_labelUrl.htmlFor="qr_type_url_"+_time;
		_eleBox.appendChild(_url);
		_eleBox.appendChild(_labelUrl);
		_eleBox.appendChild(_brUrl);

		let _seltxt=sue.apps.domCreate("input",{setName:["className","id"],setValue:["qr_type_seltxt","qr_type_seltxt_"+_time]}),
			_labelSeltxt=sue.apps.domCreate("label",null,null,null,null,sue.apps.i18n("app_qr_seltxt")),
			_brSeltxt=sue.apps.domCreate("br");
		_seltxt.name="qr_type_"+_time;
		_seltxt.type="radio";
		_labelSeltxt.htmlFor="qr_type_seltxt_"+_time;
		_eleBox.appendChild(_seltxt);
		_eleBox.appendChild(_labelSeltxt);
		_eleBox.appendChild(_brSeltxt);

		let _sellnk=sue.apps.domCreate("input",{setName:["className","id"],setValue:["qr_type_sellnk","qr_type_sellnk_"+_time]}),
			_labelSellnk=sue.apps.domCreate("label",null,null,null,null,sue.apps.i18n("app_qr_sellnk")),
			_brSellnk=sue.apps.domCreate("br");
		_sellnk.name="qr_type_"+_time;
		_sellnk.type="radio";
		_labelSellnk.htmlFor="qr_type_sellnk_"+_time;
		_eleBox.appendChild(_sellnk);
		_eleBox.appendChild(_labelSellnk);
		_eleBox.appendChild(_brSellnk);

		let _title=sue.apps.domCreate("input",{setName:["className","id"],setValue:["qr_type_title","qr_type_title_"+_time]}),
			_labelTitle=sue.apps.domCreate("label",null,null,null,null,sue.apps.i18n("app_qr_title")),
			_brTitle=sue.apps.domCreate("br");
		_title.name="qr_type_"+_time;
		_title.type="radio";
		_labelTitle.htmlFor="qr_type_title_"+_time;
		_eleBox.appendChild(_title);
		_eleBox.appendChild(_labelTitle);
		_eleBox.appendChild(_brTitle);

		let _customer=sue.apps.domCreate("input",{setName:["className","id"],setValue:["qr_type_customer","qr_type_customer_"+_time]}),
			_labelCustomer=sue.apps.domCreate("label",null,null,null,null,sue.apps.i18n("app_qr_customer")),
			_brCustomer=sue.apps.domCreate("br");
		_customer.name="qr_type_"+_time;
		_customer.type="radio";
		_labelCustomer.htmlFor="qr_type_customer_"+_time;
		_eleBox.appendChild(_customer);
		_eleBox.appendChild(_labelCustomer);
		_eleBox.appendChild(_brCustomer);

		_inputBox.appendChild(_eleBox);

		let _textarea=sue.apps.domCreate("textarea",{setName:["className"],setValue:["qr_inputarea"]});
		_textarea.disabled="disabled";
		_inputBox.appendChild(_textarea);

		let _btn=sue.apps.domCreate("button",{setName:["className"],setValue:["qr_btn_done"]},null,null,null,sue.apps.i18n("btn_done"));
		_inputBox.appendChild(_btn);

		let _copyright=sue.apps.domCreate("div",{setName:["className"],setValue:["su_copyright"]},null,null,null,"Based on "),
			_link=sue.apps.domCreate("a",null,null,null,null,"jquery-qrcode@Github");
		_link.href="https://github.com/jeromeetienne/jquery-qrcode";
		_link.target="_blank";
		_copyright.appendChild(_link);
		_inputBox.appendChild(_copyright);

		theAppBox.appendChild(_inputBox);

		let _outputBox=sue.apps.domCreate("div",{setName:["className"],setValue:["qr_outputbox"]}),
			_outputDiv=sue.apps.domCreate("div",{setName:["className"],setValue:["qr_output"]}),
			_btnBack=sue.apps.domCreate("button",{setName:["className"],setValue:["qr_btn_back"]},null,null,null,sue.apps.i18n("btn_back"));
		_outputBox.appendChild(_outputDiv);
		_outputBox.appendChild(_btnBack);
		theAppBox.appendChild(_outputBox);

		if(sue.apps.qr.drawtype&&(sue.apps.qr.drawtype[0]=="drg"||sue.apps.qr.drawtype[0]=="sdrg")&&sue.apps.qr.seltxt){
			_seltxt.checked=true;
			_textarea.innerText=sue.apps.qr.seltxt;
		}else if(sue.apps.qr.sellnk){
			_sellnk.checked=true;
			_textarea.innerText=sue.apps.qr.sellnk;
		}else{
			_url.checked=true;
			_textarea.innerText=location.href;
		}

		_btn.addEventListener("click",this,false);
		_btnBack.addEventListener("click",this,false);
		_customer.addEventListener("change",this,false);
		_title.addEventListener("change",this,false);
		_url.addEventListener("change",this,false);
		_seltxt.addEventListener("change",this,false);
		_sellnk.addEventListener("change",this,false);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				function toUtf8(str) {    
				    var out, i, len, c;    
				    out = "";    
				    len = str.length;    
				    for(i = 0; i < len; i++) {    
				        c = str.charCodeAt(i);    
				        if ((c >= 0x0001) && (c <= 0x007F)) {    
				            out += str.charAt(i);    
				        } else if (c > 0x07FF) {    
				            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));    
				            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));    
				            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));    
				        } else {    
				            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));    
				            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));    
				        }    
				    }    
				    return out;    
				}

				var objinput=sue.apps.getAPPboxEle(e).querySelector(".qr_inputarea"),
					objcode=sue.apps.getAPPboxEle(e).querySelector(".base_code textarea");
				if(!objinput.value){return;}
				if(e.target.classList.contains("qr_btn_done")){
					sue.apps.qr.showPanel(e);
					sue.apps.getAPPboxEle(e).querySelector(".qr_output").textContent="";
					jQuery('.qr_output').qrcode(toUtf8(objinput.value));
				}else if(e.target.classList.contains("qr_btn_back")){
					sue.apps.qr.showPanel(e);
				}
				break;
			case"change":
				if(e.target.name.indexOf("qr_type")!=0){return;}
				var _area=sue.apps.getAPPboxEle(e).querySelector(".qr_inputarea");
				if(e.target.classList.contains("qr_type_url")){
					_area.value=location.href;
					_area.disabled="disabled";
				}else if(e.target.classList.contains("qr_type_title")){
					_area.value=document.title;
					_area.disabled="disabled";
				}else if(e.target.classList.contains("qr_type_seltxt")){
					console.log(sue.apps.qr.seltxt)
					_area.value=sue.apps.qr.seltxt;
					_area.disabled="disabled";
				}else if(e.target.classList.contains("qr_type_sellnk")){
					_area.value=sue.apps.qr.sellnk;
					_area.disabled="disabled";
				}else{
					//_area.value="";
					_area.removeAttribute("disabled");
					_area.focus();
				}
				break;
		}
	},
	showPanel:function(e){
		var obj=sue.apps.getAPPboxEle(e).querySelector(".qr_outputbox");
		if(e.target.classList.contains("qr_btn_back")){
			obj.style.cssText+="left:-500px;"
		}else{
			obj.style.cssText+="left:8px;"
		}
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"qr"},function(response){
	sue.apps.qr.seltxt=response.value.seltxt;
	sue.apps.qr.sellnk=response.value.sellnk;
	sue.apps.qr.drawtype=response.value.drawtype;
	sue.apps.qr.initUI();
})
