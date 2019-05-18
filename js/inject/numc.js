console.log("numc");
let appName="numc";
appType[appName]=true;
sue.apps[appName]={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"numc",
			headTitle:"numc",
			headCloseBtn:true
		}
		sue.apps.init();
		var dom=sue.apps.initBox(appInfo);
			dom.id="su_apps_"+appInfo.appName;
		sue.apps[appInfo.appName].dom=dom;
		sue.apps.initPos(dom);

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["numcbox"]});
		dom.querySelector(".su_main").appendChild(theAppBox);

		let _spanFrom=sue.apps.domCreate("span",{setName:["className"],setValue:["su_numc_span"]},null,null,null,sue.apps.i18n("app_numc_from")),
			_selectFrom=sue.apps.domCreate("select",{setName:["className"],setValue:["su_numc_intype"]}),
			_brFrom=sue.apps.domCreate("br"),
			_textInput=sue.apps.domCreate("input",{setName:["className"],setValue:["su_numc_input"]}),
			_spanTo=sue.apps.domCreate("span",{setName:["className"],setValue:["su_numc_span"]},null,null,null,sue.apps.i18n("app_numc_to")),
			_selectTo=sue.apps.domCreate("select",{setName:["className"],setValue:["su_numc_outtype"]}),
			_brTo=sue.apps.domCreate("br"),
			_textOutput=sue.apps.domCreate("input",{setName:["className"],setValue:["su_numc_output"]}),
			_btn=sue.apps.domCreate("button",{setName:["className"],setValue:["su_numc_btn"]},null,null,null,sue.apps.i18n("btn_done"));
		_textInput.type="text";
		_textOutput.type="text";

		for(var i=2;i<33;i++){
			var _optionFrom=sue.apps.domCreate("option",{setName:["value"],setValue:[i.toString()]},null,null,null,i.toString()),
				_optionTo=sue.apps.domCreate("option",{setName:["value"],setValue:[i.toString()]},null,null,null,i.toString());
			_selectFrom.appendChild(_optionFrom);
			_selectTo.appendChild(_optionTo);
		}

		theAppBox.appendChild(_spanFrom);
		theAppBox.appendChild(_selectFrom);
		theAppBox.appendChild(_brFrom);
		theAppBox.appendChild(_textInput);
		theAppBox.appendChild(_spanTo);
		theAppBox.appendChild(_selectTo);
		theAppBox.appendChild(_brTo);
		theAppBox.appendChild(_textOutput);
		theAppBox.appendChild(_btn);

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
			
			_textInput.value=data.input;
			_selectFrom.value=data.from;
			_selectTo.value=data.to;
		})

		_btn.addEventListener("click",sue.apps[appName].handleEvent,false);
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
