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
		// url
		let _domUrl=sue.apps.domCreate("input",{setName:["className","id","name","type"],setValue:["qr_type_url","qr_type_url_"+_time,"qr_type_"+_time,"radio"]},),
			_labelUrl=sue.apps.domCreate("label",{setName:["htmlFor"],setValue:["qr_type_url_"+_time]},null,null,null,sue.apps.i18n("app_qr_url")),
			_brUrl=sue.apps.domCreate("br");
		_eleBox.appendChild(_domUrl);
		_eleBox.appendChild(_labelUrl);
		_eleBox.appendChild(_brUrl);
		// select text
		let _domSeltxt=sue.apps.domCreate("input",{setName:["className","id","name","type"],setValue:["qr_type_seltxt","qr_type_seltxt_"+_time,"qr_type_"+_time,"radio"]}),
			_labelSeltxt=sue.apps.domCreate("label",{setName:["htmlFor"],setValue:["qr_type_seltxt_"+_time]},null,null,null,sue.apps.i18n("app_qr_seltxt")),
			_brSeltxt=sue.apps.domCreate("br");
		_eleBox.appendChild(_domSeltxt);
		_eleBox.appendChild(_labelSeltxt);
		_eleBox.appendChild(_brSeltxt);
		// select link
		let _domSellnk=sue.apps.domCreate("input",{setName:["className","id","name","type"],setValue:["qr_type_sellnk","qr_type_sellnk_"+_time,"qr_type_"+_time,"radio"]}),
			_labelSellnk=sue.apps.domCreate("label",{setName:["htmlFor"],setValue:["qr_type_sellnk_"+_time]},null,null,null,sue.apps.i18n("app_qr_sellnk")),
			_brSellnk=sue.apps.domCreate("br");
		_eleBox.appendChild(_domSellnk);
		_eleBox.appendChild(_labelSellnk);
		_eleBox.appendChild(_brSellnk);
		// title
		let _domTitle=sue.apps.domCreate("input",{setName:["className","id","name","type"],setValue:["qr_type_title","qr_type_title_"+_time,"qr_type_"+_time,"radio"]}),
			_labelTitle=sue.apps.domCreate("label",{setName:["htmlFor"],setValue:["qr_type_title_"+_time]},null,null,null,sue.apps.i18n("app_qr_title")),
			_brTitle=sue.apps.domCreate("br");
		_eleBox.appendChild(_domTitle);
		_eleBox.appendChild(_labelTitle);
		_eleBox.appendChild(_brTitle);
		// customer
		let _domCustomer=sue.apps.domCreate("input",{setName:["className","id","name","type"],setValue:["qr_type_customer","qr_type_customer_"+_time,"qr_type_"+_time,"radio"]}),
			_labelCustomer=sue.apps.domCreate("label",{setName:["htmlFor"],setValue:["qr_type_customer_"+_time]},null,null,null,sue.apps.i18n("app_qr_customer")),
			_brCustomer=sue.apps.domCreate("br");
		_eleBox.appendChild(_domCustomer);
		_eleBox.appendChild(_labelCustomer);
		_eleBox.appendChild(_brCustomer);

		_inputBox.appendChild(_eleBox);

		let _textarea=sue.apps.domCreate("textarea",{setName:["className"],setValue:["qr_inputarea"]});
		_textarea.disabled="disabled";
		_inputBox.appendChild(_textarea);
		theAppBox.appendChild(_inputBox);

		let _btn=sue.apps.domCreate("button",{setName:["className"],setValue:["qr_btn"]},null,null,null,sue.apps.i18n("btn_done"));
		_inputBox.appendChild(_btn);

		let _outputBox=sue.apps.domCreate("div",{setName:["className"],setValue:["qr_outputbox"]}),
			_outputDiv=sue.apps.domCreate("div",{setName:["className"],setValue:["qr_output"]});
		_outputBox.appendChild(_outputDiv);
		theAppBox.appendChild(_outputBox);

		if(sue.apps.qr.drawtype&&(sue.apps.qr.drawtype[0]=="drg"||sue.apps.qr.drawtype[0]=="sdrg")&&sue.apps.qr.seltxt){
			_domSeltxt.checked=true;
			_textarea.innerText=sue.apps.qr.seltxt;
		}else if(sue.apps.qr.sellnk){
			_domSellnk.checked=true;
			_textarea.innerText=sue.apps.qr.sellnk;
		}else{
			_domUrl.checked=true;
			_textarea.innerText=location.href;
		}

		sue.apps.qr.code(_textarea);

		_domCustomer.addEventListener("change",this,false);
		_domTitle.addEventListener("change",this,false);
		_domUrl.addEventListener("change",this,false);
		_domSeltxt.addEventListener("change",this,false);
		_domSellnk.addEventListener("change",this,false);
		_textarea.addEventListener("change",this,false);
		_btn.addEventListener("click",this,false);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("qr_btn")){sue.apps.qr.code(e);}
				break;
			case"change":
				console.log(e);
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
				sue.apps.qr.code(e);
		}
	},
	code:function(e){
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
		sue.apps.getAPPboxEle(e).querySelector(".qr_output").textContent="";
		new QRCode(sue.apps.getAPPboxEle(e).querySelector(".qr_output"),objinput.value);
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"qr"},function(response){
	sue.apps.qr.seltxt=response.value.seltxt;
	sue.apps.qr.sellnk=response.value.sellnk;
	sue.apps.qr.drawtype=response.value.drawtype;
	sue.apps.qr.initUI();
})
