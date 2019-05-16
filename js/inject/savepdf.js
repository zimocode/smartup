console.log("savepdf")
sue.apps.savepdf={
	cons:{
		boxmove:{}
	},
	initUI:function(){
		let appInfo={
			appName:"savepdf",
			headTitle:"savepdf",
			headCloseBtn:true,
			menu:[
				{src:"/image/options.png",title:"app_tip_opt",className:"menu_item menu_item_opt"},
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
		theAppBox.appendChild(_spanOri);
		theAppBox.appendChild(_selectOri);
		theAppBox.appendChild(sue.apps.domCreate("br"));

		let _spanPap=sue.apps.domCreate("span",{setName:["className"],setValue:["su_savepdf_span"]},null,null,null,sue.apps.i18n("savepdf_"+"paperSizeUnit")),
			_selectPap=sue.apps.domCreate("select",{setName:["className","name"],setValue:["pdfele","savepdf_orientation"]});
		let _optionPap_0=sue.apps.domCreate("option",{setName:["value"],setValue:["0"]},null,null,null,sue.apps.i18n("savepdf_"+"inches")),
			_optionPap_1=sue.apps.domCreate("option",{setName:["value"],setValue:["1"]},null,null,null,sue.apps.i18n("savepdf_"+"millimeters"))
		_selectPap.appendChild(_optionPap_0);
		_selectPap.appendChild(_optionPap_1);
		theAppBox.appendChild(_spanPap);
		theAppBox.appendChild(_selectPap);
		theAppBox.appendChild(sue.apps.domCreate("br"));

		let _arrayCheck=["showBackgroundColors","showBackgroundImages","shrinkToFit"];
		for(var i=0;i<_arrayCheck.length;i++){
			var _check=sue.apps.domCreate("input",{setName:["className","id","type","checked"],setValue:["pdfele su_savepdf_text","savepdf_"+_arrayCheck[i],"checkbox","true"]});
			var	_label=sue.apps.domCreate("label",{setName:["className","for"],setValue:["su_savepdf_label","savepdf_"+_arrayCheck[i]]},null,null,null,sue.apps.i18n("savepdf_"+_arrayCheck[i]));

			console.log("s")
			theAppBox.appendChild(_check);
			theAppBox.appendChild(_label);
			theAppBox.appendChild(sue.apps.domCreate("br"));
		}

			// _textEle=["showBackgroundColors","showBackgroundImages","shrinkToFit"];
			// for(i=0;i<_textEle.length;i++){
			// 	console.log(pdfData[_textEle[i]])
			// 	_text+='</br><input id="savepdf_'+_textEle[i]+'" class="pdfele su_savepdf_text" type="checkbox"'+(pdfData[_textEle[i]]?" checked":"")+'>'+'<label for="savepdf_'+_textEle[i]+'" class="su_savepdf_label">'+sue.apps.i18n("savepdf_"+_textEle[i])+'</label>'
			// }

			// _text+="</br>";

			// _textEle=["footerCenter","footerLeft","footerRight","headerCenter","headerLeft","headerRight"];
			// for(i=0;i<_textEle.length;i++){
			// 	_text+='<span class="su_savepdf_span">'+sue.apps.i18n("savepdf_"+_textEle[i])+'</span>'+'<input id="savepdf_'+_textEle[i]+'" class="pdfele su_savepdf_text" type="text" placeholder="'+sue.apps.i18n("place_string")+'" value="'+pdfData[_textEle[i]]+'" data-type="string">'
			// }

			// _textEle=["marginBottom","marginLeft","marginRight","marginTop","paperHeight","paperWidth","scaling"];
			// for(i=0;i<_textEle.length;i++){
			// 	_text+='<span class="su_savepdf_span">'+sue.apps.i18n("savepdf_"+_textEle[i])+'</span>'+'<input id="savepdf_'+_textEle[i]+'" class="pdfele su_savepdf_text" type="text" placeholder="'+sue.apps.i18n("place_number")+'" value="'+pdfData[_textEle[i]]+'" data-type="number">'
			// }

			// dom.querySelector(".su_main .savepdfbox").innerHTML=_text;
			// let domSelects=dom.querySelectorAll("select");
			// for(i=0;i<domSelects.length;i++){
			// 	domSelects[i].selectedIndex=pdfData[domSelects[i].name.substr(8)];
			// }


		return;
		sue.apps.init();
		var _appname="savepdf";
		var dom=sue.apps.domCreate("smartup",{setName:["className","id"],setValue:["su_apps","su_apps_"+_appname]},null,"z-index:"+parseInt((new Date().getTime())/1000),{setName:["appname"],setValue:[_appname]});
		dom.innerHTML=
			'<div class="su_head" style="">'
				+'<span class="su_title">'+sue.apps.i18n("savepdf")+'</span>'
				+'<div class="su_btn_close">x</div>'
			+'</div>'
			+'<div class="su_main">'
				+'<div class="savepdfbox"></div>'
			+'</div>'
			+'<div class="su_menu">'
				+'<img class="menu_item menu_item_opt" src="'+chrome.runtime.getURL("/image/options.png")+'" /><br />'
				+'<img class="menu_item menu_item_help" src="'+chrome.runtime.getURL("/image/info.svg")+'" /><br />'
			+'</div>'
			+'<div class="su_options">'
				+'<div>'+'There are many options, if the PDF does not generate, you may try to reset all the options by click the button below.'+'</div>'
				+'<div class="options_btnbox">'
					+'<input class="options_btn_reset" type="button" value="'+sue.apps.i18n("btn_reset")+'">'
				+'</div>'
			+'</div>'
			+'<div class="su_options_help">'
				+'<div>'+sue.apps.i18n("savepdf_info")+'</div>'
			+'</div>';
		sue.apps.savepdf.defaultConf={
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
		}
		sue.apps.savepdf.initValue=function(pdfData){
			dom.querySelector(".su_main .savepdfbox").innerHTML="";
			let _text="",i=0,_textEle=[];
			_text+='<div class="btnbox"><button class="su_savepdf_btn">Generate PDF</button></div>'
			_text+='<span class="su_savepdf_span">'+sue.apps.i18n("savepdf_"+"orientation")+'</span>'+'<select class="pdfele" name="savepdf_'+'orientation'+'"><option value="0">'+sue.apps.i18n("savepdf_"+"portrait")+'</option><option value="1">'+sue.apps.i18n("savepdf_"+"landscape")+'</option></select>'+'</br><span class="su_savepdf_span">'+sue.apps.i18n("savepdf_"+"paperSizeUnit")+'</span>'+'<select class="pdfele" name="savepdf_'+'paperSizeUnit'+'"><option value="0">'+sue.apps.i18n("savepdf_"+"inches")+'</option><option value="1">'+sue.apps.i18n("savepdf_"+"millimeters")+'</option></select>';

			_textEle=["showBackgroundColors","showBackgroundImages","shrinkToFit"];
			for(i=0;i<_textEle.length;i++){
				console.log(pdfData[_textEle[i]])
				_text+='</br><input id="savepdf_'+_textEle[i]+'" class="pdfele su_savepdf_text" type="checkbox"'+(pdfData[_textEle[i]]?" checked":"")+'>'+'<label for="savepdf_'+_textEle[i]+'" class="su_savepdf_label">'+sue.apps.i18n("savepdf_"+_textEle[i])+'</label>'
			}

			_text+="</br>";

			_textEle=["footerCenter","footerLeft","footerRight","headerCenter","headerLeft","headerRight"];
			for(i=0;i<_textEle.length;i++){
				_text+='<span class="su_savepdf_span">'+sue.apps.i18n("savepdf_"+_textEle[i])+'</span>'+'<input id="savepdf_'+_textEle[i]+'" class="pdfele su_savepdf_text" type="text" placeholder="'+sue.apps.i18n("place_string")+'" value="'+pdfData[_textEle[i]]+'" data-type="string">'
			}

			_textEle=["marginBottom","marginLeft","marginRight","marginTop","paperHeight","paperWidth","scaling"];
			for(i=0;i<_textEle.length;i++){
				_text+='<span class="su_savepdf_span">'+sue.apps.i18n("savepdf_"+_textEle[i])+'</span>'+'<input id="savepdf_'+_textEle[i]+'" class="pdfele su_savepdf_text" type="text" placeholder="'+sue.apps.i18n("place_number")+'" value="'+pdfData[_textEle[i]]+'" data-type="number">'
			}

			dom.querySelector(".su_main .savepdfbox").innerHTML=_text;
			let domSelects=dom.querySelectorAll("select");
			for(i=0;i<domSelects.length;i++){
				domSelects[i].selectedIndex=pdfData[domSelects[i].name.substr(8)];
			}
		}
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
			sue.apps.savepdf.initValue(data);
			dom.addEventListener("click",sue.apps.savepdf.handleEvent,false);
			sue.apps.initPos(dom);
		})
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
		sue.apps.savepdf.initValue(sue.apps.savepdf.defaultConf);
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
		console.log(pdfData);
		chrome.storage.local.get(function(items){
			items.localConfig.apps.savepdf={};
			items.localConfig.apps.savepdf=pdfData;
			chrome.storage.local.set(items);
		})
		sue.apps.boxClose(e);
		chrome.runtime.sendMessage({type:"apps_action",apptype:"savepdf",value:pdfData},function(response){
		})
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
