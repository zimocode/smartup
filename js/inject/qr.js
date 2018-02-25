console.log("qr")
sue.apps.qr={
	cons:{
		boxmove:{}
	},
	initUI:function(){
		sue.apps.init();
		var _appname="qr",
			_time=parseInt((new Date().getTime())/1000);
		var dom=sue.apps.domCreate("smartup",{setName:["className","id"],setValue:["su_apps","su_apps_"+_appname]},null,"z-index:"+_time,{setName:["appname"],setValue:[_appname]});
		dom.innerHTML=
			'<div class="su_head" style="">'
				+'<span class="su_title">'+sue.apps.i18n("qr")+'</span>'
				+'<div class="su_btn_close">x</div>'
			+'</div>'
			+'<div class="su_main">'
				+'<div class="su_qrbox">'
					+'<div class="qr_inputbox">'
						+'<div class="qr_typelist"><input class="qr_type_url" id="qr_type_url_'+_time+'" name="qr_type_'+_time+'" type="radio"><label for="qr_type_url_'+_time+'">'+sue.apps.i18n("app_qr_url")+'</label></div>'
						+'<div class="qr_typelist"><input class="qr_type_seltxt" id="qr_type_seltxt_'+_time+'" name="qr_type_'+_time+'" type="radio"><label for="qr_type_seltxt_'+_time+'">'+sue.apps.i18n("app_qr_seltxt")+'</label></div>'
						+'<div class="qr_typelist"><input class="qr_type_sellnk" id="qr_type_sellnk_'+_time+'" name="qr_type_'+_time+'" type="radio"><label for="qr_type_sellnk_'+_time+'">'+sue.apps.i18n("app_qr_sellnk")+'</label></div>'
						+'<div class="qr_typelist"><input class="qr_type_title" id="qr_type_title_'+_time+'" name="qr_type_'+_time+'" type="radio"><label for="qr_type_title_'+_time+'">'+sue.apps.i18n("app_qr_title")+'</label></div>'
						+'<div class="qr_typelist"><input class="qr_type_customer" id="qr_type_customer_'+_time+'" name="qr_type_'+_time+'" type="radio"><label for="qr_type_customer_'+_time+'">'+sue.apps.i18n("app_qr_customer")+'</label></div>'
						+'<textarea class="qr_inputarea" disabled="disabled">'+location.href+'</textarea><br />'
						+'<button class="qr_btn_done">'+sue.apps.i18n("btn_done")+'</button>'
						+'<div class="su_copyright">Based on <a href="https://github.com/jeromeetienne/jquery-qrcode" target="_blank">jquery-qrcode@Github</a></div>'
					+'</div>'
					+'<div class="qr_outputbox">'
						+'<div class="qr_output"></div>'
						+'<button class="qr_btn_back">'+sue.apps.i18n("btn_back")+'</button>'
					+'</div>'
				+'</div>'
			+'</div>';
        if(sue.apps.qr.drawtype&&(sue.apps.qr.drawtype[0]=="drg"||sue.apps.qr.drawtype[0]=="sdrg")&&sue.apps.qr.seltxt){
        	dom.querySelector(".qr_type_seltxt").checked=true;
        	dom.querySelector(".qr_inputarea").innerText=sue.apps.qr.seltxt;
		}else if(sue.apps.qr.sellnk){
			dom.querySelector(".qr_type_sellnk").checked=true;
        	dom.querySelector(".qr_inputarea").innerText=sue.apps.qr.sellnk;
		}else{
        	dom.querySelector(".qr_type_url").checked=true;
        	dom.querySelector(".qr_inputarea").innerText=location.href;
        }

        dom.querySelector(".qr_btn_done").addEventListener("click",this,false);
        dom.querySelector(".qr_btn_back").addEventListener("click",this,false);
        dom.querySelector(".qr_type_customer").addEventListener("change",this,false);
        dom.querySelector(".qr_type_title").addEventListener("change",this,false);
        dom.querySelector(".qr_type_url").addEventListener("change",this,false);
        dom.querySelector(".qr_type_seltxt").addEventListener("change",this,false);
        dom.querySelector(".qr_type_sellnk").addEventListener("change",this,false);
		sue.apps.initPos(dom);
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
					sue.apps.getAPPboxEle(e).querySelector(".qr_output").innerHTML="";
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
