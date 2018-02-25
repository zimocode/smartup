console.log("numc");
let appName="numc";
appType[appName]=true;
sue.apps[appName]={
	cons:{},
	initUI:function(){
		sue.apps.init();
		var _appname="numc";
		var dom=sue.apps.domCreate("smartup",{setName:["className","id"],setValue:["su_apps","su_apps_"+_appname]},null,"z-index:"+parseInt((new Date().getTime())/1000),{setName:["appname"],setValue:[_appname]});
		dom.innerHTML=
			'<div class="su_head" style="">'
				+'<span class="su_title">'+sue.apps.i18n("numc")+'</span>'
				+'<div class="su_btn_close">x</div>'
			+'</div>'
			+'<div class="su_main">'
				+'<div class="numcbox">'
					+'<span class="su_numc_span">'+sue.apps.i18n("app_numc_from")+'<select class="su_numc_intype"></select>'+'</span><br />'
					+'<input class="su_numc_input" type="text"><br />'
					+'<span class="su_numc_span">'+sue.apps.i18n("app_numc_to")+'<select class="su_numc_outtype"></select>'+'</span><br />'
					+'<input class="su_numc_output" type="text"><br />'
					+'<button class="su_numc_btn">'+sue.apps.i18n("btn_done")+'</button>'
				+'</div>'
			+'</div>';
		dom.querySelector(".su_numc_btn").addEventListener("click",sue.apps[appName].handleEvent,false);
		sue.apps.initPos(dom);

		var selectIn=dom.querySelector("select.su_numc_intype");
		var selectOut=dom.querySelector("select.su_numc_outtype");
		for(var i=2;i<33;i++){
			var theOption=sue.apps.domCreate("option",{setName:["value"],setValue:[i.toString()]},i.toString());
			selectIn.appendChild(theOption);
		}
		selectOut.innerHTML=selectIn.innerHTML;

		chrome.storage.local.get(function(items){
			var data;
			!items.localConfig?(items.localConfig={},items.localConfig.apps={}):null;
			!items.localConfig.apps?items.localConfig.apps={}:null;
			if(!items.localConfig.apps[appName]){
				items.localConfig.apps[appName]={
					from:"10",
					to:"2",
					input:"100"
				}
				data=items.localConfig.apps[appName];
				chrome.storage.local.set(items);
			}else{
				data=items.localConfig.apps[appName];
			}
			
			dom.querySelector(".su_numc_input").value=data.input;
			dom.querySelector(".su_numc_intype").value=data.from;
			dom.querySelector(".su_numc_outtype").value=data.to;
		})		
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_numc_btn")){
					sue.apps[appName].convert(e);
				}
				break;
		}
	},
	convert:function(e){
		var dom=sue.apps.getAPPboxEle(e);
		var input=dom.querySelector(".su_numc_input").value;
		var from=dom.querySelector(".su_numc_intype").value;
		var to=dom.querySelector(".su_numc_outtype").value;
		var output;
		var outputdom=dom.querySelector(".su_numc_output");
		var from10=function(num,type){
			num=new Number(num);
			return num.toString(type)
		}
		var to10=function(num,type){
			return parseInt(num,type)
		}
		if(from=="10"){
			output=from10(input,to);
		}
		if(to=="10"){
			output=to10(input,from);
		}
		if(from!="10"&&to!="10"){
			output=from10(to10(input,from),to)
		}
		outputdom.value=output;
		chrome.storage.local.get(function(items){
			var obj={
				input:input,
				from:from,
				to:to
			}
			items.localConfig.apps[appName]=obj;
			chrome.storage.local.set(items);
		})
		let _obj={
			input:input,
			from:from,
			to:to
		}
		localStorage.setItem("miniapps_numc",JSON.stringify(_obj));
	}
}
sue.apps[appName].initUI();
