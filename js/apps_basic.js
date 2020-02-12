console.log("apps_basic")
//check browser
var browserType;
if(navigator.userAgent.toLowerCase().indexOf("firefox")!=-1){
	browserType="fx";
}else if(navigator.userAgent.toLowerCase().indexOf("edge")!=-1){
	browserType="msg";
}else{
	browserType="cr";
}
if(browserType!="cr"){
	chrome=browser;
}
sue.apps={
	enable:true,
	cons:{
		boxmove:{},
	},
	init:function(){
		window.addEventListener("click",this.handleEvent,false);
		window.addEventListener("mousedown",this.handleEvent,false);
		window.addEventListener("mouseup",this.handleEvent,false);
		window.addEventListener("mousemove",this.handleEvent,false);
		window.addEventListener("change",this.handleEvent,false);
	},
	initBox:function(boxInfo){
		//{headTitle:"title",headCloseBtn:true,menu:[{src:"/image/options.png",title:"app_tip_opt"}],options:[{type:"select",label:"label",name:"name",value:["value1","value2"]},{type:"checkbox",label:"label",name:"name",checked:true}]}
		let domBox,domHead,domMain,domMenu,domOptions;
		domBox=sue.apps.domCreate("smartup",{setName:["className"],setValue:["su_apps"]},null,"z-index:"+(parseInt((new Date().getTime())/1000)),{setName:["appname"],setValue:[boxInfo.appName]});
		//head
		domHead=sue.apps.domCreate("div",{setName:["className"],setValue:["su_head"]});
		if(boxInfo.headTitle){
			let _domHeadTtitle=sue.apps.domCreate("span",{setName:["className"],setValue:["su_title"]},null,null,null,sue.apps.i18n(boxInfo.headTitle));
			domHead.appendChild(_domHeadTtitle);
		}
		if(boxInfo.headCloseBtn){
			let _domHeadCloseBtn=sue.apps.domCreate("div",{setName:["className"],setValue:["su_btn_close"]},null,null,null,"x");
			domHead.appendChild(_domHeadCloseBtn);
		}
		domBox.appendChild(domHead);
		//main
		domMain=sue.apps.domCreate("div",{setName:["className"],setValue:["su_main"]});
		domBox.appendChild(domMain);
		//menu
		if(boxInfo.menu){
			domMenu=sue.apps.domCreate("div",{setName:["className"],setValue:["su_menu"]});
			for(var i=0;i<boxInfo.menu.length;i++){
				var _domMenuImg=sue.apps.domCreate("img",{setName:["className"],setValue:[boxInfo.menu[i].className]});
					_domMenuImg.src=chrome.runtime.getURL(boxInfo.menu[i].src);
					_domMenuImg.title=sue.apps.i18n(boxInfo.menu[i].title);
				var _domBr=sue.apps.domCreate("br");
				domMenu.appendChild(_domMenuImg);
				domMenu.appendChild(_domBr);
			}
			domBox.appendChild(domMenu);
		}
		//options
		if(boxInfo.options){
			domOptions=sue.apps.domCreate("div",{setName:["className"],setValue:["su_options"]});
			for(var i=0;i<boxInfo.options.length;i++){
				if(boxInfo.options[i].type=="select"){
					var _label=sue.apps.domCreate("label",{setName:["className"],setValue:["options_labelname"]},null,null,null,sue.apps.i18n(boxInfo.options[i].name));
					var _domSelect=sue.apps.domCreate("select");
						_domSelect.name=boxInfo.options[i].name;
					for(var ii=0;ii<boxInfo.options[i].value.length;ii++){
						var _domOption=sue.apps.domCreate("option",null,null,null,null,sue.apps.i18n(boxInfo.options[i].value[ii]));
						_domOption.value=boxInfo.options[i].value[ii];
						_domSelect.appendChild(_domOption);
					}
					domOptions.appendChild(_label);
					domOptions.appendChild(_domSelect);
					domOptions.appendChild(sue.apps.domCreate("br"));
				}
				if(boxInfo.options[i].type=="checkbox"){
					var _time=parseInt((new Date().getTime())/1000);
					var _check=sue.apps.domCreate("input");
						_check.id=boxInfo.options[i].name+"_"+_time;
						_check.type="checkbox";
						_check.name=boxInfo.options[i].name;
					var _label=sue.apps.domCreate("label",{setName:["className"],setValue:["options_labeldes"]},null,null,null,sue.apps.i18n(boxInfo.options[i].name));
						_label.htmlFor=boxInfo.options[i].name+"_"+_time;
					domOptions.appendChild(_check);
					domOptions.appendChild(_label);
					domOptions.appendChild(sue.apps.domCreate("br"));
				}
				if(boxInfo.options[i].type=="range"){
					var _label=sue.apps.domCreate("label",{setName:["className"],setValue:["options_labelname"]},null,null,null,sue.apps.i18n(boxInfo.options[i].label));
					var _domRange=sue.apps.domCreate("input");
						_domRange.name=boxInfo.options[i].name;
						_domRange.type="range";
						_domRange.min=boxInfo.options[i].min;
						_domRange.max=boxInfo.options[i].max;
						_domRange.step=boxInfo.options[i].step||1;
					var _domSpan=sue.apps.domCreate("span",{setName:["className"],setValue:["options_rangebox"]});

					domOptions.appendChild(_label);
					domOptions.appendChild(_domRange);
					domOptions.appendChild(_domSpan);
					domOptions.appendChild(sue.apps.domCreate("br"));
				}
				if(boxInfo.options[i].type=="radio"){
					var _time=parseInt((new Date().getTime())/1000);
					var _domRadio=sue.apps.domCreate("input");
						_domRadio.name=boxInfo.options[i].name;
						_domRadio.type="radio";
						_domRadio.id=boxInfo.options[i].name+"_"+_time;
					var _label=sue.apps.domCreate("label",{setName:["className"],setValue:["options_labelname"]},null,null,null,sue.apps.i18n(boxInfo.options[i].name));
					domOptions.appendChild(_domRadio);
					domOptions.appendChild(_label);
					domOptions.appendChild(sue.apps.domCreate("br"));
				}
			}
			domBox.appendChild(domOptions);
			//button box
			let _btnBox=sue.apps.domCreate("div",{setName:["className"],setValue:["options_btnbox"]});
			let _btnCancel=sue.apps.domCreate("input",{setName:["className"],setValue:["options_btn_cancel"]});
				_btnCancel.type="button";
				_btnCancel.value=sue.apps.i18n("btn_cancel");
			let _btnSave=sue.apps.domCreate("input",{setName:["className"],setValue:["options_btn_save"]});
				_btnSave.type="button";
				_btnSave.value=sue.apps.i18n("btn_save");
			_btnBox.appendChild(_btnCancel);
			_btnBox.appendChild(_btnSave);
			domOptions.appendChild(_btnBox);
		}
		return domBox;
		//sue.apps.initPos(domBox);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_btn_close")){
					sue.apps.boxClose(e);
				}
				if(e.target.classList.contains("menu_item_opt")||e.target.classList.contains("options_btn_cancel")){
					sue.apps.initOpt(e);
					sue.apps.showOpt(e);
				}
				if(e.target.classList.contains("options_btn_save")){
					sue.apps.saveConf(e);
				}
				break;
			case"mousedown":
				if(e.button==0&&(e.target.classList.contains("su_head")||e.target.classList.contains("su_title"))){
					var boxposX=e.target.classList.contains("su_head")?e.target.parentNode.offsetLeft:e.target.parentNode.parentNode.offsetLeft,
						boxposY=e.target.classList.contains("su_head")?e.target.parentNode.offsetTop:e.target.parentNode.parentNode.offsetTop;
					sue.apps.cons.boxmove.enable=true;
					sue.apps.cons.boxmove.posX=e.clientX-boxposX;
					sue.apps.cons.boxmove.posY=e.clientY-boxposY;
				}
				break;
			case"mouseup":
				sue.apps.cons.boxmove.enable=false;
				break;
			case"mousemove":
				if(sue.apps.cons.boxmove.enable&&(e.target.classList.contains("su_head")||e.target.classList.contains("su_title"))){
					//console.log("move")
					sue.apps.boxMove(e);
				}
				break;
			case"change":
				//if(e.target.classList.contains("su_options_range")){
				if(e.target.type&&e.target.type.toLowerCase()=="range"){
					e.target.nextSibling.innerText=e.target.value;
				}
				break;
		}
	},
	initOpt:function(e){
		var dom=sue.apps.getAPPboxEle(e);
		var _appname=dom.dataset.appname;
		var _config=sue.apps[_appname].config;
		console.log(_config)

		var selects=dom.querySelectorAll(".su_options select");
		for(var i=0;i<selects.length;i++){
			selects[i].value=_config[selects[i].name];
		}
		var optchks=dom.querySelectorAll(".su_options input[type=checkbox]");
		for(var i=0;i<optchks.length;i++){
			optchks[i].checked=_config[optchks[i].name];
		}
		var texts=dom.querySelectorAll(".su_options input[type=text]");
		for(var i=0;i<texts.length;i++){
			texts[i].value=_config[texts[i].name];
		}
		var ranges=dom.querySelectorAll(".su_options input[type=range]");
		for(var i=0;i<ranges.length;i++){
			ranges[i].value=_config[ranges[i].name];
			ranges[i].nextSibling.innerText=_config[ranges[i].name];
		}
	},
	saveConf:function(e){
		var _appname=sue.apps.getAPPboxEle(e).dataset.appname;
		//var _config=window["SU_apps_"+_appname].cons.config;
		var _config=sue.apps[_appname].config;
		var dom=sue.apps.getAPPboxEle(e);
		var selects=dom.querySelectorAll(".su_options select");
		for(var i=0;i<selects.length;i++){
			_config[selects[i].name]=selects[i].value;
		}
		var optchks=dom.querySelectorAll(".su_options input[type=checkbox]");
		for(var i=0;i<optchks.length;i++){
			_config[optchks[i].name]=optchks[i].checked;
		}
		var texts=dom.querySelectorAll(".su_options input[type=text]");
		for(var i=0;i<texts.length;i++){
			_config[texts[i].name]=texts[i].value;
		}
		var ranges=dom.querySelectorAll(".su_options input[type=range]");
		for(var i=0;i<ranges.length;i++){
			_config[ranges[i].name]=Number(ranges[i].value);
		}
		chrome.runtime.sendMessage({type:"apps_saveconf",apptype:_appname,config:_config},function(response){})
		sue.apps.showOpt(e);
	},
	getAPPboxEle:function(e){
		var ele=e.target||e;
		var getele=function(ele){
			if(ele.tagName&&ele.tagName.toLowerCase()=="smartup"&&ele.classList.contains("su_apps")){
				return ele;
			}else{
				return getele(ele.parentNode);
			}
		}
		return getele(ele);
	},
	domCreate:function(edom,eele,einner,ecss,edata,etxt){
		var dom=document.createElement(edom);
		if(eele){
			for (var i = 0;i<eele.setName.length; i++) {
				if(eele.setName[i]=="for"){
				//if(["for","checked"].contains(eele.setName[i])){
					dom.setAttribute(eele.setName[i],eele.setValue[i]);
				}else if(eele.setName[i]=="checked"){
					eele.setValue[i]?dom.setAttribute(eele.setName[i],"checked"):null;
				}else{
					dom[eele.setName[i]]=eele.setValue[i];
				}
			}
		}
		if(einner){}
		if(ecss){
			dom.style.cssText+=ecss;
		}
		if(edata){
			for (var i = 0;i<edata.setName.length; i++) {
				dom.dataset[edata.setName[i]]=edata.setValue[i];
			}
		}
		if(etxt){
			dom.innerText=etxt;
		}
		return dom;
	},
	boxMove:function(e){
		var ele=e.target||e;
		var OBJ=sue.apps.getAPPboxEle(e);
		var mytime=new Date();
			mytime=mytime.getTime();
		if(!OBJ){return false;}
		OBJ.querySelector(".su_head").style.cssText+="cursor:move;";
		OBJ.style.cssText+="transition:none;"+
			"left:"+(e.clientX-sue.apps.cons.boxmove.posX)+"px;"+
			"top:"+(e.clientY-sue.apps.cons.boxmove.posY)+"px;"+
			"z-index:"+parseInt((mytime)/1000);
	},
	boxClose:function(e){
		var ele=sue.apps.getAPPboxEle(e);
			ele.style.cssText+="transition:all .4s ease-in-out;opacity:0;top:0;"//+window.innerHeight+"px;"//left:"+/*window.innerWidth+*/"0px;";
		window.setTimeout(function(){
			ele.remove();
		},500)	
	},
	i18n:function(str){
		if(browserType=="msg"){return chrome.i18n.getMessage(str);}
		var i18n;
		//lang change
		if(config.general.settings.lang=="lang_auto"){
			str="tl_"+str;
		}else{
			str=str;
		}

		i18n=chrome.i18n.getMessage(str);
		if(!i18n&&str.indexOf("tl_")==0){
			i18n=chrome.i18n.getMessage(str.substr(3));
		}

		var trans=i18n?i18n:str;
		if(str.indexOf("tl_des_")==0||str.indexOf("des_")==0){
			trans="* "+trans;
		}
		return trans
	},
	showOpt:function(e){
		console.log("showOpt")
		var domopt=sue.apps.getAPPboxEle(e).querySelector(".su_options");
		var _opt=window.getComputedStyle(domopt).opacity==0?true:false;
		if(_opt){
			domopt.style.cssText+="display:block;";
			window.setTimeout(function(){domopt.style.cssText+="opacity:1;z-index:10;";},10)
		}else{
			domopt.style.cssText+="opacity:0;z-index:-1;";
			window.setTimeout(function(){domopt.style.cssText+="display:none;";},200)
		}
	},
	initPos:function(dom){
		let _fn=function(){
			dom.querySelector(".su_main").style.cssText+="max-height:"+(window.innerHeight-100)+"px;";
			document.body.appendChild(dom);
			var _appname=dom.dataset.appname;
			// var _height=window.getComputedStyle(dom).height,
			// 	_width=window.getComputedStyle(dom).width;
			var _height=dom.getBoundingClientRect().height;
				_width=dom.getBoundingClientRect().width;
			// _height=parseInt(_height.substr(0,_height.length-2));
			// _width=parseInt(_width.substr(0,_width.length-2));
			dom.style.cssText+="left:"+(window.innerWidth-_width)/2+"px;";
			dom.style.cssText+="opacity:.98;top:"+(window.innerHeight-_height)/2+"px;";
			window.setTimeout(function(){
				//dom.style.cssText+="opacity:.98;top:"+(window.innerHeight-_height)/2+"px;";
			},100)			
		}
		window.setTimeout(function(){
			_fn();
			//dom.style.cssText+="opacity:.98;top:"+(window.innerHeight-_height)/2+"px;";
		},100)	
	},
	fixURL:function(url){
		var arrayPre=["http://","https://","ftp://","chrome://","chrome-extension://","view-source:chrome-extension://","moz-extension://","about://","about:","file:///"];
		var _flag=false;
		for(var i=0;i<arrayPre.length;i++){
			if(url.indexOf(arrayPre[i])==0){
				_flag=true;
				break;
			}
		}
		url=_flag?url:("http://"+url);
		return url;
	}
}