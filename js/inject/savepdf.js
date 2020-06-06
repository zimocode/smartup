console.log("savepdf")
sue.apps.savepdf={
	cons:{
		boxmove:{}
	},
	defaultConf:{
		footerCenter:"",
		footerLeft:"&PT",
		footerRight:"&D",
		headerCenter:"",
		headerLeft:"&T",
		headerRight:"&U",
		marginBottom:0.5,
		marginLeft:0.5,
		marginRight:0.5,
		marginTop:0.5,
		orientation:0,
		paperHeight:11.0,
		paperSizeUnit:0,
		paperWidth:8.5,
		scaling:1,
		showBackgroundColors:false,
		showBackgroundImages:false,
		shrinkToFit:true
	},
	initUI:function(){
		let appInfo={
			appName:"savepdf",
			headTitle:"savepdf",
			headCloseBtn:true,
			menu:[
				{src:"/image/options.svg",title:"app_tip_opt",className:"menu_item menu_item_opt"},
				{src:"/image/info.svg",title:"",className:"menu_item menu_item_help"}
			]
		}
		sue.apps.init();
		var dom=sue.apps.initBox(appInfo);
			dom.id="su_apps_"+appInfo.appName;
		sue.apps[appInfo.appName].dom=dom;
		sue.apps.initPos(dom);

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["savepdfbox"]});
		dom.querySelector(".su_main").appendChild(theAppBox);

		let _optBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_options"]}),
			_optDes=sue.apps.domCreate("div",null,null,null,null,sue.apps.i18n("savepdf_resetDes")),
			_optBtnBox=sue.apps.domCreate("div",{setName:["className"],setValue:["options_btnbox"]}),
			_optBtn=sue.apps.domCreate("button",{setName:["className"],setValue:["options_btn_reset"]},null,null,null,sue.apps.i18n("btn_reset"));
		_optBtnBox.appendChild(_optBtn);
		_optBox.appendChild(_optDes);
		_optBox.appendChild(_optBtnBox);
		dom.appendChild(_optBox);

		let _infoBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_options_help"]}),
			_info=sue.apps.domCreate("div",null,null,null,null,sue.apps.i18n("savepdf_info"));
		_infoBox.appendChild(_info);
		dom.appendChild(_infoBox);

		chrome.storage.local.get(function(items){
			var data;
			!items.localConfig?(items.localConfig={},items.localConfig.apps={}):null;
			!items.localConfig.apps?items.localConfig.apps={}:null;
			if(!items.localConfig.apps.savepdf){
				items.localConfig.apps.savepdf=sue.apps.savepdf.defaultConf;
				data=items.localConfig.apps.savepdf;
				chrome.storage.local.set(items);
			}else{
				data=items.localConfig.apps.savepdf;
			}
			//sue.apps.savepdf.initValue(data);
			sue.apps.savepdf.initOptions(data);
			dom.addEventListener("click",sue.apps.savepdf.handleEvent,false);
			sue.apps.initPos(dom);
		})
	},
	initOptions:function(pdfConf){
		let theAppBox=sue.apps.savepdf.dom.querySelector(".savepdfbox");
		theAppBox.textContent="";

		let _btnBox=sue.apps.domCreate("div",{setName:["className"],setValue:["btnbox"]}),
			_btn=sue.apps.domCreate("button",{setName:["className"],setValue:["su_savepdf_btn"]},null,null,null,"Generate PDF");
		_btnBox.appendChild(_btn);
		theAppBox.appendChild(_btnBox);

		let _spanOri=sue.apps.domCreate("span",{setName:["className"],setValue:["su_savepdf_span"]},null,null,null,sue.apps.i18n("savepdf_"+"orientation")),
			_selectOri=sue.apps.domCreate("select",{setName:["className","name"],setValue:["pdfele","savepdf_orientation"]});
		let _optionOri_0=sue.apps.domCreate("option",{setName:["value"],setValue:["0"]},null,null,null,sue.apps.i18n("savepdf_"+"portrait")),
			_optionOri_1=sue.apps.domCreate("option",{setName:["value"],setValue:["1"]},null,null,null,sue.apps.i18n("savepdf_"+"landscape"))
		_selectOri.appendChild(_optionOri_0);
		_selectOri.appendChild(_optionOri_1);
		_selectOri.selectedIndex=pdfConf.orientation;
		theAppBox.appendChild(_spanOri);
		theAppBox.appendChild(_selectOri);
		theAppBox.appendChild(sue.apps.domCreate("br"));

		let _spanPap=sue.apps.domCreate("span",{setName:["className"],setValue:["su_savepdf_span"]},null,null,null,sue.apps.i18n("savepdf_"+"paperSizeUnit")),
			_selectPap=sue.apps.domCreate("select",{setName:["className","name"],setValue:["pdfele","savepdf_paperSizeUnit"]});
		let _optionPap_0=sue.apps.domCreate("option",{setName:["value"],setValue:["0"]},null,null,null,sue.apps.i18n("savepdf_"+"inches")),
			_optionPap_1=sue.apps.domCreate("option",{setName:["value"],setValue:["1"]},null,null,null,sue.apps.i18n("savepdf_"+"millimeters"))
		_selectPap.appendChild(_optionPap_0);
		_selectPap.appendChild(_optionPap_1);
		_selectPap.selectedIndex=pdfConf.paperSizeUnit;
		theAppBox.appendChild(_spanPap);
		theAppBox.appendChild(_selectPap);
		theAppBox.appendChild(sue.apps.domCreate("br"));

		let _arrayCheck=["showBackgroundColors","showBackgroundImages","shrinkToFit"];
		for(var i=0;i<_arrayCheck.length;i++){
			var _check=sue.apps.domCreate("input",{setName:["className","id","type","checked"],setValue:["pdfele su_savepdf_text","savepdf_"+_arrayCheck[i],"checkbox",(pdfConf[_arrayCheck[i]]?" checked":"")]});
			var	_label=sue.apps.domCreate("label",{setName:["className","for"],setValue:["su_savepdf_label","savepdf_"+_arrayCheck[i]]},null,null,null,sue.apps.i18n("savepdf_"+_arrayCheck[i]));
			theAppBox.appendChild(_check);
			theAppBox.appendChild(_label);
			theAppBox.appendChild(sue.apps.domCreate("br"));
		}

		let _arrayText=["footerCenter","footerLeft","footerRight","headerCenter","headerLeft","headerRight"];
		for(var i=0;i<_arrayText.length;i++){
			var _spanText=sue.apps.domCreate("span",{setName:["className"],setValue:["su_savepdf_span"]},null,null,null,sue.apps.i18n("savepdf_"+_arrayText[i]));
			var _text=sue.apps.domCreate("input",{setName:["className","id","type","placeholder","value"],setValue:["pdfele su_savepdf_text","savepdf_"+_arrayText[i],"text",sue.apps.i18n("place_string"),pdfConf[_arrayText[i]]]},null,null,{setName:["type"],setValue:["string"]});
			theAppBox.appendChild(_spanText);
			theAppBox.appendChild(_text);
			theAppBox.appendChild(sue.apps.domCreate("br"));
		}

		let _arrayText_Num=["marginBottom","marginLeft","marginRight","marginTop","paperHeight","paperWidth","scaling"];
		for(var i=0;i<_arrayText_Num.length;i++){
			var _spanText=sue.apps.domCreate("span",{setName:["className"],setValue:["su_savepdf_span"]},null,null,null,sue.apps.i18n("savepdf_"+_arrayText_Num[i]));
			var _text=sue.apps.domCreate("input",{setName:["className","id","type","placeholder","value"],setValue:["pdfele su_savepdf_text","savepdf_"+_arrayText_Num[i],"text",sue.apps.i18n("place_number"),pdfConf[_arrayText_Num[i]]/**/]},null,null,{setName:["type"],setValue:["number"]});
			theAppBox.appendChild(_spanText);
			theAppBox.appendChild(_text);
			theAppBox.appendChild(sue.apps.domCreate("br"));
		}
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_savepdf_btn")){
					sue.apps.savepdf.pdf(e);
				}else if(e.target.classList.contains("menu_item_help")){
					sue.apps.savepdf.showHelp(e);
				}else if(e.target.classList.contains("options_btn_reset")){
					sue.apps.savepdf.reset(e);
				}
				break;
		}
	},
	showHelp:function(e){
		var domopt=sue.apps.getAPPboxEle(e).querySelector(".su_options_help");
		var _opt=window.getComputedStyle(domopt).opacity==0?true:false;
		if(_opt){
			domopt.style.cssText+="opacity:.9;z-index:10;";
		}else{
			domopt.style.cssText+="opacity:0;z-index:-1;";
		}
	},
	reset:function(e){
		sue.apps.savepdf.initOptions(sue.apps.savepdf.defaultConf);
		sue.apps.showOpt(e)
	},
	pdf:function(e){
		let pdfData={},pdfDom=sue.apps.getAPPboxEle(e),i=0;
		let	pdfDoms=pdfDom.querySelectorAll(".pdfele");
		for(i=0;i<pdfDoms.length;i++){
			if(pdfDoms[i].tagName.toLowerCase()=="select"){
				pdfData[pdfDoms[i].name.substr(8)]=pdfDoms[i].selectedIndex//Number(pdfDoms[i].value);
			}else if(pdfDoms[i].tagName.toLowerCase()=="input"&&pdfDoms[i].type=="checkbox"){
				pdfData[pdfDoms[i].id.substr(8)]=pdfDoms[i].checked;
			}else if(pdfDoms[i].tagName.toLowerCase()=="input"&&pdfDoms[i].type=="text"){
				if(pdfDoms[i].dataset.type=="number"){
					pdfData[pdfDoms[i].id.substr(8)]=Number(pdfDoms[i].value);
				}else{
					pdfData[pdfDoms[i].id.substr(8)]=pdfDoms[i].value;
				}
			}
		}
		chrome.storage.local.get(function(items){
			items.localConfig.apps.savepdf={};
			items.localConfig.apps.savepdf=pdfData;
			chrome.storage.local.set(items);
		})
		sue.apps.boxClose(e);
		chrome.runtime.sendMessage({type:"appsAction",app:"savepdf",action:"savePDF",value:pdfData});
	},
	randnum:function(e){
		var domsavepdf=sue.apps.getAPPboxEle(e);
		var printBox=domsavepdf.querySelector("#su_savepdf_print");
		var randLength=parseInt(domsavepdf.querySelector("#num").value),
			min=parseInt(domsavepdf.querySelector("#min").value),
			max=parseInt(domsavepdf.querySelector("#max").value),
			norepeat=domsavepdf.querySelector("#su_savepdf_norepeat").checked;
			add=domsavepdf.querySelector("#su_savepdf_add").checked;
		var nums=[],strs="",flag=false,strlen=0;
		printBox.value="loading...";
		if(isNaN(min)||isNaN(max)||isNaN(randLength)){
			printBox.value="Error";
			return;
		}
		if(max<min){
			_max=max;_min=min;
			max=Math.max(_min,_max);
			min=Math.min(_min,_max);			
		}
		if((max-min+1)<randLength){
			norepeat=false;
		}
		for(var i=0;i<randLength;i++){
			var num=parseInt(Math.savepdf()*(max-min+1)+min-(min<0?1:0));
			for(var ii=0;norepeat&&ii<nums.length;ii++){
				if(num==nums[ii]){
					flag=true;
					return arguments.callee(e)
					break;
				}
			}
			nums.push(num);
		}
		for(var i=0;add&&i<nums.length;i++){
			var thestr=nums[i].toString();
			strlen=(thestr.length>strlen)?thestr.length:strlen;
		}
		for(var i=0;i<nums.length;i++){
			var thestr=nums[i].toString();
			var addlen=strlen-thestr.length;
			for(var ii=0;add&&ii<addlen;ii++){
				thestr="0"+thestr;
			}
			strs=strs+" "+thestr;
		}
		printBox.value=strs;

		chrome.storage.local.get(function(items){
			items.localConfig.apps.savepdf={
				min:min,
				max:max,
				num:randLength,
				norepeat:norepeat,
				add:add
			}
			chrome.storage.local.set(items);
		})
	}
}
sue.apps.savepdf.initUI();
