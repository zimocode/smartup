Array.prototype.contains=function (ele) {
    for (var i=0;i<this.length;i++){
        if (this[i]==ele){
            return true;
        }
	}
	return false;
}
Array.prototype.containsAll=function(ele){
	var arraylen=ele.length;
	if(this.length<arraylen){return false;}
	for(var i=0;i<arraylen;i++){
		if(!this.contains(ele[i])){
			return false;
			break;
		}else{
			if(i==arraylen-1){
				return true;
			}
		}
	}
}


var devMode=true;
var	config,
	defaultConf,
	_SYNC,
	browserType,
	timerSaveConf;
let localConfig;

//check browser
if(navigator.userAgent.toLowerCase().indexOf("firefox")!=-1){
	browserType="fx";
}else if(navigator.userAgent.toLowerCase().indexOf("edge")!=-1){
	browserType="msg";
}else{
	browserType="cr";
}
if(browserType!="cr"){
	chrome=browser;
	chrome.storage.sync=chrome.storage.local;
}


var getDefault={
	i18n:function(str){
		var _i18n=chrome.i18n.getMessage(str);
		return _i18n?_i18n:str;
		//msg cant return chrome.i18n.getMessage("");
	},
	value:function(){
		var	config={
				version:46,
				plus:{},
				apps:{
					appslist:{
						n_closebox:true
					}
				},
				general:{
					settings:{
						timeout:true,
						timeoutvalue:2000,
						timeout_nomenu:true,
						minlength:10,
						autosave:true,
						icon:true,
						theme:"colorful",
						notif:false,
						appnotif:true,
						esc:true
					},
					fnswitch:{
						fnmges:true,
						fnsdrg:true,
						fndrg:false,
						fnrges:false,
						fnwges:false,
						fnpop:false,
						fnicon:false,
						fnctm:false
					},
					engine:{
						txtengine:[
							{name:"Google",content:"https://www.google.com/search?q=%s"},
							{name:"Bing",content:"http://www.bing.com/search?q=%s"}
						],
						imgengine:[
							{name:"Google Images",content:"https://www.google.com/searchbyimage?image_url=%s"},
							{name:"Bing Images",content:"http://www.bing.com/images/searchbyimage?&imgurl=%s"}
						]
					},
					script:{
						script:[
							{name:"Test Script",content:"alert('test script 1.')"},
							{name:"Test Script2",content:"alert('test script 2.')"}
						]
					},
					linux:{
						cancelmenu:true
					},
					sync:{
						autosync:true
					}
				},
				mges:{
					settings:{
						model:2,
						holdkey:"none",
						txttourl:true,
						lnktoimg:false
					},
					ui:{
						line:{
							enable:true,
							color:"#3369E8",
							width:3,
							opacity:90
						},
						direct:{
							enable:false,
							color:"#8e9bd5",
							width:32,
							opacity:80,
							style:"center"
						},
						tip:{
							enable:true,
							color:"#ffffff",
							bgcolor:"#5677fc",
							width:18,
							opacity:80,
							style:"follow",//center hover
							withdir:false
						},
						note:{
							enable:true,
							color:"#f75620",
							opacity:90,
							width:12,
							style:"hover"
						},
						allaction:{
							enable:false,
							color:"#ffffff",
							bgcolor:"#576f71",
							width:24,
							opacity:70,
							style:"ui_bottom"
						}
					},
					actions:[
						{
							direct:"L",
							name:"back"
						},
						{
							direct:"R",
							name:"forward"
						},
						{
							direct:"U",
							name:"scroll",
							mydes:{type:true,value:getDefault.i18n("init_scroll_up")},
							selects:[{type:"n_scroll",value:"s_up"}],
							checks:[{type:"n_effect",value:true}]
						},
						{
							direct:"D",
							name:"scroll",
							mydes:{type:true,value:getDefault.i18n("init_scroll_down")},
							selects:[{type:"n_scroll",value:"s_down"}],
							checks:[{type:"n_effect",value:true}]
						},
						{
							direct:"RU",
							name:"scroll",
							mydes:{type:true,value:getDefault.i18n("init_scroll_top")},
							selects:[{type:"n_scroll",value:"s_top"}],
							checks:[{type:"n_effect",value:true}]
						},
						{
							direct:"RD",
							name:"scroll",
							mydes:{type:true,value:getDefault.i18n("init_scroll_bottom")},
							selects:[{type:"n_scroll",value:"s_bottom"}],
							checks:[{type:"n_effect",value:true}]
						},
						{
							direct:"DL",
							name:"newtab",
							selects:[
								{type:"n_optype",value:"n_new"},
								{type:"n_position",value:"s_default"}
							],
							checks:[{type:"n_pin",value:false}]
						},
						{
							direct:"DR",
							name:"close",
							mydes:{type:true,value:getDefault.i18n("init_close_current")},
							selects:[
								{type:"n_tab",value:"s_current"},
								{type:"n_close_sel",value:"s_default"}
							],
							checks:[
								{type:"n_close_keep",value:false}
							]
						},
						{
							direct:"UL",
							name:"switchtab",
							mydes:{type:true,value:getDefault.i18n("init_switch_left")},
							selects:[
								{type:"n_tab_lrhl",value:"s_left"}
							]
						},
						{
							direct:"UR",
							name:"switchtab",
							mydes:{type:true,value:getDefault.i18n("init_switch_right")},
							selects:[
								{type:"n_tab_lrhl",value:"s_right"}
							]
						},
						{
							direct:"DRL",
							name:"reopen"
						},
						{
							direct:"LU",
							name:"txtsearch",
							selects:[
								{type:"n_txtengine",value:"0"},
								{type:"n_encoding",value:"s_uri"},
								{type:"n_optype",value:"s_new"},
								{type:"n_position",value:"s_default"}
							],
							checks:[{type:"n_pin",value:false}]
						},
						{
							direct:"LD",
							name:"txtsearch",
							mydes:{type:true,value:getDefault.i18n("init_searchtxt_bg")},
							selects:[
								{type:"n_txtengine",value:"0"},
								{type:"n_encoding",value:"s_uri"},
								{type:"n_optype",value:"s_back"},
								{type:"n_position",value:"s_default"}
							],
							checks:[{type:"n_pin",value:false}]
						},
						{
							direct:"UD",
							name:"reload",
							mydes:{type:true,value:getDefault.i18n("init_reload_current")},
							selects:[{type:"n_tab",value:"s_current"}],
							checks:[{type:"n_reload_clear",value:false}]
						},
						{
							direct:"UDU",
							name:"reload",
							mydes:{type:true,value:getDefault.i18n("init_reload_clear")},
							selects:[{type:"n_tab",value:"s_current"}],
							checks:[{type:"n_reload_clear",value:true}]
						},
						{
							direct:"DRU",
							name:"appslist"
						},
						{
							direct:"RDLU",
							name:"optionspage"
						}
					]
				},
				sdrg:{
					settings:{
						holdkey:"ctrl",
						holdimgkey:"alt",
						drgbox:false,
						drgtobox:true,
						drgurl:true,
						drgimg:true,
						txt:true,
						lnk:true,
						img:true,
						draggable:true
					},
					tsdrg:[
						{
							direct:"L",
							name:"txtsearch",
							mydes:{type:true,value:getDefault.i18n("init_searchtxt_bg")},
							selects:[
								{type:"n_txtengine",value:"0"},
								{type:"n_encoding",value:"s_uri"},
								{type:"n_optype",value:"s_back"},
								{type:"n_position",value:"s_default"}
							],
							checks:[{type:"n_pin",value:false}]
						},
						{
							direct:"U",
							name:"none"
							
						},
						{
							direct:"R",
							name:"txtsearch",
							selects:[
								{type:"n_txtengine",value:"0"},
								{type:"n_encoding",value:"s_uri"},
								{type:"n_optype",value:"s_new"},
								{type:"n_position",value:"s_default"}
							],
							checks:[{type:"n_pin",value:false}]
						},
						{
							direct:"D",
							name:"copytxt"
						},
						{
							direct:"l",
							name:"none"
						},
						{
							direct:"u",
							name:"none"
						},
						{
							direct:"r",
							name:"none"
						},
						{
							direct:"d",
							name:"none"
						}
					],
					lsdrg:[
						{
							direct:"L",
							name:"openlnk",
							mydes:{type:true,value:getDefault.i18n("init_openlnk_bg")},
							selects:[
								{type:"n_optype",value:"s_back"},
								{type:"n_position",value:"s_default"}
							],
							checks:[{type:"n_pin",value:false}]
						},
						{
							direct:"U",
							name:"none"
							
						},
						{
							direct:"R",
							name:"openlnk",
							selects:[
								{type:"n_optype",value:"s_new"},
								{type:"n_position",value:"s_default"}
							],
							checks:[{type:"n_pin",value:false}]
						},
						{
							direct:"D",
							name:"none"
						},
						{
							direct:"l",
							name:"none"
						},
						{
							direct:"u",
							name:"none"
						},
						{
							direct:"r",
							name:"none"
						},
						{
							direct:"d",
							name:"none"
						}
					],
					isdrg:[
						{
							direct:"L",
							name:"openimg",
							mydes:{type:true,value:getDefault.i18n("init_openimg_bg")},
							selects:[
								{type:"n_optype",value:"s_back"},
								{type:"n_position",value:"s_default"}
							],
							checks:[{type:"n_pin",value:false}]
						},
						{
							direct:"U",
							name:"none"
							
						},
						{
							direct:"R",
							name:"openimg",
							selects:[
								{type:"n_optype",value:"s_new"},
								{type:"n_position",value:"s_default"}
							],
							checks:[{type:"n_pin",value:false}]
						},
						{
							direct:"D",
							name:"none"
						},
						{
							direct:"l",
							name:"none"
						},
						{
							direct:"u",
							name:"none"
						},
						{
							direct:"r",
							name:"none"
						},
						{
							direct:"d",
							name:"none"
						}
					],
				},	
				drg:{
					settings:{
						holdkey:"ctrl",
						holdimgkey:"alt",
						drgbox:false,
						drgtobox:true,
						drgurl:true,
						drgimg:true,
						txt:true,
						lnk:true,
						img:true,
						draggable:true
					},
					ui:{
						line:{
							enable:false,
							color:"#008080",
							width:3,
							opacity:90
						},
						direct:{
							enable:false,
							color:"#8e9bd5",
							width:32,
							opacity:80,
							style:"center"
						},
						tip:{
							enable:true,
							color:"#000000",
							bgcolor:"#cbc8f9",
							width:18,
							opacity:80,
							style:"follow",
							withdir:true
						},
						note:{
							enable:true,
							color:"#f75620",
							opacity:90,
							width:12,
							style:"hover"
						},
						allaction:{
							enable:false,
							color:"#ffffff",
							bgcolor:"#576f71",
							width:24,
							opacity:70,
							style:"ui_bottom"
						}
					},
					tdrg:[
						{
							direct:"L",
							name:"txtsearch",
							mydes:{type:true,value:getDefault.i18n("init_searchtxt_bg")},
							selects:[
								{type:"n_txtengine",value:"0"},
								{type:"n_encoding",value:"s_uri"},
								{type:"n_optype",value:"s_back"},
								{type:"n_position",value:"s_default"}
							],
							checks:[{type:"n_pin",value:false}]
						},
						{
							direct:"R",
							name:"txtsearch",
							selects:[
								{type:"n_txtengine",value:"0"},
								{type:"n_encoding",value:"s_uri"},
								{type:"n_optype",value:"s_new"},
								{type:"n_position",value:"s_default"}
							],
							checks:[{type:"n_pin",value:false}]
						},
						{
							direct:"LDR",
							name:"copytxt"
						}
					],
					ldrg:[
						{
							direct:"L",
							name:"openlnk",
							mydes:{type:true,value:getDefault.i18n("init_openlnk_bg")},
							selects:[
								{type:"n_optype",value:"s_back"},
								{type:"n_position",value:"s_default"}
							],
							checks:[{type:"n_pin",value:false}]
						},
						{
							direct:"R",
							name:"openlnk",
							selects:[
								{type:"n_optype",value:"s_new"},
								{type:"n_position",value:"s_default"}
							],
							checks:[{type:"n_pin",value:false}]
						},
						{
							direct:"LDR",
							name:"copylnkurl"
						}
					],
					idrg:[
						{
							direct:"L",
							name:"imgsearch",
							mydes:{type:true,value:getDefault.i18n("init_searchimg_bg")},
							selects:[
								{type:"n_imgengine",value:"0"},
								{type:"n_encoding",value:"s_uri"},
								{type:"n_optype",value:"s_back"},
								{type:"n_position",value:"s_default"}
							],
							checks:[{type:"n_pin",value:false}]
						},
						{
							direct:"R",
							name:"imgsearch",
							selects:[
								{type:"n_imgengine",value:"0"},
								{type:"n_encoding",value:"s_uri"},
								{type:"n_optype",value:"s_new"},
								{type:"n_position",value:"s_default"}
							],
							checks:[{type:"n_pin",value:false}]
						},
						{
							direct:"U",
							name:"openimg",
							selects:[
								{type:"n_optype",value:"s_new"},
								{type:"n_position",value:"s_default"}
							],
							checks:[{type:"n_pin",value:false}]
						},
						{
							direct:"LDR",
							name:"copyimgurl"
						}
					]
				},
				rges:{
					actions:[
						{
							name:"switchtab",
							mydes:{type:true,value:getDefault.i18n("init_switch_right")},
							selects:[
								{type:"n_tab_lrhl",value:"s_right"}
							]
						},
						{
							name:"switchtab",
							mydes:{type:true,value:getDefault.i18n("init_switch_left")},
							selects:[
								{type:"n_tab_lrhl",value:"s_left"}
							]
						}
					]
				},
				wges:{
					actions:[
						{
							name:"none"
						},
						{
							name:"none"
						},
						{
							name:"switchtab",
							mydes:{type:true,value:getDefault.i18n("init_switch_left")},
							selects:[
								{type:"n_tab_lrhl",value:"s_left"}
							]
						},
						{
							name:"switchtab",
							mydes:{type:true,value:getDefault.i18n("init_switch_right")},
							selects:[
								{type:"n_tab_lrhl",value:"s_right"}
							]
						}
					]
				},
				pop:{
					settings:{
						type:"front",
						last:false
					},
					actions:[
						{
							name:"reload",
							mydes:{type:true,value:getDefault.i18n("init_reload_current")},
							selects:[{type:"n_tab",value:"s_current"}],
							checks:[{type:"n_reload_clear",value:false}]
						},
						{
							name:"newtab",
							selects:[
								{type:"n_optype",value:"n_new"},
								{type:"n_position",value:"s_default"}
							],
							checks:[{type:"n_pin",value:false}]
						}
					]
				},
				icon:{
					settings:{
						type:"back",
						tip:true
					},
					actions:[
						{
							name:"newtab",
							selects:[
								{type:"n_optype",value:"n_new"},
								{type:"n_position",value:"s_default"}
							],
							checks:[{type:"n_pin",value:false}]
						}
					]
				},
				ctm:{
					settings:{
						disable:true,
						opt:true,
						fnswitch:false
					},
					actions:[
						{
							name:"newtab",
							selects:[
								{type:"n_optype",value:"n_new"},
								{type:"n_position",value:"s_default"}
							],
							checks:[{type:"n_pin",value:false}]
						}
					]
				},
				touch:{
					settings:{
						txttourl:true,
						lnktoimg:false
					},
					ui:{
						line:{
							enable:false,
							color:"#808080",
							width:5,
							opacity:50
						},
						direct:{
							enable:false,
							color:"#8e9bd5",
							width:32,
							opacity:80,
							style:"center"
						},
						tip:{
							enable:true,
							color:"#ffffff",
							bgcolor:"#5677fc",
							width:18,
							opacity:80,
							style:"leftbottom",
							withdir:false
						},
						note:{
							enable:false,
							color:"#f75620",
							opacity:90,
							width:12,
							style:"hover"
						},
						allaction:{
							enable:false,
							color:"#ffffff",
							bgcolor:"#576f71",
							width:24,
							opacity:70,
							style:"ui_bottom"
						}
					},
					actions:[
						{
							direct:"DL",
							name:"newtab",
							selects:[
								{type:"n_optype",value:"n_new"},
								{type:"n_position",value:"s_default"}
							],
							checks:[{type:"n_pin",value:false}]
						},
						{
							direct:"DR",
							name:"close",
							mydes:{type:true,value:getDefault.i18n("init_close_current")},
							selects:[
								{type:"n_tab",value:"s_current"},
								{type:"n_close_sel",value:"s_default"}
							],
							checks:[
								{type:"n_close_keep",value:false}
							]
						},
						{
							direct:"DRL",
							name:"reopen"
						},
						{
							direct:"DRU",
							name:"appslist"
						},
						{
							direct:"RDLU",
							name:"optionspage"
						}
					]
				},
				about:{
					donatedev:{
						ad:true
					}
				}
			}	
		switch(navigator.language.toLowerCase()){
			case"zh-cn":
				var OBJ={};
				OBJ.name="\u767e\u5ea6";
				OBJ.content="http://www.baidu.com/s?wd=%s";
				config.general.engine.txtengine.push(OBJ);
				var imgobj={};
				imgobj.name="\u767e\u5ea6";
				imgobj.content="http://image.baidu.com/pcdutu?queryImageUrl=%s";
				config.general.engine.imgengine.push(imgobj);
				break;
			case"ru":
				var OBJ={};
				OBJ.name="\u042f\u043d\u0434\u0435\u043a\u0441";
				OBJ.content="http://www.yandex.com/yandsearch?text=%s";
				config.general.engine.txtengine.push(OBJ);
				break;
		}
		return config
	}
}
defaultConf=getDefault.value();
let loadLocalConfig=function(){
	chrome.storage.local.get(function(items){
		localConfig=items.local;
	})
}
let loadConfig=function(noInit,type){
	function needInit(){
		//if(!config.version){config.version=37;}
		sub.init();
		return;
		if(noInit){

		}else{
			sub.init();
		}
	}
	if(!type){
		if(chrome.storage.sync){
			if(localStorage.getItem("sync")==null){
				localStorage.setItem("sync","true");
				type="sync";
			}else{
				type=localStorage.getItem("sync")=="true"?"sync":"local";
			}
		}else{
			localStorage.setItem("sync","false");
			type="local";
		}
	}
	if(type=="sync"){
		chrome.storage.sync.get(function(items){
			if(!items.general){
				config=getDefault.value();
				chrome.storage.sync.set(config,function(){});
			}else{
				config=items;
			}
			needInit();
			//sub.init();
		});
	}else{
		chrome.storage.local.get(function(items){
			if(items.version&&items.version<41){//for old version
				console.log("old")
				config=items;
			}else{
				if(!items.config){
					let _obj={};
					config=getDefault.value();
					_obj.config=config;
					chrome.storage.local.set(_obj,function(){
						console.log("set defaultConfig to local")
					});
				}else{
					config=items.config;
				}				
			}
			needInit();
			//sub.init();
		});
	}
}

var appConfmodel={
	rss:{feed:["https://www.cnet.com/rss/news/"],n_optype:"s_back",n_position:"s_default",n_pin:false,n_closebox:false},
	tablist:{n_closebox:true},
	recentbk:{n_optype:"s_back",n_position:"s_default",n_pin:false,n_num:10,n_closebox:false},
	recentht:{n_optype:"s_back",n_position:"s_default",n_pin:false,n_num:10,n_closebox:false},
	speaker:{n_rate:1,n_pitch:1,n_volume:1,n_gender:"s_female",n_voicename:"native"},
	appslist:{n_closebox:true},
	recentclosed:{n_num:10,n_closebox:true},
	synced:{n_closebox:true},
	jslist:{n_closebox:true}
}

var sub={
	cons:{
		pretab:[],
		fullstate:null,
		per_write:false,
		scroll:{},
		crversion:(window.navigator.userAgent.substr(window.navigator.userAgent.indexOf("Chrome")+7,100).substr(0,window.navigator.userAgent.substr(window.navigator.userAgent.indexOf("Chrome")+7,100).indexOf(" "))),
		permissions:{},
		os:"win"
	},
	checkMouseup:function(){
		if(chrome.browserSettings&&chrome.browserSettings.contextMenuShowEvent){
			browser.browserSettings.contextMenuShowEvent.set({value:"mouseup"});
			config.general.linux.cancelmenu=false;
			sub.saveConf();
		}else if(browserType=="fx"&&(localStorage.getItem("flag_mouseup")==null)&&(sub.cons.os=="linux"||sub.cons.os=="mac")){
			sub.checkPermission(["browserSettings"],null,null,sub.getI18n("perdes_browsersettings"));
			localStorage.setItem("flag_mouseup","true");
		}
	},
	init:function(){
		sub.upgrade.up();
		sub.initpers();
		sub.initIcon();
		sub.initEvent();
		(config.general.fnswitch.fnctm&&chrome.contextMenus)?sub.initCTM():null;
	},
	initEvent:function(){
		for(let i=0;config.mges&&config.mges.actions&&i<config.mges.actions.length;i++){
			if(config.mges.actions[i].name=="pretab"&&!chrome.tabs.onActivated.hasListeners()){
				chrome.tabs.onActivated.addListener(sub.handleEvent.onTabsActivated);
				break;
			}
		}
	},
	handleEvent:{
		onTabsActivated:function(info){
			console.log("s")
			sub.cons.pretab.unshift(info);
		},
		onTabsRemoved:function(info){

		}
	},
	initIcon:function(){
		if(config.general.fnswitch.fnicon){
			chrome.browserAction.setPopup({popup:""});
			if(config.icon.settings.tip){
				chrome.browserAction.setTitle({title:config.icon.actions[0].mydes&&config.icon.actions[0].mydes.type&&config.icon.actions[0].mydes.value?config.icon.actions[0].mydes.value:sub.getI18n(config.icon.actions[0].name)});
			}
		}else{
			chrome.browserAction.setPopup({popup:"../html/popup.html"});
			chrome.browserAction.setTitle({title:sub.getI18n("ext_name")});
		}
	},
	initCTM:function(){
		chrome.contextMenus.removeAll(function(){
			if(!config.general.fnswitch.fnctm){return;}
			sub.ctm={actions:[],fn:[],menuDisable:"",menuOpt:""};
			for(var i=0;i<config.ctm.actions.length;i++){
				var menuId=chrome.contextMenus.create({contexts:["all"],title:((config.ctm.actions[i].mydes&&config.ctm.actions[i].mydes.type)?config.ctm.actions[i].mydes.value:sub.getI18n(config.ctm.actions[i].name))}, function(){});
				sub.ctm.actions.push({id:i,menuId:menuId});
			}
			if(config.ctm.settings.fnswitch){
				chrome.contextMenus.create({contexts:["all"],type:"separator"}, function(){});
				var fnArray=["mges","sdrg","drg","rges","wges","pop","icon","ctm"];
				for(var i=0;i<fnArray.length;i++){
					var menuId=chrome.contextMenus.create({contexts:["all"],title:sub.getI18n(fnArray[i]),type:"checkbox",checked:config.general.fnswitch["fn"+fnArray[i]],enabled:(fnArray[i]=="ctm"?false:true)}, function(){});
					sub.ctm.fn.push({id:i,fnName:"fn"+fnArray[i],menuId:menuId});
				}				
			}
			if(config.ctm.settings.disable||config.ctm.settings.opt){
				chrome.contextMenus.create({contexts:["all"],type:"separator"}, function(){});
			}
			if(config.ctm.settings.disable){
				sub.ctm.menuDisable=chrome.contextMenus.create({contexts:["all"],title:sub.getI18n("ctm_disable"),type:"checkbox"}, function(){});
			}
			if(config.ctm.settings.opt){
				sub.ctm.menuOpt=chrome.contextMenus.create({contexts:["all"],title:sub.getI18n("ctm_opt")}, function(){});
			}

		})
	},
	CTMclick:function(info,tab){
		console.log(info);
		console.log(tab);
		for(var i=0;i<sub.ctm.actions.length;i++){
			if(info.menuItemId==sub.ctm.actions[i].menuId){
				var theConf=config.ctm.actions[sub.ctm.actions[i].id];
				sub.theConf=theConf;
				var selObj={
						lnk:info.linkUrl||"",
						txt:info.selectionText||"",
						img:info.srcUrl||"",
						str:""
					}
				console.log(selObj)
				sub.message={type:"action_ctm",selEle:selObj}
				sub.initCurrent(null,sub.theConf);
				break;
			}
		}
		for(var i=0;i<sub.ctm.fn.length;i++){
			if(info.menuItemId==sub.ctm.fn[i].menuId){
				var fnName=sub.ctm.fn[i].fnName;
				if(info.checked){
					config.general.fnswitch[fnName]=true;
					if(fnName=="fndrg"){
						config.general.fnswitch.fnsdrg=false;
					}
					if(fnName=="fnsdrg"){
						config.general.fnswitch.fndrg=false;
					}
					if(fnName=="fnpop"){
						config.general.fnswitch.fnicon=false;
					}
					if(fnName=="fnicon"){
						config.general.fnswitch.fnpop=false;
					}
				}else{
					config.general.fnswitch[fnName]=false;
				}
				sub.saveConf();
				break;
			}
		}
		if(info.menuItemId==sub.ctm.menuOpt){
			sub.action.optionspage();
		}	
	},
	getConfValue:function(type,value){
		var _value="";
		for(var i=0;i<(sub.theConf[type]?sub.theConf[type].length:0);i++){
			if(sub.theConf[type][i].type==value){
				_value=sub.theConf[type][i].value;
				break;
			}
		}
		//value=="n_pin"?(_value=(_value=="s_pin"?true:false)):null;
		// switch(value){
		// 	case"n_reload_clear":
		// 	case"n_winincog":
		// 		_value=_value=="s_no"?false:true;
		// 		break;
		// }
		return _value;
	},
	getId:function(value){
		var theId=[];
		switch(value){
			case"s_default":
				theId.push(value)
				break;
			case"s_current":
				theId.push(sub.curTab.id);
				break;
			case"s_head":
				theId.push(sub.curWin.tabs[0].id);
				break;
				chrome.tabs.query({index:0},function(tabs){
					theId.push(tabs[0].id);
				})
				break;
			case"s_last":
				theId.push(sub.curWin.tabs[sub.curWin.tabs.length-1].id);
				break;
			case"s_left":
				if(sub.curTab.index==0){
					theId.push(sub.curWin.tabs[sub.curWin.tabs.length-1].id);
					break;
				}
				for(var i=0;i<sub.curWin.tabs.length&&sub.curWin.tabs.length>1;i++){
					if(sub.curWin.tabs[i].index==sub.curTab.index-1){
						theId.push(sub.curWin.tabs[i].id);
						break;
					}
				}
				break;
			case"s_right":
				if(sub.curTab.index==sub.curWin.tabs.length-1){
					theId.push(sub.curWin.tabs[0].id);
					break;
				}
				for(var i=0;i<sub.curWin.tabs.length&&sub.curWin.tabs.length>1;i++){
					if(sub.curWin.tabs[i].index==sub.curTab.index+1){
						theId.push(sub.curWin.tabs[i].id);
						break;
					}
				}
				break;
			case"s_lefts":
				if(sub.curTab.index==0){
					// theId=false;
					// break;
					// for(var i=0;i<sub.curWin.tabs.length&&sub.curWin.tabs.length>1;i++){
					// 	if(sub.curWin.tabs[i].index>sub.curTab.index){
					// 		theId.push(sub.curWin.tabs[i].id);
					// 	}
					// }
					break;
				}
				for(var i=0;i<sub.curWin.tabs.length&&sub.curWin.tabs.length>1;i++){
					if(sub.curWin.tabs[i].index<sub.curTab.index){
						theId.push(sub.curWin.tabs[i].id);
					}
				}
				break;
			case"s_rights":
				if(sub.curTab.index==sub.curWin.tabs.length-1){
					// if(fnName&&fnName=="close"){
					// 	break;
					// }
					// for(var i=0;i<sub.curWin.tabs.length&&sub.curWin.tabs.length>1;i++){
					// 	if(sub.curWin.tabs[i].index<sub.curTab.index){
					// 		theId.push(sub.curWin.tabs[i].id);
					// 	}
					// }
					break;
				}
				for(var i=0;i<sub.curWin.tabs.length&&sub.curWin.tabs.length>1;i++){
					if(sub.curWin.tabs[i].index>sub.curTab.index){
						theId.push(sub.curWin.tabs[i].id);
					}
				}
				break;
			case"s_others":
				if(sub.curWin.tabs.length==1){
					//theId=false;
					theId=[];
					break;
				}
				for(var i=0;i<sub.curWin.tabs.length&&sub.curWin.tabs.length>1;i++){
					if(sub.curWin.tabs[i].index!=sub.curTab.index){
						theId.push(sub.curWin.tabs[i].id);
					}
				}
				break;
			case"s_all":
				for(var i=0;i<sub.curWin.tabs.length;i++){
					theId.push(sub.curWin.tabs[i].id);
				}
				break;
		}
		return theId;
	},
	getIndex:function(value,type){
		var _new=(type=="new"?true:false);
		var theIndex=[];
		switch(value){
			case"s_current":
				theIndex.push(sub.curTab.index);
				break;
			case"s_default":
				theIndex.push(false);
				break;
			case"s_head":
				theIndex.push(0);
				break;
			case"s_last":			
				if(_new){
					theIndex.push(sub.curWin.tabs.length);
				}else{
					theIndex.push(sub.curWin.tabs.length-1);
				}
				break;
			case"s_left":
				if(_new){
					theIndex.push(sub.curTab.index==0?0:sub.curTab.index);
					break;
				}
				theIndex.push(sub.curTab.index==0?sub.curWin.tabs.length-1:sub.curTab.index-1);
				break;
			case"s_right":
				if(_new){
					theIndex.push(sub.curTab.index==sub.curWin.tabs.length-1?sub.curWin.tabs.length:sub.curTab.index+1);
					break;
				}
				theIndex.push(sub.curTab.index==sub.curWin.tabs.length-1?0:sub.curTab.index+1);
				break;
		}
		return theIndex;
	},
	showNotif:function(type,title,txt){
		var notif={
	        	iconUrl:"icon.png",
				type:type,
				title:title,
				message:txt
			};
		chrome.notifications.create("",notif,function(){});
	},
	initAppconf:function(appname){
		if(!config.apps){config.apps={}}
		if(!config.apps[appname]){
			config.apps[appname]=appConfmodel[appname];
			chrome.storage.sync.set(JSON.parse(JSON.stringify(config)),function(){});
		}
	},
	insertTest:function(appname){
		//console.log("appname")
		//chrome.tabs.sendMessage(curTab.id,{type:"apptype",apptype:appname},function(response){});
		chrome.tabs.executeScript({code:'chrome.runtime.sendMessage({type:"apps_test",apptype:"'+appname+'",value:sue.apps.enable,appjs:appType["'+appname+'"]},function(response){console.log(response)})',runAt:"document_start"});	
	},
	checkPermission:function(thepers,theorgs,theFunction,msg){
		console.log(thepers+"/"+theorgs+"/"+theFunction+"/"+msg)
		if(!chrome.permissions){
			return theFunction();
		}
		if(thepers&&theorgs){
			chrome.permissions.contains({permissions: thepers,origins:theorgs},function(result){checkPers(result)})
		}else if(thepers){
			chrome.permissions.contains({permissions: thepers},function(result){checkPers(result)})
		}else if(theorgs){
			chrome.permissions.contains({origins:theorgs},function(result){checkPers(result)})
		}
		var getPers=function(thepers,theorgs){
			sub.cons.permissions={
				pers:thepers,
				orgs:theorgs
			}
			msg?sub.cons.permissions.msg=msg:null;
			chrome.windows.create({url:"../html/getpermissions.html",/*focused:true,*/type:"popup",width:800,height:500})
			return;
		}
		var checkPers=function(result){
			if (result) {
				theFunction();
		    }else {
		    	getPers(thepers,theorgs);
		    }
		}
	},
	setIcon:function(status,tabId,changeInfo,tab){
		switch(status){
			case"normal":
				//chrome.browserAction.setIcon({tabId:tab.id,path:"../image/icon_bar.png"});
				break;
			case"warning":
				chrome.browserAction.setIcon({tabId:tab.id,path:"../image/icon_warning.png"});
				chrome.browserAction.setTitle({tabId:tab.id,title:sub.getI18n("icon_tip")});
				break;
		}
		//chrome.pageAction.show(tabId);
	},
	getI18n:function(str){
		return chrome.i18n.getMessage(str)||str;
	},
	checkAction:function(type,direct){
		var theName="",
			theConf="";
		for(var i=0;i<config.mges.mges.length;i++){
			if(config.mges.mges[i].direct==direct){
				theName=config.mges.mges[i].name;
				theConf=config.mges.mges[i];
				break;
			}
			if(i==config.mges.mges.length-1){
				theConf={name:null,mydes:null}
			}
		}
		sub.theConf=theConf;
		return sub.theConf;
	},
	initCurrent:function(sender,theConf){
		//sender?sub.extID=sender.id:null;
		chrome.windows.getCurrent({populate:true},function(window){
			sub.curWin=window;
			chrome.tabs.query({active:true,currentWindow:true},function(tabs){
				sub.curTab=tabs[0];
				if(sub.action[sub.theConf.name]){
					sub.action[sub.theConf.name](sub.theConf);
				}
			})
		})
	},
	action:{
		none:function(){
			return;
		},
		//group nav
		back:function(){//chk
			chrome.tabs.executeScript({code:"window.history.go(-1)",runAt:"document_start"},function(){})
		},
		forward:function(){//chk
			chrome.tabs.executeScript({code:"window.history.go(+1)",runAt:"document_start"},function(){})
		},
		scroll:function(){
			var _effect=sub.getConfValue("checks","n_effect"),
				_scroll=sub.getConfValue("selects","n_scroll").substr(2);
			sub.cons.scroll.effect=_effect;
			sub.cons.scroll.type=_scroll;//scrolltype;//sub.theConf.name;
			chrome.tabs.executeScript({file:"js/inject/scroll.js",runAt:"document_start",allFrames:true},function(){})
		},
		reload:function(){//chk
			var ids=sub.getId(sub.getConfValue("selects","n_tab"));
			var clear=sub.getConfValue("checks","n_reload_clear");
			//fix edge
			if(!chrome.tabs.reload){
				for(var i=0;ids&&i<ids.length;i++){
					chrome.tabs.executeScript(ids[i],{code:"location.reload();"});
				}
			}
			for(var i=0;ids&&i<ids.length;i++){
				chrome.tabs.reload(ids[i],{bypassCache:clear});
			}
		},
		stop:function(){//chk
			var ids=sub.getId(sub.getConfValue("selects","n_tab"));
			for(var i=0;ids&&i<ids.length;i++){
				chrome.tabs.executeScript(ids[i],{code:"window.stop()",runAt:"document_start"},function(){})
			}
		},
		next:function(){
			if(sub.message.npok){
				sub.open(sub.message.url,sub.cons.next.optype,sub.cons.next.index,sub.cons.next.pin);
				sub.cons.next={};
			}else{
				sub.cons.next={};
				sub.cons.next.index=sub.getIndex(sub.getConfValue("selects","n_position"),"new")[0];
				sub.cons.next.pin=sub.getConfValue("checks","n_pin");
				sub.cons.next.optype=sub.getConfValue("selects","n_optype");
				sub.cons.next.keywds=(sub.getConfValue("texts","n_npkey_n")||sub.getConfValue("texts","n_npkey_p")).split(",");
				chrome.tabs.executeScript({file:"js/namespace.js",runAt:"document_start",allFrames:true},function(){})	
				chrome.tabs.executeScript({file:"js/inject/np.js",runAt:"document_start",allFrames:true},function(){})				
			}
		},
		previous:function(){
			sub.action.next();
		},
		pretab:function(){
			var ids=[],
				curTabId=sub.curTab.id;
			for(var i=0;i<sub.curWin.tabs.length;i++){
				ids.push(sub.curWin.tabs[i].id);
			}
			for(var i=1;i<sub.cons.pretab.length;i++){
				if(sub.cons.pretab[i].tabId!=curTabId&&ids.contains(sub.cons.pretab[i].tabId)){
					console.log(sub.cons.pretab[i].tabId)
					chrome.tabs.update(sub.cons.pretab[i].tabId,{active:true},function(){
						//sub.cons.pretab.length=2;
					});
					break;
				}
			}

			// chrome.tabs.query({currentWindow:true},function(tabs){
			// 	var ids=[];
			// 	for(var i=0;i<tabs.length;i++){
			// 		ids.push(tabs[i].id);
			// 	}
			// 	console.log(ids);
			// 	chrome.tabs.query({active:true},function(tabs){
			// 		var curTabId=tabs[0].id;
			// 		for(var i=1;i<sub.cons.pretab.length;i++){
			// 			if(sub.cons.pretab[i].id!=curTabId&&ids.contains(sub.cons.pretab[i].tabId)){
			// 				console.log(sub.cons.pretab[i].tabId)
			// 				chrome.tabs.update(sub.cons.pretab[i].tabId,{active:true},function(){
			// 					//sub.cons.pretab.length=2;
			// 				});
			// 				break;
			// 			}
			// 		}
			// 	})
			// })

			// chrome.tabs.update(sub.cons.pretab[1].tabId,{active:true},function(){
			// 	//sub.cons.pretab.length=2;
			// });
		},
		close:function(){
			var ids=sub.getId(sub.getConfValue("selects","n_tab"),arguments.callee.name),
				selid=sub.getId(sub.getConfValue("selects","n_close_sel"))[0],
				selvalue=sub.getConfValue("selects","n_close_sel"),
				_closeKeep=sub.getConfValue("checks","n_close_keep");
			let value_closePin=sub.getConfValue("checks","n_closePin");
			let funClose=function(){
				let _funClose=function(){
					if(sub.curWin.tabs.length==ids.length&&!sub.curWin.incognito&&_closeKeep){
					//if(sub.curWin.tabs.length==1&&!sub.curWin.incognito&&_closeKeep){
						chrome.tabs.create({},function(){
							chrome.tabs.remove(ids,function(){
								(selvalue!="s_default")?chrome.tabs.update(selid,{active:true}):null;
							});
						})
					}else{
						chrome.tabs.remove(ids,function(){
							(selvalue!="s_default")?chrome.tabs.update(selid,{active:true}):null;
						});
					}					
				}
				if(ids.length>1&&sub.getConfValue("checks","n_closeConfirm")){
					chrome.tabs.sendMessage(sub.curTab.id,{type:"set_confirm"},function(response){
						if(response.message){
							_funClose();
						}
					});
				}else{
					_funClose();
				}			
			}
			if(value_closePin){
				let ids_pinned,i=0,ii=0;
				chrome.tabs.query({pinned:true},function(tabs){
					for(i=0;i<tabs.length;i++){
						for(ii=0;ii<ids.length;ii++){
							if(tabs[i].id==ids[ii]){
								ids.splice(ii,1);
								continue;
							}
						}
					}
					funClose();
				})
			}else{
				funClose();
			}
		},
		newtab:function(){//chk
			var theTarget=sub.getConfValue("selects","n_optype"),
				theIndex=sub.getIndex(sub.getConfValue("selects","n_position"),"new")[0],
				thePin=sub.getConfValue("checks","n_pin");
			var theURL="";

			// var theURL="chrome://newtab";//browserType=="cr"?"chrome://newtab":"about:home";
			// if(browserType=="fx"){theURL="about:home"}

			sub.open(theURL,theTarget,theIndex,thePin,"newtab");
		},
		upperlevel:function(){
			console.log(sub.curTab)
			let _optype=sub.getConfValue("selects","n_optype"),
				_index=sub.getIndex(sub.getConfValue("selects","n_position"),"new")[0],
				_pin=sub.getConfValue("checks","n_pin"),
				_url="";
			//let _urlA=sub.curTab.url.split("/");
			let _urlA=sub.curTab.url;
			if(_urlA.substr(-1)=="/"){
				_urlA=_urlA.substr(0,_urlA.length-1);
			}
			let _urlB=_urlA.split("/");
			//_urlA=_urlA.split("/")
			if(_urlB.length>3){
				_urlB.length=_urlB.length-1;
			}
			let _urlC=_urlB.join("/");
			console.log(_urlA)
			console.log(_urlC);
			_url=_urlC==_urlA?"":_urlC;
			sub.open(_url,_optype,_index,_pin);
		},
		increment:function(){
			let _optype=sub.getConfValue("selects","n_optype"),
				_index=sub.getIndex(sub.getConfValue("selects","n_position"),"new")[0],
				_pin=sub.getConfValue("checks","n_pin"),
				_url="";
			let _urlA=sub.curTab.url;
			let _urlB=_urlA.split("/");
			let i=0,_urlC="";
			let setNum=function(txt){
				console.log(txt)
				let _array=txt.match(/(\d*)/g);
				let i=0,
					_num="",
					_numNew,
					_index;
				for(i=_array.length-1;i>-1;i--){
					console.log(_array);
					if(!isNaN(parseInt(_array[i]))){
						_num=_array[i];
						break;
					}
				}
				if(_num==""){
					return false;
				}else{
					_numNew=parseInt(_num)+1;
					if(_numNew.toString().length<_num.length){
						_numNew="0".repeat(_num.length-_numNew.toString().length)+_numNew;
					}
					_index=txt.lastIndexOf(_num);
					if(_index!=-1){
						txt=txt.substr(0,_index)+_numNew.toString()+txt.substr(_index+_num.length)
					}
					return txt;
				}
			}

			for(i=_urlB.length-1;i>2;i--){
				_urlC=_urlB[i];
				console.log(setNum(_urlC));
				if(setNum(_urlC)){
					_urlB[i]=setNum(_urlC);
					_url=_urlB.join("/");
					_url=_url==_urlA?"":_url;
					sub.open(_url,_optype,_index,_pin);
					break;
				}
			}
		},
		decrement:function(){
			let _optype=sub.getConfValue("selects","n_optype"),
				_index=sub.getIndex(sub.getConfValue("selects","n_position"),"new")[0],
				_pin=sub.getConfValue("checks","n_pin"),
				_url="";
			let _urlA=sub.curTab.url;
			let _urlB=_urlA.split("/");
			let i=0,_urlC="";
			let setNum=function(txt){
				console.log(txt)
				let _array=txt.match(/(\d*)/g);
				let i=0,
					_num="",
					_numNew,
					_index;
				for(i=_array.length-1;i>-1;i--){
					if(!isNaN(parseInt(_array[i]))){
						_num=_array[i];
						break;
					}
				}
				if(_num==""){
					return false;
				}else{
					_numNew=parseInt(_num)-1;
					if(_numNew.toString().length<_num.length){
						_numNew="0".repeat(_num.length-_numNew.toString().length)+_numNew;
					}
					_index=txt.lastIndexOf(_num);
					if(_index!=-1){
						txt=txt.substr(0,_index)+_numNew.toString()+txt.substr(_index+_num.length)
					}
					return txt;
				}
			}
			for(i=_urlB.length-1;i>2;i--){
				_urlC=_urlB[i];
				console.log(setNum(_urlC));
				if(setNum(_urlC)){
					_urlB[i]=setNum(_urlC);
					_url=_urlB.join("/");
					_url=_url==_urlA?"":_url;
					sub.open(_url,_optype,_index,_pin);
					break;
				}
			}
		},
		extdisable:function(){
			chrome.tabs.query({active:true,currentWindow:true},function(tabs){
				sub.curTab=tabs[0];
				chrome.tabs.sendMessage(tabs[0].id,{type:"extdisable"},function(response){});
			})
		},
		reopen:function(){
			var theFunction=function(){
				chrome.sessions.restore();
			}
			var thepers=["sessions"];
			var theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		open:function(){//chk
			sub.open(sub.getConfValue("texts","n_url"),sub.getConfValue("selects","n_optype"),sub.getIndex(sub.getConfValue("selects","n_position"),"new")[0],sub.getConfValue("checks","n_pin"));
		},
		openclip:function(){//chk
			var theTarget=sub.getConfValue("selects","n_optype"),
				theIndex=sub.getIndex(sub.getConfValue("selects","n_position"),"new")[0],
				thePin=sub.getConfValue("checks","n_pin");
			var theURL,
				clipOBJ=document.body.appendChild(document.createElement("textarea"));
			clipOBJ.focus();
			document.execCommand('paste', false, null);
			theURL=clipOBJ.value;
			clipOBJ.remove();

			sub.open(theURL,theTarget,theIndex,thePin);
			//sub.open(theURL,sub.getConfValue("selects","n_optype"),sub.getIndex(sub.getConfValue("selects","n_position"),"new")[0],sub.getConfValue("checks","n_pin"));

			////////////
			// var theTarget=sub.getConfValue("selects","n_optype"),
			// 	theIndex=sub.getIndex(sub.getConfValue("selects","n_position"),"new")[0],
			// 	thePin=sub.getConfValue("checks","n_pin");
			// var theURL=browserType=="cr"?"chrome://newtab":"about:blank";
			// sub.open(theURL,theTarget,theIndex,thePin);
		},
		switchtab:function(){
			var id=sub.getId(sub.getConfValue("selects","n_tab_lrhl"))[0];
			//fix contextmenu from switchtab by rges or wges
			if((sub.message.type=="action_wges"||sub.message.type=="action_rges")&&sub.message.sendValue.buttons==2){
				chrome.tabs.sendMessage(id,{type:"fix_switchtab",value:"contextmenu"},function(response){
					chrome.tabs.update(id,{active:true});
				});
			}else{
				chrome.tabs.update(id,{active:true});
			}
		},
		move:function(){
			var index=sub.getIndex(sub.getConfValue("selects","n_position_lrhl"))[0];
			chrome.tabs.move(sub.curTab.id,{index:index});
		},
		detach:function(){
			if(sub.curWin.tabs.length==1){return;}
			var _target=sub.getConfValue("selects","n_tab"),
				ids=sub.getId(_target);
			if(ids==false||_target=="s_all"){return;}
			chrome.windows.create({tabId:ids[0]},function(window){
				if(ids.length>1){
					ids.splice(0,1);
					chrome.tabs.move(ids,{windowId:window.id,index:-1})
				}
			})
			return;
		},
		pin:function(){
			var ids=sub.getId(sub.getConfValue("selects","n_tab"));
			if(ids.length==1){
				chrome.tabs.get(ids[0],function(tab){
					var _pin=tab.pinned?false:true;
					chrome.tabs.update(ids[0],{pinned:_pin});
				})
			}else{
				chrome.windows.getCurrent({populate:true},function(window){
					for(var i=0;i<window.tabs.length/*&&ids.contains(window.tabs[i].id)*/;i++){
						if(!ids.contains(window.tabs[i].id)){continue;}
						_pin=window.tabs[i].pinned?false:true;
						chrome.tabs.update(window.tabs[i].id,{pinned:_pin});
					}
				})
				// for(var i=0;i<ids.length;i++){
				// 	chrome.tabs.update(ids[i],{pinned:true});
				// }
			}
		},
		duplicate:function(){
			var _target=sub.getConfValue("selects","n_tab"),
				ids=sub.getId(_target);
			for(var i=0;i<ids.length;i++){
				chrome.tabs.duplicate(ids[i],function(tab){});
			}
			//chrome.tabs.duplicate(sub.curTab.id,function(tab){})
		},
		copytabele:function(){
			var theFunction=function(){
				var theIndex=sub.getIndex(sub.getConfValue("selects","n_tab_single"))[0];
				chrome.tabs.query({index:theIndex},function(tabs){
					var cptarget=tabs[0];
					var cpcontent=sub.getConfValue("selects","n_copytabele_content");
					var clipOBJ=document.body.appendChild(document.createElement("textarea"));
					switch(cpcontent){
						case"s_tabele_title":
							clipOBJ.value=cptarget.title;
							break;
						case"s_tabele_url":
							clipOBJ.value=cptarget.url;
							break;
						case"s_tabele_aslnk":
							clipOBJ.value='<a href="'+cptarget.url+'">'+cptarget.title+'<\/a>';
							break;
					}	
					clipOBJ.select();
					document.execCommand('copy', false, null);
					clipOBJ.remove();				
				})
			}
			var thepers=["clipboardRead"];
			var theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		newwin:function(){//chk
			var theType=sub.getConfValue("selects","n_wintype").substr(2),
				theIncog=sub.getConfValue("checks","n_winincog");
			chrome.windows.create({type:theType,incognito:theIncog});
		},
		closewin:function(){
			var theWin=sub.getConfValue("selects","n_win");
			if(theWin=="s_current"){
				chrome.windows.remove(sub.curWin.id)
			}else{
				chrome.windows.getAll({populate:true},function(windows){
					for(var i=0;i<windows.length;i++){
						if(theWin=="s_others"){
							if(windows[i].id!=sub.curWin.id){
								chrome.windows.remove(windows[i].id);
							}
						}else{
							chrome.windows.remove(windows[i].id);
						}
					}
				})
			}
		},
		max:function(){
			chrome.windows.update(sub.curWin.id,{state:(sub.curWin.state=="normal"?"maximized":"normal")},function(window){
				sub.curWin.state=window.state;
			})
		},
		min:function(){
			chrome.windows.update(sub.curWin.id,{state:"minimized"})			
		},
		full:function(){
			var t;
			if(sub.curWin.state!="fullscreen"){
				sub.cons.winstate=sub.curWin.state;
				t="fullscreen";
			}else{
				t=sub.cons.winstate;
			}
			chrome.windows.update(sub.curWin.id,{state:t},function(window){})
		},
		mergewin:function(){
			sub.cons.mergewin=sub.cons.mergewin||{lastwins:[]};
			let i=0,ii=0,tabIds=[],win=[],_win=[],
				winState=sub.getConfValue("selects","n_winstate").substr(2);
			chrome.windows.getCurrent(function(window){
				chrome.windows.getAll({populate:true,windowTypes:["normal"]},function(windows){
					for(i=0;i<windows.length;i++){
						if(windows[i].id===window.id){continue;}
						_win=[];
						for(ii=0;ii<windows[i].tabs.length;ii++){
							console.log("sdf")
							tabIds.push(windows[i].tabs[ii].id);
							_win.push(windows[i].tabs[ii].id);
						}
						win.push(_win);
					}
					sub.cons.mergewin.lastwins=(win.length>0)?win:sub.cons.mergewin.lastwins;
					if(tabIds.length>0&&windows.length>1){
						chrome.tabs.move(tabIds,{windowId:window.id,index:-1},function(){
							if(winState!="normal"){
								chrome.windows.update(window.id,{state:winState})
							}
						});
					}else if(sub.cons.mergewin.lastwins.length>0){
						for(i=0;i<sub.cons.mergewin.lastwins.length;i++){
							var _temp=i;
							(function(_temp,winId){
								chrome.windows.create({tabId:sub.cons.mergewin.lastwins[_temp][0]},function(window){
									if(sub.cons.mergewin.lastwins[_temp].length>1){
										sub.cons.mergewin.lastwins[_temp].splice(0,1);
										chrome.tabs.move(sub.cons.mergewin.lastwins[_temp],{windowId:window.id,index:-1},function(){
											if(_temp==sub.cons.mergewin.lastwins.length-1){
												chrome.windows.update(winId,{focused:true})
											}
										})
									}
								})
							})(i,window.id)
						}
					}
				})
			})
			return;
			chrome.windows.getLastFocused(function(window){
				chrome.windows.getAll({populate:true,windowTypes:["normal"]},function(windows){
					let i=0,ii=0,tabIds=[];
					for(i=0;i<windows.length;i++){
						console.log(windows[i].id);
						if(windows[i].id===window.id){break;}
						for(ii=0;ii<windows[i].tabs.length;ii++){
							tabIds.push(windows[i].tabs[ii].id);
						}
					}
					console.log(tabIds)
					tabIds.length>0?chrome.tabs.move(tabIds,{windowId:window.id,index:-1}):null;
				})
			})
		},
		//txt
		copytxt:function(){//chk
			if(!sub.message.selEle.txt){return;}
			var theFunction=function(){
				var clipOBJ=document.body.appendChild(document.createElement("textarea"));
				clipOBJ.value=sub.message.selEle.txt;
				clipOBJ.select();
				document.execCommand('copy', false, null);
				clipOBJ.remove();				
			}
			var thepers=["clipboardRead"];
			var theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		txtsearch:function(){//chk
			if(!sub.message.selEle.txt){return;}
			var engine,theURL,enTxt;
			var theEngine=sub.getConfValue("selects","n_txtengine"),
				theTarget=sub.getConfValue("selects","n_optype"),
				theCode=sub.getConfValue("selects","n_encoding"),
				theIndex=sub.getIndex(sub.getConfValue("selects","n_position"),"new")[0],
				thePin=sub.getConfValue("checks","n_pin");
			switch(theCode){
				case"s_unicode":
					enTxt=escape(sub.message.selEle.txt);
					break;
				case"s_uri":
					enTxt=encodeURI(sub.message.selEle.txt);
					break;
				case"s_uric":
					enTxt=encodeURIComponent(sub.message.selEle.txt);
					break;
				default:
					enTxt=sub.message.selEle.txt;
					break;
			}
			var _engine=config.general.engine.txtengine[theEngine].content;
			theURL=_engine.replace(/%s/g,enTxt);

			sub.open(theURL,theTarget,theIndex,thePin);
		},
		txtsearchclip:function(){
			console.log("txtsearchclip")
			let _str,_obj=document.body.appendChild(document.createElement("textarea"));
				_obj.focus();
			document.execCommand('paste', false, null);
			_str=_obj.value;
			console.log(_obj)
			_obj.remove();

			let _url,_txt,
				_engine=sub.getConfValue("selects","n_txtengine"),
				_target=sub.getConfValue("selects","n_optype"),
				_code=sub.getConfValue("selects","n_encoding"),
				_index=sub.getIndex(sub.getConfValue("selects","n_position"),"new")[0],
				_pin=sub.getConfValue("checks","n_pin");
			switch(_code){
				case"s_unicode":
					_txt=escape(_str);
					break;
				case"s_uri":
					_txt=encodeURI(_str);
					break;
				case"s_uric":
					_txt=encodeURIComponent(_str);
					break;
				default:
					_txt=_str;
					break;
			}
			_engine=config.general.engine.txtengine[_engine].content;
			_url=_engine.replace(/%s/g,_txt);

			sub.open(_url,_target,_index,_pin);
		},
		tts:function(){
			if(!sub.message.selEle.txt){return;}
			var theFunction=function(){
				var _text=sub.message.selEle.txt,
					_voicename=sub.getConfValue("selects","n_voicename")?sub.getConfValue("selects","n_voicename"):"native",
					_gender="female";//sub.getConfValue("selects","n_gender")?sub.getConfValue("selects","n_gender").substr(2):"female",
					_rate=sub.getConfValue("ranges","n_rate")?Number(sub.getConfValue("ranges","n_rate")):1,
					_pitch=sub.getConfValue("ranges","n_pitch")?Number(sub.getConfValue("ranges","n_pitch")):1,
					_volume=sub.getConfValue("ranges","n_volume")?Number(sub.getConfValue("ranges","n_volume")):1;
				console.log(_rate)
				chrome.tts.speak(_text,{voiceName:_voicename,gender:_gender,rate:_rate,pitch:_pitch,volume:_volume})
			}
			theFunction();

			return;
			var thepers=["tts"];
			var theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		//link
		openlnk:function(){//lnk
			if(!sub.message.selEle.lnk){return;}
			var _optype=sub.getConfValue("selects","n_optype"),
				_url=sub.message.selEle.lnk,
				_position=sub.getIndex(sub.getConfValue("selects","n_position"),"new")[0],
				_pin=sub.getConfValue("checks","n_pin");
			sub.open(_url,_optype,_position,_pin);
		},
		bookmarklnk:function(){
			var theFunction=function(){
				var _url=sub.message.selEle.lnk?sub.message.selEle.lnk:null,
					_str=sub.message.selEle.str?sub.message.selEle.str:null,
					_notif=sub.getConfValue("checks","n_notif");
				if(!_url){return;}

				chrome.bookmarks.search({url:_url},function(nodes){
					if(nodes.length){
						chrome.bookmarks.remove(nodes[0].id);
						_notif=="s_yes"?sub.showNotif("basic",sub.getI18n("notif_title"),sub.getI18n("notif_con_bkdel")):null;
					}else{
						chrome.bookmarks.create({url:_url,title:_str});
						_notif=="s_yes"?sub.showNotif("basic",sub.getI18n("notif_title"),sub.getI18n("notif_con_bkadd")):null;
					}
				})				
			}
			var thepers=["bookmarks"];
			var theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		copylnkurl:function(){
			if(!sub.message.selEle.lnk){return;}
			var theFunction=function(){
				var clipOBJ=document.body.appendChild(document.createElement("textarea"));
				clipOBJ.value=sub.message.selEle.lnk;
				clipOBJ.select();
				document.execCommand('copy', false, null);
				clipOBJ.remove();				
			}
			var thepers=["clipboardRead"];
			var theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		copylnktxt:function(){
			if(!sub.message.selEle.str){return;}
			var theFunction=function(){
				var clipOBJ=document.body.appendChild(document.createElement("textarea"));
				clipOBJ.value=sub.message.selEle.str;
				clipOBJ.select();
				document.execCommand('copy', false, null);
				clipOBJ.remove();				
			}
			var thepers=["clipboardRead"];
			var theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		copylnkaslnk:function(){
			if(!sub.message.selEle.lnk){return;}
			var theFunction=function(){
				var clipOBJ=document.body.appendChild(document.createElement("textarea"));
				clipOBJ.value='<a href="'+sub.message.selEle.lnk+'">'+sub.message.selEle.str+'<\/a>';
				clipOBJ.select();
				document.execCommand('copy', false, null);
				clipOBJ.remove();			
			}
			var thepers=["clipboardRead"];
			var theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		copylnkas:function(){
			//console.log("copylnkas")
		},
		//img
		openimg:function(){//chk
			if(!sub.message.selEle.img){return;}
			var _optype=sub.getConfValue("selects","n_optype"),
				_position=sub.getIndex(sub.getConfValue("selects","n_position"),"new")[0] ,
				_pin=sub.getConfValue("checks","n_pin"),
				_url=sub.message.selEle.img;
			sub.open(_url,_optype,_position,_pin);
		},
		saveimg:function(){
			if(!sub.message.selEle.img){return;}
			var theFunction=function(){
				var _url=sub.message.selEle.img,
					//_dlbar=sub.getConfValue("checks","n_dlbar"),
					_notif=sub.getConfValue("checks","n_notif");
				//chrome.downloads.setShelfEnabled?chrome.downloads.setShelfEnabled(_dlbar==""?true:_dlbar):null;	
				chrome.downloads.download({url:_url},function(id){
					if(!id){
						_notif?sub.showNotif("basic",sub.getI18n("notif_title"),sub.getI18n("notif_con_dnimgerr")):null;
					}else{
						_notif?sub.showNotif("basic",sub.getI18n("notif_title"),sub.getI18n("notif_con_dnimg")):null;
					}
				})
			}
			var thepers=["downloads"];
			var theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		saveimgas:function(){
			if(!sub.message.selEle.img){return;}
			var theFunction=function(){
				var _url=sub.message.selEle.img,
					//_dlbar=sub.getConfValue("checks","n_dlbar"),
					_notif=sub.getConfValue("checks","n_notif");
				//chrome.downloads.setShelfEnabled?chrome.downloads.setShelfEnabled(_dlbar==""?true:_dlbar):null;
				//console.log(_url)
				chrome.downloads.download({url:_url,saveAs:true},
					function(id){
						if(!id){
							_notif?sub.showNotif("basic",sub.getI18n("notif_title"),sub.getI18n("notif_con_dnimgerr")):null;
						}else{
							_notif?sub.showNotif("basic",sub.getI18n("notif_title"),sub.getI18n("notif_con_dnimg")):null;
						}
				})				
			}
			var thepers=["downloads"/*,"downloads.shelf"*/];
			var theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		copyimgurl:function(){
			if(!sub.message.selEle.img){return;}
			var theFunction=function(){
				var clipOBJ=document.body.appendChild(document.createElement("textarea"));
				clipOBJ.value=sub.message.selEle.img;
				clipOBJ.select();
				document.execCommand('copy', false, null);
				clipOBJ.remove();
			}

			var thepers=["clipboardRead"];
			var theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		copyimg:function(){
			if(!sub.message.selEle.img){return;}
			let theFunction=function(){
				fetch(sub.message.selEle.img)
				.then(response => response.arrayBuffer())
				.then(buffer => chrome.clipboard.setImageData(buffer,(sub.message.selEle.img.substr(sub.message.selEle.img.length-4)==".jpg"?"jpeg":"png")))
			}

			let thepers=["clipboardRead"],theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		imgsearch:function(){
			if(!sub.message.selEle.img){return;}
			var engine,theURL,enCoding,enURL;
			var _optype=sub.getConfValue("selects","n_optype"),
				_position=sub.getIndex(sub.getConfValue("selects","n_position"),"new")[0] ,
				_pin=sub.getConfValue("checks","n_pin"),
				_code=sub.getConfValue("selects","n_encoding"),
				_url=sub.getConfValue("selects","n_imgengine");

			switch(_code){
				case"s_unicode":
					enURL=escape(sub.message.selEle.img);
					break;
				case"s_uri":
					enURL=encodeURI(sub.message.selEle.img);
					break;
				case"s_uric":
					enURL=encodeURIComponent(sub.message.selEle.img);
					break;
				default:
					enURL=sub.message.selEle.img;
					break;
			}
			_url=config.general.engine.imgengine[_url].content;
			_url=_url.replace(/%s/g,enURL);
			sub.open(_url,_optype,_position,_pin);
		},
		crpages:function(){
			var theURL="",
				theTarget=sub.getConfValue("selects","n_optype"),
				_url=sub.getConfValue("selects","n_crpages"),
				theIndex=sub.getIndex(sub.getConfValue("selects","n_position"),"new")[0],
				thePin=sub.getConfValue("checks","n_pin");
			switch(_url){
				case"s_cr_set":
					theURL="chrome://settings";
					break;
				case"s_cr_ext":
					theURL="chrome://extensions";
					break;
				case"s_cr_history":
					theURL="chrome://history";
					break;
				case"s_cr_app":
					theURL="chrome://apps";
					break;
				case"s_cr_bookmark":
					theURL="chrome://bookmarks";
					break;
				case"s_cr_dl":
					theURL="chrome://downloads";
					break;
				case"s_cr_flag":
					theURL="chrome://flags";
					break;
			}
			sub.open(theURL,theTarget,theIndex,thePin);	
		},
		restart:function(){
			chrome.tabs.create({url:"chrome://restart/",active:false})
		},
		exit:function(){
			chrome.tabs.create({url:"chrome://quit/",active:false})
		},
		optionspage:function(){
			var theTarget="s_new",
				//theURL="chrome-extension://"+chrome.runtime.id+"/html/options.html",
				theURL=chrome.runtime.getURL("/html/options.html");
				theIndex=false,
				thePin=false;
			sub.open(theURL,theTarget,theIndex,thePin);
		},
		reloadext:function(){
			chrome.runtime.reload();
		},
		dldir:function(){
			var theFunction=function(){
				chrome.downloads.showDefaultFolder();
			}
			var thepers=["downloads"];
			var theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		capture:function(){
			chrome.tabs.captureVisibleTab({format:"png"},function(dataURL){
				chrome.tabs.create({url:dataURL})
			})
		},
		bookmark:function(){
			var theFunction=function(){
				var ids=sub.getId(sub.getConfValue("selects","n_tab"));
				var _notif=sub.getConfValue("checks","n_notif"),
					_close=sub.getConfValue("checks","n_closetab");
				for(var i=0;i<ids.length;i++){
					chrome.tabs.get(ids[i],function(tab){
						chrome.bookmarks.search({url:tab.url},function(nodes){
							if(nodes.length){
								chrome.bookmarks.remove(nodes[0].id,function(){
									_notif?sub.showNotif("basic",sub.getI18n("notif_title"),sub.getI18n("notif_con_bkdel")):null;
									_close?chrome.tabs.remove(tab.id):null;
								});
							}else{
								chrome.bookmarks.create({url:tab.url,title:tab.title},function(bk){
									_notif?sub.showNotif("basic",sub.getI18n("notif_title"),sub.getI18n("notif_con_bkadd")):null;
									_close?chrome.tabs.remove(tab.id):null;
								});
							}
						})
					})
				}			
			}
			var thepers=["bookmarks"];
			var theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		script:function(){
			var _script=sub.getConfValue("selects","n_script");
			chrome.tabs.executeScript({code:config.general.script.script[_script].content,runAt:"document_start"},function(){})
		},
		source:function(){
			var theTarget=sub.getConfValue("selects","n_optype"),
				theURL="view-source:"+sub.curTab.url,
				theIndex=sub.getIndex(sub.getConfValue("selects","n_position"),"new")[0];
				thePin=sub.getConfValue("checks","n_pin");
			sub.open(theURL,theTarget,theIndex,thePin);
		},
		zoom:function(){
			if(!chrome.tabs.setZoom){
				sub.cons.zoom=sub.getConfValue("selects","n_zoom");
				chrome.tabs.executeScript({file:"js/inject/zoom.js",runAt:"document_start"},function(){})
			}else{
				switch(sub.theConf.selects[0].value){
					case"s_in":
						chrome.tabs.getZoom(function(zoom){
							zoom=Math.abs(zoom.toFixed(2));
							if(zoom==5){
								chrome.tabs.setZoom(1);
								return;
							}else{
								zoom=zoom==5?1:zoom;
								zoom=Math.abs((zoom>=1?(1+((zoom-1)?(zoom-1):.05)*2):(zoom+.15)).toFixed(2));
								zoom=zoom>5?5:zoom;
								chrome.tabs.setZoom(zoom);								
							}
						})
						break;
					case"s_out":
						chrome.tabs.getZoom(function(zoom){
							zoom=Math.abs(zoom.toFixed(2));
							if(zoom==.25){
								chrome.tabs.setZoom(1);
								return;	
							}else{
								if(zoom>2){
									zoom=Math.abs((zoom-((zoom-1)*.2)).toFixed(2));
								}else if(zoom>1){
									zoom=Math.abs((zoom-.45).toFixed(2));
								}else if(zoom<=1){
									zoom=Math.abs((zoom-.15).toFixed(2));
								}
								zoom=zoom<.25?.25:zoom;
								chrome.tabs.setZoom(zoom);								
							}
						})
						break;
					case"s_reset":
						chrome.tabs.setZoom(1.0)
						break;
				}	
			}
		},
		savepage:function(){
			var theFunction=function(){
				var ids=sub.getId(sub.getConfValue("selects","n_tab"));
				var _close=sub.getConfValue("checks","n_closetab"),
					_dlbar=sub.getConfValue("checks","n_dlbar"),
					_notif=sub.getConfValue("checks","n_notif");
				for(var i=0;i<ids.length;i++){
					chrome.tabs.get(ids[i],function(tab){
						chrome.pageCapture.saveAsMHTML({tabId:tab.id},function(data){
							var url = window.URL.createObjectURL(data);
							chrome.downloads.setShelfEnabled(_dlbar);
							chrome.downloads.download({url:url,filename:tab.title+".mhtml"},function(dlid){
								if(_close&&dlid){
									chrome.tabs.remove(tab.id);
								}
								if(_notif&&dlid){
									sub.showNotif("basic",sub.getI18n("notif_title"),sub.getI18n("notif_con_dlok"))
								}
							})
						})
					})
				}				
			}
			var thepers=["pageCapture","downloads"];
			var theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		mail:function(){
			var urls=[],titles=[];
			var _mail=sub.getConfValue("selects","n_mail"),
				_domain=sub.getConfValue("texts","n_mail_domain"),
				_prefix=sub.getConfValue("texts","n_mail_prefix"),
				_index=sub.getIndex(sub.getConfValue("selects","n_tab"));
			console.log(_index)
			var _sub=_prefix,
				_body="";
			for(var i=0;i<_index.length;i++){
				urls.push(sub.curWin.tabs[_index[i]].url);
				titles.push(sub.curWin.tabs[_index[i]].title);
			}
			titles.length==1?_sub+=titles[0]:_sub+=titles.length+" "+"pages";
			for(var i=0;i<titles.length;i++){
				_body+=titles[i]+" - "+encodeURIComponent(urls[i])+"        ";
			}

			if(_mail=="s_defaultmail"){
				chrome.tabs.update(sub.curTab.id,{url:"mailto:?subject="+_sub+'&body='+_body});
			}else{
				chrome.tabs.create({url:"https://mail.google.com"+(_mail=="s_gmailapps"?"/a/"+_domain:"")+"/mail/?view=cm&fs=1&tf=1&su="+_sub+'&body='+_body})
			}
		},
		print:function(){
			chrome.tabs.executeScript({code:"window.print()",runAt:"document_start"},function(){})
		},

		zoom_dep:function(){
			for(var i=0;i<(sub.theConf.selects?sub.theConf.selects.length:0);i++){
				if(sub.theConf.selects[i].type=="n_zoom"){
					sub.cons.zoom=sub.theConf.selects[i].value;
				}
			}
			chrome.tabs.executeScript({file:"js/inject/zoom.js",runAt:"document_start"},function(){})
		},
		mute:function(){
			var ids=[];
			var _mute=sub.getConfValue("selects","n_mute");
			if(_mute=="s_audible"){
				chrome.windows.getAll({populate:true},function(windows){
					for(var i=0;i<windows.length;i++){
						chrome.tabs.query({audible:true,windowId:windows[i].id},function(tabs){
							for(var i=0;i<tabs.length;i++){
								ids.push(tabs[i].id);
								var _audio=tabs[i].mutedInfo.muted?false:true;
								chrome.tabs.update(tabs[i].id,{muted:_audio});
							}
						})
					}
				})
			}else{
				ids=sub.getId(_mute);
				if(ids.length==1){
					chrome.tabs.get(ids[0],function(tab){
						_mute=tab.mutedInfo.muted?false:true;
						chrome.tabs.update(ids[0],{muted:_mute});
					})
				}else{
					chrome.windows.getCurrent({populate:true},function(window){
						for(var i=0;i<window.tabs.length/*&&ids.contains(window.tabs[i].id)*/;i++){
							if(!ids.contains(window.tabs[i].id)){continue;}
							_mute=window.tabs[i].mutedInfo.muted?false:true;
							chrome.tabs.update(window.tabs[i].id,{muted:_mute});
						}
					})
				}
			}

			//var ids=sub.getId(sub.getConfValue("selects","n_tab"));
			// if(ids.length==1){
			// 	chrome.tabs.get(ids[0],function(tab){
			// 		_mute=tab.mutedInfo.muted?false:true;
			// 		chrome.tabs.update(ids[0],{muted:_mute});
			// 	})
			// }else{
			// 	chrome.windows.getCurrent({populate:true},function(window){
			// 		for(var i=0;i<window.tabs.length/*&&ids.contains(window.tabs[i].id)*/;i++){
			// 			if(!ids.contains(window.tabs[i].id)){continue;}
			// 			_mute=window.tabs[i].mutedInfo.muted?false:true;
			// 			chrome.tabs.update(window.tabs[i].id,{muted:_mute});
			// 		}
			// 	})
			// }
		},
		snap:function(){
			// chrome.windows.update(sub.curWin.id,{state:(sub.curWin.state=="normal"?"maximized":"normal")},function(window){
			// 	sub.curWin.state=window.state;
			// })

			if(sub.cons.snapstate){
				chrome.windows.update(sub.curWin.id,{
					height:sub.cons.snapstate.height,
					width:sub.cons.snapstate.width,
					top:sub.cons.snapstate.top,
					left:sub.cons.snapstate.left,
					state:sub.cons.snapstate.winstate
				},function(){
					delete sub.cons.snapstate;
				})
				return;
			}

			var _snap=sub.getConfValue("selects","n_snap"),
				_height=screen.availHeight;
			var _width=screen.availWidth/2;
			chrome.windows.getCurrent(function(window){
				sub.cons.snapstate={
					snap:true,
					height:window.height,
					width:window.width,
					left:window.left,
					top:window.top,
					winstate:window.state
				}

				chrome.windows.update(window.id,{
					height:_height,
					width:_width,
					top:0,
					left:(_snap=="s_left"?0:_width)
				})
			})
		},
		set_bk:function(){
			let theFunction=function(){
				chrome.browserSettings.openBookmarksInNewTabs.get({}).then(function(result){
					if(result){
						console.log(result);
						chrome.browserSettings.openBookmarksInNewTabs.set({value:!result.value});
					}
				})
			}
			var thepers=["browserSettings"];
			var theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		set_search:function(){
			let theFunction=function(){
				chrome.browserSettings.openSearchResultsInNewTabs.get({}).then(function(result){
					if(result){
						console.log(result);
						chrome.browserSettings.openSearchResultsInNewTabs.set({value:!result.value});
					}
				})
			}
			var thepers=["browserSettings"];
			var theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		readermode:function(){
			if(sub.curTab.isArticle&&chrome.tabs.toggleReaderMode){
				chrome.tabs.toggleReaderMode();
			}
		},

		//mini apps

		pxmovie:function(){
			var _appname="pxmovie";
			sub.insertTest(_appname);
		},
		lottery:function(){
			var _appname="lottery";
			sub.insertTest(_appname);
		},
		speaker:function(){
			var theFunction=function(){
				var _appname="speaker";
				sub.initAppconf(_appname);
				var _obj={}
				chrome.tts.getVoices(function(voice){
					var _voicename=[];
					for(var i=0;i<voice.length;i++){
						if(voice[i].voiceName=="native"){
							_voicename.splice(0,0,voice[i].voiceName);
						}else{
							_voicename.push(voice[i].voiceName)
						}
					}
					_obj.voicename=_voicename;
					_obj.seltxt=sub.message.selEle?sub.message.selEle.txt:"";
					sub.cons[_appname]=_obj;
					sub.insertTest(_appname);
				})
			}
			theFunction();
			return;
			var thepers=["tts"];
			var theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		jslist:function(call_appslist){
			var _appname="jslist";
			sub.initAppconf(_appname);
			var _obj={};
			var jsnames=[];
			for(var i=0;i<config.general.script.script.length;i++){
				jsnames.push(config.general.script.script[i].name);
			}
			_obj.js=jsnames;
			sub.cons[_appname]=_obj;
			sub.insertTest(_appname);
		},
		tablist:function(call_appslist){
			var _appname="tablist";
			sub.initAppconf(_appname);
			var _obj={}
			chrome.tabs.query({currentWindow:true},function(tabs){
				_obj.list=tabs;
				_obj.curtab=sub.curTab;
				sub.cons[_appname]=_obj;
				sub.insertTest(_appname);
			})
		},
		recentbk:function(call_appslist){
			var theFunction=function(){
				var _appname="recentbk";
				sub.initAppconf(_appname);
				var _obj={}
				chrome.bookmarks.getRecent(parseInt(config.apps[_appname].n_num),function(bkArray){
					_obj.bk=bkArray;
					sub.cons[_appname]=_obj;
					sub.insertTest(_appname);	
				})
			}
			var thepers=["bookmarks"];
			var theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		recentht:function(call_appslist){
			var theFunction=function(){
				var _appname="recentht";
				sub.initAppconf(_appname);
				var _obj={}
				chrome.history.search({text:"",maxResults:parseInt(config.apps[_appname].n_num)},function(items){
					_obj.ht=items;
					sub.cons[_appname]=_obj;
					sub.insertTest(_appname);
				})
			}
			var thepers=["history"];
			var theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		recentclosed:function(call_appslist){
			var theFunction=function(){
				var _appname="recentclosed";
				sub.initAppconf(_appname);
				var _obj={}
				chrome.sessions.getRecentlyClosed({maxResults:parseInt(config.apps[_appname].n_num)},function(items){
					_obj.tabs=items;
					sub.cons[_appname]=_obj;
					sub.insertTest(_appname);
				})
			}
			var thepers=["sessions"];
			var theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		synced:function(){
			var theFunction=function(){
				var _appname="synced";
				sub.initAppconf(_appname);
				var _obj={};
					_obj.sync=[];
				chrome.sessions.getDevices(function(items){
					_obj.sync=items;
					sub.cons[_appname]=_obj;
					sub.insertTest(_appname);
				})
			}
			var thepers=["sessions"];
			var theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		appslist:function(){
			var _appname="appslist";
			sub.initAppconf(_appname);
			var _obj={}
			_obj.apps=["rss","tablist","random","extmgm","recentbk","recentht","recentclosed","synced","base64","qr","numc","speaker","jslist","lottery"];
			chrome.tabs.saveAsPDF?_obj.apps.push("savepdf"):null;
			sub.cons[_appname]=_obj;
			sub.insertTest(_appname);
		},
		base64:function(){
			var _appname="base64";
			sub.initAppconf(_appname);
			//var _obj={};
			//_obj.tabs=items;
			//sub.cons[_appname]=_obj;
			sub.insertTest(_appname);
		},
		qr:function(){
			console.log(sub.message.selEle)
			var _appname="qr";
			sub.initAppconf(_appname);
			var _obj={};
			_obj.seltxt=sub.message.selEle?sub.message.selEle.txt:"";
			_obj.sellnk=sub.message.selEle?sub.message.selEle.lnk:"";
			_obj.drawtype=sub.message.drawType;
			sub.cons[_appname]=_obj;
			sub.insertTest(_appname);
		},
		savepdf:function(){
			// chrome.tabs.saveAsPDF({});
			// return
			let _appname="savepdf";
			sub.insertTest(_appname);
		},
		numc:function(){
			var _appname="numc";
			sub.initAppconf(_appname);
			sub.insertTest(_appname);
		},
		random:function(){
			var _appname="random";
			sub.insertTest(_appname);
		},
		rss:function(){
			var _appname="rss";
			sub.initAppconf(_appname);
			var _obj={}
			sub.insertTest(_appname);
		},
		extmgm:function(){
			var theFunction=function(){
				var _appname="extmgm";
				sub.initAppconf(_appname);
				var _obj={};
					_obj.ext_enabled=[];
					_obj.ext_disabled=[];
				chrome.management.getAll(function(ext){
					for(var i=0;i<ext.length;i++){
						if(ext[i].type=="extension"){
							if(ext[i].enabled){
								if(ext[i].id!=sub.extID){_obj.ext_enabled.push(ext[i]);}
							}else{
								_obj.ext_disabled.push(ext[i]);
							}
						}
					}
					sub.cons[_appname]=_obj;
					sub.insertTest(_appname);	
				})
			}
			var thepers=["management"];
			var theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		dllink:function(){
			let theFunction=function(){
				var _url=sub.message.selEle.lnk,
					_dialog=sub.getConfValue("checks","n_dialog");
				chrome.downloads.download({url:_url,saveAs:_dialog},function(id){
					if(!id){
						_notif?sub.showNotif("basic",sub.getI18n("notif_title"),sub.getI18n("notif_dlok")):null;
					}else{
						_notif?sub.showNotif("basic",sub.getI18n("notif_title"),sub.getI18n("notif_dlerr")):null;
					}
				})
			}
			let thepers=["downloads"];
			let theorgs;
			sub.checkPermission(thepers,theorgs,theFunction);
		},
		apps_saveconf:function(message,sendResponse){
			//console.log(message)
			config.apps[message.apptype]=message.config;
			sub.saveConf();
			(!config.general.settings.appnotif)?null:sub.showNotif("basic",sub.getI18n("notif_title_appsave"),sub.getI18n("notif_con_appsave"));
		}
	},
	open:function(url,target,position,pin,flag){
		chrome.windows.getAll(function(windows){console.log(windows.length)})
		console.log("url:"+url+"\ntarget:"+target+"\nindex:"+position+"\npin:"+pin);
		var fixURL=function(url){
			//if()
			var fixstrs=["http://","https://","ftp://","chrome://","chrome-extension://","view-source:chrome-extension://","view-source:","moz-extension://","ms-browser-extension://","about:"];
			var theFlag=false;
			for(var i=0;i<fixstrs.length;i++){
				if(url.indexOf(fixstrs[i])==0){
					theFlag=true;
					break;
				}
			}
			if(!theFlag){
				return "http://"+url;
			}else{
				return url;
			}
		}
		//if(!url){return;}
		if(!url){
			if(flag=="newtab"){}else{return;}
		}else{
			url=fixURL(url)
		}
		//if(!url){/*return;*/}else{url=fixURL(url)}
		var theTarget=target,
			theURL=url,
			thePos=position,
			thePin=pin;
		if(theTarget=="s_current"){
			chrome.tabs.update({url:theURL,pinned:thePin});
			return;
		}else if(theTarget=="s_win"){
			//fix fx unsupport focused
			var _obj=browserType=="fx"?{url:theURL}:{url:theURL,focused:true};
			chrome.windows.create(_obj,function(window){
				console.log(thePin)
				chrome.tabs.update(window.tabs[0].id,{pinned:thePin});
			})
			return
		}else if(theTarget=="s_winback"){
			//fix fx unsupport focused
			var _obj=browserType=="fx"?{url:theURL}:{url:theURL,focused:true};
			chrome.windows.create(_obj,function(window){
				chrome.tabs.update(window.tabs[0].id,{pinned:thePin});
			})
			return
		}else if(theTarget=="s_incog"){
			chrome.windows.getAll(function(windows){
				var _flag=false;
				for(var i=0;i<windows.length;i++){
					if(windows[i].incognito/*||i==windows.length-1*/){
						_flag=windows[i].id;
						break;
					}
				}
				if(_flag===0||_flag){
					chrome.windows.update(_flag,{focused:true});
					chrome.tabs.create({windowId:_flag,url:theURL,active:theTarget=="s_back"?false:true,index:thePos,pinned:thePin})
				}else{
					chrome.windows.create({url:theURL,incognito:true},function(window){
						chrome.tabs.update(window.tabs[0].id,{pinned:thePin});
					})
				}
			})
			return;
		}
		let createProperties={};
			createProperties={
				active:theTarget=="s_back"?false:true,
				pinned:thePin,
				index:thePos,
				url:theURL
			}
		if(!theURL){delete createProperties.url}
		if(!(thePos||thePos===0)){delete createProperties.index}
		chrome.tabs.create(createProperties);

		//(thePos||thePos===0)?chrome.tabs.create({url:theURL,active:theTarget=="s_back"?false:true,index:thePos,pinned:thePin}):chrome.tabs.create({url:theURL,active:theTarget=="s_back"?false:true,pinned:thePin})
	},
	initpers:function(){
		if(!chrome.permissions){console.log("chrome.permissions cant work.");return;}
		sub.cons.permissions=null;
		sub.cons.origins=null;
		chrome.permissions.contains({permissions:["clipboardWrite"]},function(result){
			sub.cons.per_write=result;
		})
		chrome.permissions.getAll(function(pers){
			sub.cons.permissions=pers.permissions;
			sub.cons.origins=pers.origins;
		});
	},
	saveConf:function(noInit){
		console.log("save");
		console.log(config);
		let _isSync;
		if(config.general.sync.autosync&&chrome.storage.sync){
			_isSync=true;
		}else{
			_isSync=false;
		}
		_isSync?localStorage.setItem("sync","true"):localStorage.setItem("sync","false");
		if(_isSync){
			chrome.storage.sync.clear(function(){
				chrome.storage.sync.set(config,function(){
					loadConfig(noInit);
					//sub.init();
				})
			})
		}else{
			chrome.storage.local.get(function(items){
				let _obj={};
					_obj.config=config;
					_obj.localConfig=items.localConfig;
				chrome.storage.local.clear(function(){
					chrome.storage.local.set(_obj,function(){
						loadConfig(noInit);
						//sub.init();
					})
				})
			})
		}
		//_isSync?localStorage.setItem("sync","true"):localStorage.setItem("sync","false");
	},
	reset:function(){

	},
	setBackup:function(ver){
		console.log(ver);
		var dbname="backup";
		var request = indexedDB.open(dbname, 1);
		request.onupgradeneeded = function(e){
		    db = e.target.result;
		    db.createObjectStore("config",{keyPath:"id"})
		};
		request.onsuccess=function(e){
		    db=e.target.result;
		    var dbobj=db.transaction(["config"], "readwrite").objectStore("config");
		    var dbadd=dbobj.put({config:config,id:config.version});
		    dbadd.onsuccess=function(e){
		    	sub.upgrade["_"+ver](ver!=defaultConf.version?true:false);	
		    }
		}
	},
	getBackup:function(id,saveas){
		var dbname="backup";
		var request = indexedDB.open(dbname, 1);
		request.onsuccess=function(e){
		    db=e.target.result;
		    var dbobj=db.transaction(["config"], "readwrite").objectStore("config");
		    var dbget=dbobj.get(id);
            dbget.onsuccess=function(e){
            	if(e.target.result){
            		_conf=e.target.result.config;
					console.log(_conf);
					if(saveas){
						saveAs();
					}
            	}
            }
		}
	},
	upgrade:{
		up:function(){
			console.log("upgrade_up")
			if(!(config.version<defaultConf.version)){return;}
			if(config.version<1.1){
				sub.upgrade.f1to1_1();
			}
			else if(config.version<1.3){
				sub.upgrade.f1_1to1_3();
			}
			else if(config.version<1.4){
				sub.upgrade.f1_3to1_4();
			}
			else if(config.version<1.5){
				sub.upgrade.f1_4to1_5();
			}
			else if(config.version<1.6){
				sub.upgrade.f1_5to1_6();
			}
			else if(config.version<2){
				sub.upgrade.f1_6to2_0();
			}
			else if(config.version<2.2){
				sub.upgrade.f2_0to2_2();
			}
			else if(config.version<2.3){
				sub.upgrade.f2_2to2_3();
			}
			else if(config.version<2.4){
				sub.upgrade.f2_3to2_4();
			}
			else if(config.version<2.41){
				sub.upgrade.f2_4to2_41();
			}
			else if(config.version<2.5){
				sub.upgrade.f2_41to2_5();
			}
			else if(config.version<2.6){
				sub.upgrade.f2_5to2_6();
			}
			else if(config.version<2.7){
				sub.upgrade.f2_6to2_7();
			}
			else if(config.version<2.8){
				sub.upgrade.f2_7to2_8();
			}
			else if(config.version<2.9){
				console.log("29")
				sub.upgrade.f2_8to2_9();
			}

			else if(config.version<30){
				console.log("30")
				sub.upgrade.f29tof30();
			}
			else if(config.version<31){
				sub.setBackup("31");
			}
			else if(config.version<32){
				sub.setBackup("32");
			}
			else if(config.version<33){
				sub.setBackup("33");
			}
			else if(config.version<34){
				sub.setBackup("34");
			}
			else if(config.version<35){
				sub.setBackup("35");
			}
			else if(config.version<36){
				sub.setBackup("36");
			}
			else if(config.version<37){
				sub.setBackup("37");
			}
			else if(config.version<38){
				sub.setBackup("38");
			}
			else if(config.version<39){
				sub.setBackup("39");
			}
			else if(config.version<40){
				sub.setBackup("40");
			}
			else if(config.version<41){
				sub.setBackup("41");
			}
			else if(config.version<42){
				sub.setBackup("42");
			}
			else if(config.version<43){
				sub.setBackup("43");
			}
			else if(config.version<44){
				sub.setBackup("44");
			}
			else if(config.version<45){
				sub.setBackup("45")
			}
		},
		_45:function(){
			config.touch={};
			config.touch=defaultConf.touch;
			config.version=45;
			sub.saveConf(true);
		},
		_44:function(){
			let _type=["mges","wges","rges","pop","icon","ctm"],i=0,ii=0;
			for(i=0;i<_type.length;i++){
				for(ii=0;ii<config[_type[i]].actions.length;ii++){
					if(config[_type[i]].actions[ii].name=="close"){
						if(!config[_type[i]].actions[ii].checks){
							config[_type[i]].actions[ii].checks=[];
						}
						config[_type[i]].actions[ii].checks.push({type:"n_closePin",value:false});
						config[_type[i]].actions[ii].checks.push({type:"n_closeConfirm",value:false})
					}
				}
			}
			config.version=44;
			sub.saveConf(true);	
		},
		_43:function(){
			config.general.settings.timeoutvalue=config.general.settings.timeoutvalue*1000;
			let _array=["allaction","direct","line","note","tip"];
			let _type=["mges","drg"];
			for(var i=0;i<_type.length;i++){
				for(var ii=0;ii<_array.length;ii++){
					if(config[_type[i]].ui[_array[ii]]&&config[_type[i]].ui[_array[ii]].opacity){
						config[_type[i]].ui[_array[ii]].opacity=config[_type[i]].ui[_array[ii]].opacity*100;
					}
				}
			}

			config.version=43;
			sub.saveConf(true);
		},
		_42:function(){
			if(config.drg.settings.draggable===undefined){
				config.drg.settings.draggable=true;
			}
			if(config.sdrg.settings.draggable===undefined){
				config.sdrg.settings.draggable=true;
			}
			config.version=42;
			sub.saveConf(true);
		},
		_41:function(){
			config.version=41;
			sub.saveConf(true);
		},
		_40:function(){
			var _obj=[config.mges.actions,config.pop.actions,config.icon.actions,config.ctm.actions];
			for(var j=0;j<_obj.length;j++){
				for(var i=0;i<_obj[j].length;i++){
					if(_obj[j][i].name=="openclip"){
						_obj[j][i].selects.push({type:"n_position",value:"s_default"})
					}
					if(_obj[j][i].name=="duplicate"){
						_obj[j][i].selects=[{type:"n_tab",value:"s_current"}]
					}
					if(_obj[j][i].tip){
						delete _obj[j][i].tip;
					}
				}			
			}
			if(config.wges.settings){delete config.wges.settings}
			if(config.rges.settings){delete config.rges.settings}
			config.version=40;
			sub.saveConf(true);
		},
		_39:function(){
			config.drg.settings.drgtobox=true;
			config.sdrg.settings.drgtobox=true;
			config.version=39;
			sub.saveConf(true);
		},
		_38:function(){
			if(config.mges.settings.model!=2){
				config.mges.settings.model=4;
			}
			if(!config.apps){
				config.apps={appslist:{n_closebox:true}};
			}

			config.version=38;
			sub.saveConf(true);
		},
		_37:function(){
			config.mges.actions=config.mges.mges;
			delete config.mges.mges;

			config.pop=defaultConf.pop;
			config.icon=defaultConf.icon;
			config.ctm=defaultConf.ctm;
			delete config.general.settings.icon;

			config.version=37;
			sub.saveConf(true);
		},
		_36:function(){
			if(config.apps){
				if(config.apps.rss){
					config.apps.rss.n_pin=(config.apps.rss.n_pin=="s_unpin")?false:true;
				}
				if(config.apps.recentht){
					config.apps.recentht.n_pin=(config.apps.recentht.n_pin=="s_unpin")?false:true;
				}
				if(config.apps.recentbk){
					config.apps.recentbk.n_pin=(config.apps.recentbk.n_pin=="s_unpin")?false:true;
				}				
			}

			config.version=36;
			sub.saveConf(true);
		},
		_35:function(){
			config.rges=defaultConf.rges;
			config.wges=defaultConf.wges;

			config.version=35;
			sub.saveConf(true);
		},
		_34:function(){
			config.general.sync.autosync=true;
			localStorage.setItem("first","true");
			chrome.storage.local.get(function(items){
				if(items&items.apps){
					items.local={};
					items.local.apps=items.apps;
					delete items.apps;
				}
			})

			for(var i=0;i<config.mges.mges.length;i++){
				if(config.mges.mges[i].name=="newtab"){
					for(var ii=0;ii<config.mges.mges[i].selects.length;ii++){
						if(config.mges.mges[i].selects[ii].type=="n_optype"){
							config.mges.mges[i].selects[ii].value="s_new";
						}
					}
				}
			}

			config.version=34;
			sub.saveConf(true);
		},
		_33:function(){
			config.general.sync.autosync=true;
			localStorage.setItem("first","true");
			chrome.storage.local.get(function(items){
				if(items&items.apps){
					items.local={};
					items.local.apps=items.apps;
					delete items.apps;
				}
			})

			config.version=33;
			sub.saveConf(true);
		},
		_32:function(){
			console.log("32");
			var acname0=["mges","drg","sdrg"],
				acname1=["mges","tdrg","ldrg","idrg","tsdrg","lsdrg","isdrg"];
			// var _fn=function(types){
			// 	for(var j=0;j<_obj.selects.length;j++){
			// 		if(types.contains(_obj.selects[j].type)){
			// 			_obj.checks.push({type:_obj.selects[j].type,value:(_obj.selects[j].value=="s_yes"?true:false)});
			// 		}
			// 	}
			// }
			for(var i=0;i<acname0.length;i++){
				for(var ii=0;ii<acname1.length;ii++){
					for(var iii=0;config[acname0[i]][acname1[ii]]&&iii<config[acname0[i]][acname1[ii]].length;iii++){
						var _obj=config[acname0[i]][acname1[ii]][iii];
						!_obj.checks?_obj.checks=[]:null;
						!_obj.selects?_obj.selects=[]:null;
						if(_obj.name=="saveimg"||_obj.name=="saveimgas"){
							for(var j=0;_obj.selects&&j<_obj.selects.length;j++){
								if(["n_notif","n_dlbar"].contains(_obj.selects[j].type)){
									_obj.checks.push({type:_obj.selects[j].type,value:(_obj.selects[j].value=="s_yes"?true:false)});
									_obj.selects.splice(j,1);
								}
							}
						}else if(_obj.name=="bookmarklnk"){
							for(var j=0;_obj.selects&&j<_obj.selects.length;j++){
								if(["n_notif"].contains(_obj.selects[j].type)){
									_obj.checks.push({type:_obj.selects[j].type,value:(_obj.selects[j].value=="s_yes"?true:false)});
									_obj.selects.splice(j,1);
									
								}
							}
						}else if(_obj.name=="savepage"){
							_obj.checks=[];
							_obj.checks.push({type:"n_closetab",value:false});
							_obj.checks.push({type:"n_notif",value:false});
							_obj.checks.push({type:"n_dlbar",value:true});
						}else if(_obj.name=="bookmark"){
							_obj.checks=[];
							_obj.checks.push({type:"n_notif",value:false});
							_obj.checks.push({type:"n_closetab",value:false});
						}else if(_obj.name=="newwin"){
							for(var j=0;_obj.selects&&j<_obj.selects.length;j++){
								if(["n_winincog"].contains(_obj.selects[j].type)){
									_obj.checks.push({type:_obj.selects[j].type,value:(_obj.selects[j].value=="s_yes"?true:false)});
									_obj.selects.splice(j,1);
									
								}
							}
						}else if(_obj.name=="reload"){
							for(var j=0;_obj.selects&&j<_obj.selects.length;j++){
								if(["n_reload_clear"].contains(_obj.selects[j].type)){
									_obj.checks.push({type:_obj.selects[j].type,value:(_obj.selects[j].value=="s_yes"?true:false)});
									_obj.selects.splice(j,1);
									
								}
							}
						}else if(_obj.name=="script"){
							for(var j=0;_obj.selects&&j<_obj.selects.length;j++){
								if(["n_jq"].contains(_obj.selects[j].type)){
									_obj.checks.push({type:_obj.selects[j].type,value:(_obj.selects[j].value=="s_yes"?true:false)});
									_obj.selects.splice(j,1);
									
								}
							}
						}else if(["next","previous","newtab","open","openclip","txtsearch","openlnk","openimg","imgsearch","crpages","source",""].contains(_obj.name)){
							for(var j=0;_obj.selects&&j<_obj.selects.length;j++){
								if(["n_pin"].contains(_obj.selects[j].type)){
									_obj.checks.push({type:_obj.selects[j].type,value:(_obj.selects[j].value=="s_pin"?true:false)});
									_obj.selects.splice(j,1);
									
								}
							}
						}else if(_obj.name=="scroll"){
							for(var j=0;_obj.selects&&j<_obj.selects.length;j++){
								if(["n_effect"].contains(_obj.selects[j].type)){
									_obj.checks.push({type:_obj.selects[j].type,value:(_obj.selects[j].value=="s_on"?true:false)});
									_obj.selects.splice(j,1);
									
								}
							}
						}else if(_obj.name=="pin"){
							_obj.selects=[];
							_obj.selects.push({type:"n_tab",value:"s_current"});
						}
						_obj.checks.length==0?delete _obj.checks:null;
						_obj.selects.length==0?delete _obj.selects:null;
					}
				}
			}
			if(!config.apps){

			}else{
				if(config.apps.rss){
					config.apps.rss.n_pin=config.apps.rss.n_pin=="s_pin"?true:false;
				}
				if(config.apps.recentht){
					config.apps.recentht.n_pin=config.apps.recentht.n_pin=="s_pin"?true:false;
				}
				if(config.apps.recentbk){
					config.apps.recentbk.n_pin=config.apps.recentbk.n_pin=="s_pin"?true:false;
				}
			}
			config.version=32;
			sub.saveConf(true);
		},
		_31:function(){
			console.log("31");
			var _drgtype0=["drg","sdrg"]
			var _drgtype=["tdrg","ldrg","idrg","tsdrg","lsdrg","isdrg"];
			var _erraction=["txtsearch","openlnk","openimg","imgsearch"];
			var _des=["Search texts in background","Open link in background","Open image in background"];
			for(var i=0;i<_drgtype0.length;i++){
				for(var ii=0;ii<_drgtype.length;ii++){
					for(var iii=0;config[_drgtype0[i]][_drgtype[ii]]&&iii<config[_drgtype0[i]][_drgtype[ii]].length;iii++){
						if(_erraction.contains(config[_drgtype0[i]][_drgtype[ii]][iii].name)&&_des.contains((config[_drgtype0[i]][_drgtype[ii]][iii].mydes?config[_drgtype0[i]][_drgtype[ii]][iii].mydes.value:null))){
							for(var j=0;j<config[_drgtype0[i]][_drgtype[ii]][iii].selects.length;j++){
								if(config[_drgtype0[i]][_drgtype[ii]][iii].selects[j].type=="n_optype"){
									config[_drgtype0[i]][_drgtype[ii]][iii].selects[j].value="s_back";
								}
							}
						}	
					}
				}
			}
			for(var i=0;i<config.mges.mges.length;i++){
				if(config.mges.mges[i].name=="newtab"){
					for(var ii=0;config.mges.mges[i].selects&&ii<config.mges.mges[i].selects.length;ii++){
						if(config.mges.mges[i].selects[ii].type=="n_optype"&&config.mges.mges[i].selects[ii].value=="new"){
							config.mges.mges[i].selects[ii].value="s_new";
						}
					}
				}
			}
			config.version=31;
			sub.saveConf(true);
		},
		f1to1_1:function(){
			console.log("1 to 1.1");
			for(var i=0;i<config.mges.mges.length;i++){
				if(config.mges.mges[i].name=="test"){
					config.mges.mges.splice(i,1);
					break;
				}
			}
			for(var i=0;i<config.mges.mges.length;i++){
				// if(config.mges.mges[i].name=="test"){
				// 	config.mges.mges.splice(i,1);
				// }
				if(config.mges.mges[i].name=="txtsearch"||config.mges.mges[i].name=="imgsearch"){
					config.mges.mges[i].selects.push({type:"n_encoding",value:"s_uri"});
				}
				for(var ii=0;config.mges.mges[i].selects&&ii<config.mges.mges[i].selects.length;ii++){
					if(config.mges.mges[i].selects[ii].type.indexOf("s_")==0){
						config.mges.mges[i].selects[ii].type=config.mges.mges[i].selects[ii].type.replace("s_","n_")
					}
					if(config.mges.mges[i].selects[ii].type=="txtengine"||config.mges.mges[i].selects[ii].type=="imgengine"){
						config.mges.mges[i].selects[ii].type="n_"+config.mges.mges[i].selects[ii].type;
					}
				}
			}
			var arraydrg=["tdrg","ldrg","idrg"];
			for(var i=0;i<3;i++){
				for(var ii=0;ii<config.drg[arraydrg[i]].length;ii++){
					if(config.drg[arraydrg[i]][ii].name=="txtsearch"
						||config.drg[arraydrg[i]][ii].name=="imgsearch"){
						config.drg[arraydrg[i]][ii].selects.push({type:"n_encoding",value:"s_uri"});
					}
					for(var iii=0;config.drg[arraydrg[i]][ii].selects&&iii<config.drg[arraydrg[i]][ii].selects.length;iii++){
						if(config.drg[arraydrg[i]][ii].selects[iii].type.indexOf("s_")==0){
							config.drg[arraydrg[i]][ii].selects[iii].type=config.drg[arraydrg[i]][ii].selects[iii].type.replace("s_","n_")
						}
						if(config.drg[arraydrg[i]][ii].selects[iii].type=="txtengine"||config.drg[arraydrg[i]][ii].selects[iii].type=="imgengine"){
							config.drg[arraydrg[i]][ii].selects[iii].type="n_"+config.drg[arraydrg[i]][ii].selects[iii].type;
						}
					}
				}
			}
			var arraydrg=["tsdrg","lsdrg","isdrg"];
			for(var i=0;i<3;i++){
				for(var ii=0;ii<config.sdrg[arraydrg[i]].length;ii++){
					if(config.sdrg[arraydrg[i]][ii].name=="txtsearch"
						||config.sdrg[arraydrg[i]][ii].name=="imgsearch"){
						config.sdrg[arraydrg[i]][ii].selects.push({type:"n_encoding",value:"s_uri"});
					}
					for(var iii=0;config.sdrg[arraydrg[i]][ii].selects&&iii<config.sdrg[arraydrg[i]][ii].selects.length;iii++){
						if(config.sdrg[arraydrg[i]][ii].selects[iii].type.indexOf("s_")==0){
							config.sdrg[arraydrg[i]][ii].selects[iii].type=config.sdrg[arraydrg[i]][ii].selects[iii].type.replace("s_","n_")
						}
						if(config.sdrg[arraydrg[i]][ii].selects[iii].type=="txtengine"||config.sdrg[arraydrg[i]][ii].selects[iii].type=="imgengine"){
							config.sdrg[arraydrg[i]][ii].selects[iii].type="n_"+config.sdrg[arraydrg[i]][ii].selects[iii].type;
						}
					}
				}
			}
			config.version=1.1;
			sub.saveConf(true);
		},
		f1_1to1_3:function(){
			console.log("1.1 to 1.2")
			var en=["txtengine","imgengine"];
			for(var i=0;i<en.length;i++){
				for(var ii=0;ii<config.general.engine[en[i]].length;ii++){
					if(!config.general.engine[en[i]][ii]){
						config.general.engine[en[i]].splice(ii,1);
					}
				}
			}
			config.version=1.3;
			sub.saveConf(true);
		},
		f1_3to1_4:function(){
			console.log("1.3 to 1.4");
			config.general.settings.notif=false;
			for(var i=0;i<config.mges.mges.length;i++){
				if(["up","down","top","bottom"].contains(config.mges.mges[i].name)){
					config.mges.mges[i].selects.push({type:"n_scroll",value:"s_"+config.mges.mges[i].name});
					config.mges.mges[i].name="scroll";
				}
			}
			config.version=1.4;
			sub.saveConf(true);
		},
		f1_4to1_5:function(){
			for(var i=0;i<config.mges.mges.length;i++){
				if(config.mges.mges[i].name=="scroll"&&!config.mges.mges[i].mydes.type){
					config.mges.mges[i].mydes.type=true;
					for(var ii=0;ii<config.mges.mges[i].selects.length;ii++){
						if(config.mges.mges[i].selects[ii].type=="n_scroll"){
							config.mges.mges[i].mydes.value=getDefault.i18n("init_scroll_"+config.mges.mges[i].selects[ii].value.substr(2))
						}
					}
				}
			}
			config.version=1.5;
			sub.saveConf(true);
		},
		f1_5to1_6:function(){
			config.general.settings.lang="lang_en";
			config.version=1.6;
			sub.saveConf(true);
		},
		f1_6to2_0:function(){
			config.plus={};
			config.plus.menuPin=false;
			if(config.general.engine.txtengine[0].url=="https://www.google.com/search?hl=zh-CN&q=%s"){
				config.general.engine.txtengine[0].url="https://www.google.com/search?q=%s";
			}
			config.version=2;
			sub.saveConf(true);
		},
		f2_0to2_2:function(){
			for(var i=0;i<config.mges.mges.length;i++){
				if(config.mges.mges[i].name=="close"){
					config.mges.mges[i].checks=[];
					config.mges.mges[i].checks[0]={type:"n_close_keep",value:false}
				}
				if(config.mges.mges[i].name=="recentbk"||config.mges.mges[i].name=="recentht"){
					config.mges.mges[i].selects=[];
					config.mges.mges[i].checks=[];
					config.mges.mges[i].selects=[
						{type:"n_target",value:"s_new"},
						{type:"n_new_position",value:"s_default"},
						{type:"n_pin",value:false}
					];
					config.mges.mges[i].checks[0]={type:"n_appwin_close",value:true}
				}
			}
			config.version=2.2;
			sub.saveConf(true);
		},
		f2_2to2_3:function(){
			for(var i=0;i<config.mges.mges.length;i++){
				if(config.mges.mges[i].name=="zoom1"){
					config.mges.mges[i].name="zoom";
				}
			}
			config.version=2.3;
			sub.saveConf(true);
		},
		f2_3to2_4:function(){
			for(var i=0;i<config.mges.mges.length;i++){
				var _flag=false,
					_obj=config.mges.mges[i];
				if(_obj.name=="recentbk"||_obj.name=="recentht"||_obj.name=="recentclosed"||_obj.name=="synced"){
					_flag=true;
				}else if(_obj.name=="rss"){
					if(!config.apps){config.apps={}}
					if(!config.apps.rss){config.apps.rss={}}
					if(!config.apps.rss.feed){config.apps.rss.feed=[]}
					if(!config.apps.rss.config){config.apps.rss.config={
						n_target:"s_back",
						n_index_new:"s_default",
						n_pin:"s_unpin",
						n_appwin_close:false						
					}}
					config.apps.rss.feed.push(_obj.texts[0].value);
					_flag=true;
				}
				if(_flag){
					config.mges.mges[i]={}
					config.mges.mges[i]={
						name:_obj.name,
						direct:_obj.direct,
						mydes:_obj.mydes,
						texts:[],
						checks:[],
						selects:[]
					}					
				}
			}
			delete config.plus.menuPin;
			config.version=2.41;
			sub.saveConf(true);
		},
		f2_4to2_41:function(){
			config.mges.mges=defaultConf.mges.mges;
			config.version=2.41;
			sub.saveConf(true);
			alert("Hi,I am so sorry.\nI made a mistake, smartUp's mouse gestures can't work. \nThe mouse gestures actions have been reseted!");
		},
		f2_41to2_5:function(){
			if(config.general.settings.boxzoom===undefined){
				config.general.settings.boxzoom=false;
			}
			config.version=2.5;
			sub.saveConf(true);
		},
		f2_5to2_6:function(){
			for(var i=0;i<config.general.engine.txtengine.length;i++){
				if(config.general.engine.txtengine[i].url=="http://image.baidu.com/i?objurl=%s"){
					config.general.engine.txtengine[i].url="http://www.baidu.com/s?wd=%s";
				}
			}
			config.version=2.6;
			sub.saveConf(true);
		},
		f2_6to2_7:function(){
			if(config.version==2.61){
				config.mges.ui.direct.width=defaultConf.mges.ui.direct.width;
				config.mges.ui.direct.style=defaultConf.mges.ui.direct.style;
				config.mges.ui.allaction=defaultConf.mges.ui.allaction;
				config.drg.ui.direct.width=defaultConf.drg.ui.direct.width;
				config.drg.ui.direct.style=defaultConf.drg.ui.direct.style;
				config.drg.ui.allaction=defaultConf.drg.ui.allaction;
			}else if(config.version==2.62){

			}else{
				config.mges.ui.note=defaultConf.mges.ui.note;
				config.mges.ui.tip.withdir=false;
				config.mges.ui.direct.width=defaultConf.mges.ui.direct.width;
				config.mges.ui.direct.style=defaultConf.mges.ui.direct.style;
				config.mges.ui.allaction=defaultConf.mges.ui.allaction;
				config.drg.ui.note=defaultConf.drg.ui.note;
				config.drg.ui.tip.withdir=true;
				config.drg.ui.direct.width=defaultConf.drg.ui.direct.width;
				config.drg.ui.direct.style=defaultConf.drg.ui.direct.style;
				config.drg.ui.allaction=defaultConf.drg.ui.allaction;		
			}
			config.version=2.7;
			sub.saveConf(true);
		},
		f2_7to2_8:function(){
			var obj=[config.mges.mges,config.drg.tdrg,config.drg.ldrg,config.drg.idrg,config.sdrg.tsdrg,config.sdrg.lsdrg,config.sdrg.isdrg];
			for(var ii=0;ii<obj.length;ii++){
				for(var i=0;i<obj[ii].length;i++){
					if(obj[ii][i].mydes&&!obj[ii][i].mydes.value){
						delete obj[ii][i].mydes;
					}
					if(obj[ii][i].note&&!obj[ii][i].note.value){
						delete obj[ii][i].note;
					}
					if(obj[ii][i].selects&&obj[ii][i].selects.length==0){
						delete obj[ii][i].selects;
					}
					if(obj[ii][i].texts&&obj[ii][i].texts.length==0){
						delete obj[ii][i].texts;
					}
					if(obj[ii][i].checks&&obj[ii][i].checks.length==0){
						delete obj[ii][i].checks;
					}
					if(obj[ii][i].ranges&&obj[ii][i].ranges.length==0){
						delete obj[ii][i].ranges;
					}

					if(obj[ii][i].type){delete obj[ii][i].type}
					if(obj[ii][i].tip){delete obj[ii][i].tip}
					if(obj[ii][i].name=="script"&&obj[ii][i].texts){
						delete obj[ii][i].texts;
					}
				}				
			}
			config.general.settings.theme="colorful";
			config.version=2.8;
			sub.saveConf(true);
		},
		f2_8to2_9:function(){
			config.apps?(delete config.apps):null;
			config.general.settings.boxzoom?delete config.general.settings.boxzoom:null;
			var _array=["n_reload","n_stop","n_target_np","n_new_position","n_close","n_target","n_switchtab","n_move","n_detach","n_copytabele_target","n_win_type","n_win_incog","n_bookmark","n_savepage","n_mail_target"];
			var _obj={
				n_reload:"n_tab",
				n_stop:"n_tab",
				n_target_np:"n_optype",
				n_new_position:"n_position",
				n_close:"n_tab",
				n_target:"n_optype",
				n_switchtab:"n_position",
				n_move:"n_position_lrhl",
				n_detach:"n_tab",
				n_copytabele_target:"n_tab_single",
				n_win_type:"n_wintype",
				n_win_incog:"n_winincog",
				n_bookmark:"n_tab",
				n_savepage:"n_tab",
				n_mail_target:"n_tab"
			}

			var _arrayobj=[config.sdrg.tsdrg,config.sdrg.isdrg,config.sdrg.lsdrg,config.drg.tdrg,config.drg.ldrg,config.drg.idrg,config.mges.mges];
			for(var i=0;i<_arrayobj.length;i++){
				for(var ii=0;ii<_arrayobj[i].length;ii++){
					for(var iii=0;_arrayobj[i][ii].selects&&iii<_arrayobj[i][ii].selects.length;iii++){
						if(_array.contains(_arrayobj[i][ii].selects[iii].type)){
							_arrayobj[i][ii].selects[iii].type=_obj[_arrayobj[i][ii].selects[iii].type];
						}
					}
				}
			}

			for(var i=0;i<config.mges.mges.length;i++){
				if(config.mges.mges[i].name=="switchtab"){
					config.mges.mges[i].selects[0].type="n_tab_lrhl";
				}
				if(config.mges.mges[i].name=="saveimg"){
					config.mges.mges[i].selects.push({type:"n_notif",value:"s_yes"})
				}
				if(config.mges.mges[i].name=="bookmark"){
					config.mges.mges[i].selects.push({type:"n_notif",value:"s_yes"})
				}
			}

			for(var i=0;i<config.general.script.script.length;i++){
				config.general.script.script[i].content=config.general.script.script[i].script;
				delete config.general.script.script[i].script;
			}
			for(var i=0;i<config.general.script.script.length;i++){
				delete config.general.script.script[i].script;
			}
			for(var i=0;i<config.general.engine.txtengine.length;i++){
				config.general.engine.txtengine[i].content=config.general.engine.txtengine[i].url;
			}
			for(var i=0;i<config.general.engine.txtengine.length;i++){
				delete config.general.engine.txtengine[i].url;
			}
			for(var i=0;i<config.general.engine.imgengine.length;i++){
				config.general.engine.imgengine[i].content=config.general.engine.imgengine[i].url;
			}
			for(var i=0;i<config.general.engine.imgengine.length;i++){
				delete config.general.engine.imgengine[i].url;
			}

			config.general.settings.appnotif=true;
			config.version=2.9;
			sub.saveConf(true);
		},
		f29tof30:function(){
			var _apps=["rss","tablist","random","extmgm","recentbk","recentht","recentclosed","synced","base64","qr","numc","speaker"];
			for(var i=0;i<_apps.length;i++){
				if(!config.apps){break;}
				if(config.apps[_apps[i]]&&config.apps[_apps[i]].config){
					if(typeof config.apps[_apps[i]].config=="object"){
						delete config.apps[_apps[i]];
					}
				}
			}

			for(var i=0;i<config.drg.idrg.length;i++){
				if(config.drg.idrg[i].name=="saveimg"){
					//config.drg.idrg[i].selects.push({type:"n_notif",value:"s_yes"})
					config.drg.idrg[i].selects?null:config.drg.idrg[i].selects=[];
					config.drg.idrg[i].selects.push({type:"n_notif",value:"s_yes"});
				}
			}
			for(var i=0;i<config.drg.ldrg.length;i++){
				if(config.drg.ldrg[i].name=="bookmark"){
					config.drg.ldrg[i].selects.push({type:"n_notif",value:"s_yes"})
				}
			}
			for(var i=0;i<config.sdrg.isdrg.length;i++){
				if(config.sdrg.isdrg[i].name=="saveimg"){
					config.sdrg.isdrg[i].selects?null:config.sdrg.isdrg[i].selects=[];
					config.sdrg.isdrg[i].selects.push({type:"n_notif",value:"s_yes"});
				}
			}
			for(var i=0;i<config.sdrg.lsdrg.length;i++){
				if(config.sdrg.lsdrg[i].name=="bookmark"){
					config.sdrg.lsdrg[i].selects.push({type:"n_notif",value:"s_yes"})
				}
			}

			var _drgtype0=["drg","sdrg"]
			var _drgtype=["tdrg","ldrg","idrg","tsdrg","lsdrg","isdrg"];
			var _erraction=["txtsearch","openlnk","openimg","imgsearch"];
			var _errobj={
				txtsearch:[{"type":"n_txtengine","value":"0"},{"type":"n_encoding","value":"s_none"},{"type":"n_optype","value":"s_current"},{"type":"n_position","value":"s_default"},{"type":"n_pin","value":"s_unpin"}],
				openlnk:[{"type":"n_optype","value":"s_current"},{"type":"n_position","value":"s_default"},{"type":"n_pin","value":"s_unpin"}],
				openimg:[{"type":"n_optype","value":"s_current"},{"type":"n_position","value":"s_default"},{"type":"n_pin","value":"s_unpin"}],
				imgsearch:[{"type":"n_imgengine","value":"0"},{"type":"n_encoding","value":"s_none"},{"type":"n_optype","value":"s_current"},{"type":"n_position","value":"s_default"},{"type":"n_pin","value":"s_unpin"}]
			}
			for(var i=0;i<_drgtype0.length;i++){
				for(var ii=0;ii<_drgtype.length;ii++){
					for(var iii=0;config[_drgtype0[i]][_drgtype[ii]]&&iii<config[_drgtype0[i]][_drgtype[ii]].length;iii++){
						if(_erraction.contains(config[_drgtype0[i]][_drgtype[ii]][iii].name)&&!config[_drgtype0[i]][_drgtype[ii]][iii].selects){
							config[_drgtype0[i]][_drgtype[ii]][iii].selects={}
							config[_drgtype0[i]][_drgtype[ii]][iii].selects=_errobj[config[_drgtype0[i]][_drgtype[ii]][iii].name]
						}	
					}
				}
			}

			config.mges.settings.txttourl=true;
			config.mges.settings.lnktoimg=false;
			config.version=30;
			sub.saveConf(true);
		}
	},
	funOnMessage:function(message,sender,sendResponse){
		console.log(message);
		console.log(sender);
		console.log(sendResponse);
		sub.message=message;
		let getConf=function(){
			let drawType=message.drawType,
				confType=config[drawType[0]][drawType[1]],
				direct=message.direct,
				theName="",
				theConf="";
			for(var i=0;i<confType.length;i++){
				if(confType[i].direct==direct){
					theName=confType[i].name;
					theConf=confType[i];
					break;
				}
				if(i==confType.length-1){
					theConf={name:null/*,mydes:null*/}
				}
			}
			return theConf;			
		}
		switch(message.type){
			case"evt_getconf":
			case"pop_getconf":
			case"opt_getconf":
				let _conf={
					type:message.type,
					defaultConf:defaultConf,
					config:config,
					devMode:devMode,
					os:sub.cons.os
				}
				sendResponse(_conf);
				break;
			case"opt_getpers":
				sub.checkPermission(message.value.thepers,message.value.theorgs,message.value.theFunction,message.value.msg);
				break;
			case"per_getconf":
				sendResponse(sub.cons.permissions);
				break;
			case"apps_saveconf":
				sub.action.apps_saveconf(message,sendResponse);
				break;
			case"apps_test":
				let _fun=function(){
					if(message.appjs){
						chrome.tabs.executeScript({code:"sue.apps['"+message.apptype+"'].initUI();",runAt:"document_start"});
						return;
					}
					if(message.apptype=="base64"){
						chrome.tabs.executeScript({file:"js/base64.js",runAt:"document_start"},function(){})
					}else if(message.apptype=="qr"){
						chrome.tabs.executeScript({file:"js/qrcode.js",runAt:"document_start"},function(){})
					}

					chrome.tabs.insertCSS({file:"css/inject/"+message.apptype+".css",runAt:"document_start"},function(){});
					chrome.tabs.executeScript({file:"js/inject/"+message.apptype+".js",runAt:"document_start"},function(){});
				}		
				if(!message.value){
					chrome.tabs.insertCSS({file:"css/apps_basic.css",runAt:"document_start"},function(){})
					chrome.tabs.executeScript({file:"js/apps_basic.js",runAt:"document_start"},function(){_fun();})
				}else{
					_fun();
				}
				sendResponse({value:true});
				break;
			case"getappconf":
				sendResponse(sub.cons[message.apptype]);
				break;
			case"apps_getvalue":
				sendResponse({type:message.apptype,config:config.apps[message.apptype],value:sub.cons[message.apptype]})
				break;
			case"action_np":
				sub.action.next();
				break;
			case"reloadconf":
				config=message.value;
				loadConfig();
				break;
			case"saveConf":
				config=message.value;
				sub.saveConf();
				break;
			case"per_clear":
				sub.cons.permissions={};
				break;
			case"getpers":
				sub.initpers();
				break;
			case"scroll":
				sendResponse({type:sub.cons.scroll.type,effect:sub.cons.scroll.effect});
				break;
			case"zoom":
				sendResponse({value:sub.cons.zoom});
				break;
			case"action_pop":
				let _index=message.index;
					/*theConf=config.pop.actions[_index]*/; //message.popvalue;
				sub.theConf=config.pop.actions[_index];
				if(config.pop.settings.type=="front"){
					chrome.tabs.query({active:true,currentWindow:true},function(tabs){
						sub.curTab=tabs[0];
						chrome.tabs.sendMessage(tabs[0].id,{type:"pop"},function(response){
							if(response&&response.type=="action_pop"){
								sub.message=response;
								sub.extID=chrome.runtime.id?chrome.runtime.id:null;
								sub.initCurrent(null,sub.theConf);
								console.log(sub.message)
							}
						});
					})
				}else{
					sub.initCurrent(sender,sub.theConf);
				}
				//set last as default
				if(_index!==0&&config.pop.settings.last){
					config.pop.actions[_index]=config.pop.actions[0];
					config.pop.actions[0]=sub.theConf;
					sub.saveConf();
				}
				break;
			case"action_rges":
				let rgesType=message.sendValue.buttons==1?0:1;
					/*theConf=config.rges.actions[rgesType]*/;
				sub.theConf=config.rges.actions[rgesType];
				sub.initCurrent(sender,sub.theConf);
				break;
			case"action_wges":
				let _id;
				if(message.sendValue.buttons==1){
					if(message.sendValue.wheelDelta<0){_id=0;}else{_id=1}
				}else if(message.sendValue.buttons==2){
					if(message.sendValue.wheelDelta<0){_id=2;}else(_id=3)
				}
				sub.theConf=config.wges.actions[_id];
				if(sub.theConf.name=="scroll"){//fix action scrollame});
					window.setTimeout(function(){
						sub.initCurrent(sender,sub.theConf);
					},200)
					return
				}
				sub.initCurrent(sender,sub.theConf)
				break;
			case"gettip":
				sub.theConf=getConf();
				let _sendConf={};
					_sendConf.config=sub.theConf;
					_sendConf.type="tip";
					_sendConf.tip=sub.theConf.name?(sub.theConf.mydes&&sub.theConf.mydes.type&&sub.theConf.mydes.value?sub.theConf.mydes.value:sub.getI18n(sub.theConf.name)):null;
					_sendConf.note=sub.theConf.note;
					_sendConf.allaction=[];
				//get all actions
				let _confType=config[message.drawType[0]][message.drawType[1]];
				if(config[sub.message.drawType[0]].ui.allaction.enable){
					for(let i=0;i<_confType.length;i++){
						if(_confType[i].direct.indexOf(message.direct)==0
							&&_confType[i].direct.length>message.direct.length){
							let _action={
								direct:_confType[i].direct,
								tip:(_confType[i].mydes&&_confType[i].mydes.type&&_confType[i].mydes.value)?_confType[i].mydes.value:sub.getI18n(_confType[i].name)
							}
							_sendConf.allaction.push(_action);
						}
						if(i==_confType.length-1&&_sendConf.allaction.length==0){
							_sendConf.allaction=null;
						}
					}
				}
				console.log(_sendConf)
				sendResponse(_sendConf);
				break;
			case"action":
				sub.theConf=getConf();
				sub.theConf.type="action";
				if(sub.theConf.name=="paste"){//for action paste
					if(sub.cons.permissions.contains("clipboardWrite")) {
						var clipOBJ=document.body.appendChild(document.createElement("textarea"));
						clipOBJ.focus();
						document.execCommand('paste', false, null);
						var clipData=clipOBJ.value;
						clipOBJ.remove();
						sub.theConf.paste=clipData;
						sub.theConf.typeAction="paste";
						sendResponse(sub.theConf);
				    }else {
				    	sub.checkPermission(["clipboardWrite"]);
				    }
				}else{
					sendResponse(sub.theConf);
				}
				sub.initCurrent(sender,sub.theConf);
				break
			case"getDonateData":
				sendResponse({type:"donateData",value:sub.cons.donateData})
				break;
			case"setDonateData":
				sub.cons.donateData=message.value;
				break;
			case"appsAction":
				sub.apps[message.app][message.action](message,sender,sendResponse);
				//sub.appsAction(message,sendResponse);
				break;
		}
	},
	appsAction:function(message,sendResponse){
		sub.apps[message.app][message.action](message,sendResponse);
	},
	apps:{
		rss:{
			getMessage:function(message,sender,sendResponse){
				console.log(message);
				url=message.value;
				fetch(url)
					.then(response => response.text())
					.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
					.then(xmlData=>{
						let data={};
						let replace_cdata=function(str){
							let newstr;
							newstr=str.indexOf("<![CDATA[")==0?str.replace("<![CDATA[",""):str;
							newstr=newstr.indexOf("]]>")==newstr.length-3?newstr.replace("]]>",""):newstr;
							return newstr;
						}
						data={
							title:replace_cdata(xmlData.querySelector("channel>title")?DOMPurify.sanitize(xmlData.querySelector("channel>title").textContent):"noname"),
							link:replace_cdata(xmlData.querySelector("channel>image>link")?DOMPurify.sanitize(xmlData.querySelector("channel>image>link").textContent):""),
							img:replace_cdata(xmlData.querySelector("channel>image>url")?DOMPurify.sanitize(xmlData.querySelector("channel>image>url").textContent):chrome.runtime.getURL("/image/rss.png"))
						}

						let items=xmlData.querySelectorAll("item");
						data.items=[];
						for(var i=0;i<items.length;i++){
							var _nodes=items[i].childNodes;
						    var _object={};
							for(var ii=0;ii<_nodes.length;ii++){
								if(_nodes[ii].tagName){
									_object[_nodes[ii].tagName.toLowerCase()]=DOMPurify.sanitize(replace_cdata(_nodes[ii].textContent));
								}
							}
							data.items.push(_object);
						}
						return data;
					})
					.then(data=>{
						console.log(data);
						chrome.tabs.sendMessage(sender.tab.id,{type:"rssData",value:data,feedURL:url});
					})
					.catch(err=>console.log(err))
			},
			openItem:function(message){
				let _URL=message.value,
					_Target=config.apps[message.app].n_optype,
					_Index=sub.getIndex(config.apps[message.app].n_position,"new")[0],
					_Pin=config.apps[message.app].n_pin;
				sub.open(_URL,_Target,_Index,_Pin);
			}
		},
		tablist:{
			tabClose:function(message){
				message.value?chrome.tabs.remove(Number(message.value)):null;			
			},
			tabSwitch:function(message){
				message.value?chrome.tabs.update(Number(message.value),{active:true}):null;
			}
		},
		jslist:{
			jsRun:function(message){
				chrome.tabs.executeScript({code:config.general.script.script[message.value].content,runAt:"document_start"})
			}
		},
		appslist:{
			openApp:function(message){
				sub.action[message.value]();
			}
		},
		recentbk:{
			openItem:function(message){
				let _URL=message.value,
					_Target=config.apps[message.app].n_optype,
					_Index=sub.getIndex(config.apps[message.app].n_position,"new")[0],
					_Pin=config.apps[message.app].n_pin;
				sub.open(_URL,_Target,_Index,_Pin);
			}
		},
		recentht:{
			openItem:function(message){
				let _URL=message.value,
					_Target=config.apps[message.app].n_optype,
					_Index=sub.getIndex(config.apps[message.app].n_position,"new")[0],
					_Pin=config.apps[message.app].n_pin;
				sub.open(_URL,_Target,_Index,_Pin);
			}
		},
		recentclosed:{
			openItem:function(message){
				chrome.sessions.restore(message.value);
			}
		},
		synced:{
			openItem:function(message){
				chrome.sessions.restore(message.value);
			}
		},
		speaker:{
			speak:function(message){
					switch(message.value.type){
						case"play":
							if(!message.value.txt){return;}
							var _conf=config.apps[message.app];
							var _text=message.value.txt;
							var _voice={};
							chrome.tts.getVoices(function(voices){
								for(var i=0;i<voices.length;i++){
									if(voices.voiceName==_conf.voicename){
										if(voices[i].gender){_voice.gender=_conf.n_gender.substr(2);}
										_voice.voiceName=voices[i].n_voicename;
										_voice.rate=_conf.n_rate;
										_voice.pitch=_conf.n_pitch;
										_voice.volume=_conf.n_volume;
										break;
									}
								}
								chrome.tts.speak(_text,_voice);
							})
							break;
						case"pause":
							chrome.tts.pause()
							break;
						case"resume":
							chrome.tts.resume()
							break;
						case"stop":
							chrome.tts.stop()
							break;
					}
			}
		},
		savepdf:{
			savePDF:function(message){
				console.log("s")
				chrome.tabs.saveAsPDF(message.value);
			}
		},
		extmgm:{
			action:function(message,sender,sendResponse){
				switch(message.value.actionType){
					case"enable":
					case"disable":
						chrome.management.setEnabled(message.value.id,message.value.actionType=="enable"?true:false,function(){});
						break;
					case"disableall":
						for(var i=0;i<sub.cons.extmgm.ext_enabled.length;i++){
							if(sub.cons.extmgm.ext_enabled[i].id==chrome.runtime.id){
								continue;
							}
							chrome.management.setEnabled(sub.cons.extmgm.ext_enabled[i].id,false);
						}
						break;
				}
				sendResponse({type:"extmgm",actionDone:true});
			}
		},
		lottery:{
			getData:function(message,sender,sendResponse){
				let urlOBJ={
					"lottery_dlt":"http://www.lottery.gov.cn/api/lottery_kj_detail.jspx?_ltype=4&_term="+message.value.term,
					"lottery_pls":"http://www.lottery.gov.cn/api/lottery_kj_detail.jspx?_ltype=5&_term="+message.value.term
				}
				switch(message.value.type){
					case"lottery_dlt":
					case"lottery_pls":
						fetch(urlOBJ[message.value.type])
							.then(response => response.text())
							.then(text => JSON.parse(DOMPurify.sanitize(text)))
							.then(arrayData => arrayData[0])
							.then(lottoryData =>{
								chrome.tabs.sendMessage(sender.tab.id,{type:"data",value:lottoryData.codeNumber,lotteryType:message.value.type});
							})
							.catch(err=>console.log(err))
						break;
					case"lottery_ssq":
						var formData = new FormData();
							formData.append("lottery_type", "tb");
							formData.append("r", 1522867870);
							formData.append("no", message.value.term);
						var _options={
							method:"POST",
							body:formData
						}
						fetch("http://east.swlc.net.cn/LotteryNew/AnnouncementDetail.aspx",_options)
							.then(response => response.text())
							.then(str => (new window.DOMParser()).parseFromString(str, "text/html"))
							.then(htmlData=>{
								console.log(htmlData);
								var _options=htmlData.querySelectorAll("td");
								var data=[];
								for(var i=5;i<12;i++){
									data.push(DOMPurify.sanitize(_options[i].querySelector("font").textContent));
								}
								return data;
							})
							.then(data=>{
								console.log(data);
								chrome.tabs.sendMessage(sender.tab.id,{type:"data",value:data,lotteryType:message.value.type});
							})
						break;
					case"lottery_sd":
						var formData = new FormData();
							formData.append("lottery_type", "3d");
							formData.append("r", 1522867870);
							formData.append("no", message.value.term);
						var _options={
							method:"POST",
							body:formData
						}
						fetch("http://east.swlc.net.cn/LotteryNew/AnnouncementDetail.aspx",_options)
							.then(response => response.text())
							.then(str => (new window.DOMParser()).parseFromString(str, "text/html"))
							.then(htmlData=>{
								console.log(htmlData);
								var _options=htmlData.querySelectorAll("td");
								var data=[];
								for(var i=5;i<8;i++){
									data.push(DOMPurify.sanitize(_options[i].querySelector("font").textContent));
								}
								return data;
							})
							.then(data=>{
								console.log(data);
								chrome.tabs.sendMessage(sender.tab.id,{type:"data",value:data,lotteryType:message.value.type});
							})
						break;
				}
			},
			getTerm:function(message,sender,sendResponse){
				let urlOBJ={
					"lottery_dlt":"http://www.lottery.gov.cn/api/get_typeBytermList.jspx?_ltype=4",
					"lottery_pls":"http://www.lottery.gov.cn/api/get_typeBytermList.jspx?_ltype=5",
					"lottery_ssq":"http://www.cwl.gov.cn/cwl_admin/kjxx/findIssue"
				}
				switch(message.value.type){
					case"lottery_dlt":
					case"lottery_pls":
						fetch(urlOBJ[message.value.type])
							.then(response => response.text())
							.then(text => JSON.parse(DOMPurify.sanitize(text)))
							.then(arrayData => arrayData[0])
							.then(termData =>{
								console.log(termData);
								chrome.tabs.sendMessage(sender.tab.id,{type:"term",value:termData.tremList});
							})
						break
					case"lottery_ssq":
						var formData = new FormData();
							formData.append("lottery_type", "tb");
							formData.append("r", 1522867870);
							formData.append("no", "2019062");
						var _options={
							method:"POST",
							body:formData
						}
						fetch("http://east.swlc.net.cn/LotteryNew/AnnouncementDetail.aspx",_options)
							.then(response => response.text())
							.then(str => (new window.DOMParser()).parseFromString(str, "text/html"))
							.then(htmlData=>{
								console.log(htmlData);
								var _options=htmlData.querySelectorAll("#no option");
								console.log(_options)
								var data=[];
								for(var i=0;i<_options.length;i++){
									data.push(DOMPurify.sanitize(_options[i].value));
								}
								return data;
							})
							.then(data=>{
								chrome.tabs.sendMessage(sender.tab.id,{type:"term",value:data});
							})
						break;
					case"lottery_sd":
						var formData = new FormData();
							formData.append("lottery_type", "3d");
							formData.append("r", 1522867870);
							formData.append("no", "2019144");
						var _options={
							method:"POST",
							body:formData
						}
						fetch("http://east.swlc.net.cn/LotteryNew/AnnouncementDetail.aspx",_options)
							.then(response => response.text())
							.then(str => (new window.DOMParser()).parseFromString(str, "text/html"))
							.then(htmlData=>{
								console.log(htmlData);
								var _options=htmlData.querySelectorAll("#no option");
								console.log(_options)
								var data=[];
								for(var i=0;i<_options.length;i++){
									data.push(DOMPurify.sanitize(_options[i].value));
								}
								return data;
							})
							.then(data=>{
								chrome.tabs.sendMessage(sender.tab.id,{type:"term",value:data});
							})
						break;
				}
			}
		},
		pxmovie:{
			getList:function(message,sender,sendResponse){
				fetch("https://www.poxiao.com/")
					.then(response=>response.blob())
					.then(blob=>{
						var reader = new FileReader();
						reader.onload = function(e) {
							var htmlData = reader.result;
							htmlData=(new window.DOMParser()).parseFromString(htmlData,"text/html");
							console.log(htmlData);
							var data=[];
							var _doms=htmlData.querySelectorAll(".container .content ul")[0].querySelectorAll("li");
							for(var i=0;i<_doms.length;i++){
								var _data=[];
								for(var ii=0;ii<_doms[i].childNodes.length;ii++){
									_data.push(DOMPurify.sanitize(_doms[i].childNodes[ii].textContent));
								}
								_data.push("https://www.poxiao.com"+_doms[i].childNodes[2].getAttribute("href"))
								data.push(_data);
							}
							console.log(data)
							chrome.tabs.sendMessage(sender.tab.id,{type:"list",value:data});
						}
						reader.readAsText(blob, 'GBK') 
					})
			},
			getData:function(message,sender,sendResponse){
				fetch(message.value)
					.then(response=>response.blob())
					.then(blob=>{
						let reader = new FileReader();
						reader.onload = function(e) {
							let htmlData = reader.result;
							htmlData=(new window.DOMParser()).parseFromString(htmlData,"text/html");
							console.log(htmlData);
							let data={
								info:[],
								dl:[],
								des:"",
								name:""
							};
							let domInfos=htmlData.querySelector(".container .detail_intro tbody").querySelectorAll("tr");
							for(var i=0;i<domInfos.length;i++){
								var _doms=domInfos[i].querySelectorAll("td"),
									_data=[];
								for(var ii=0;ii<_doms.length;ii++){
									if(_doms[ii].childNodes.length>1){
										for(var iii=0;iii<_doms[ii].childNodes.length;iii++){
											_data.push(DOMPurify.sanitize(_doms[ii].childNodes[iii].textContent));
										}
									}else{
										_data.push(DOMPurify.sanitize(_doms[ii].textContent));
									}
								}
								data.info.push(_data);
							}

							let domDls=htmlData.querySelector(".container #ziy .resourcesmain tbody").querySelectorAll("tr");
							for(var i=0;i<domDls.length-1;i++){
								var _data=[];
								_data.push(DOMPurify.sanitize(domDls[i].querySelector("td ").textContent));
								_data.push(DOMPurify.sanitize(domDls[i].querySelector("td input").value.substr(6)));
								data.dl.push(_data)
							}

							data.des=DOMPurify.sanitize(htmlData.querySelectorAll(".filmcontents p")[1].textContent);
							data.name=DOMPurify.sanitize(htmlData.querySelector(".container #film h1").childNodes[0].textContent);

							chrome.tabs.sendMessage(sender.tab.id,{type:"data",value:data});
						}
						reader.readAsText(blob, 'GBK') 
					})
			}
		}
	}
}

chrome.browserAction.onClicked.addListener(function(tab){
	if(config.icon.settings.type=="back"){
		//sub.extID=chrome.runtime.id?chrome.runtime.id:null;
		var theConf=config.icon.actions[0];
		sub.theConf=theConf;
		sub.initCurrent(null,sub.theConf);
	}else{
		chrome.tabs.query({active:true,currentWindow:true},function(tabs){
			sub.curTab=tabs[0];
			chrome.tabs.sendMessage(tabs[0].id,{type:"icon"},function(response){
				if(response&&response.type=="action_icon"){
					sub.message=response;
					sub.extID=chrome.runtime.id?chrome.runtime.id:null;
					var theConf=config.icon.actions[0];
					sub.theConf=theConf;
					sub.initCurrent(null,sub.theConf);
					console.log(sub.message)
				}
			});
		})
	}
})

if(!chrome.runtime.getPlatformInfo){}
else{
	chrome.runtime.getPlatformInfo(function(info){
		sub.cons.os=info.os;
		sub.checkMouseup();
	})	
}

if(!chrome.runtime.onInstalled){}
else{
	chrome.runtime.onInstalled.addListener(function(details){
		console.log(details.reason);
		chrome.windows.getAll({populate:true},function(windows){
			for(var i=0;i<windows.length;i++){
				for(var ii=0;ii<windows[i].tabs.length;ii++){
					chrome.tabs.executeScript(windows[i].tabs[ii].id,{file:"js/event.js",runAt:"document_start",allFrames:true})
				}
			}
		})
		if(details.reason=="install"){
			chrome.tabs.create({url:"../html/options.html"});
		}
		if(details.reason=="update"){
			chrome.storage.sync.get(function(items){
				if(devMode||(items.general&&items.general.settings.notif)){
					var notif={
				        type:"list",
				        title:sub.getI18n("notif_title_update"),
				        message:"",
				        iconUrl: "icon.png",
				        items: [],
				        buttons:[
							{title:sub.getI18n("notif_btn_open"),iconUrl:"image/open.png"},
							{title:/*chrome.i18n.getMessage*/sub.getI18n("review"),iconUrl:"image/star.png"}
						]
					}
					var xhr = new XMLHttpRequest();
					xhr.onreadystatechange=function(){
						if (xhr.readyState == 4){
							var items=JSON.parse(DOMPurify.sanitize(xhr.response));
							for(var i=0;i<items.log[0].content.length;i++){
								notif.items.push({title:i+1+". ",message:items.log[0].content[i]});
							}
							chrome.notifications.create("",notif,function(){})
						}
					}
					xhr.open('GET',"../change.log", true);
					xhr.send();
				}
			})		
		}
	})
}

if(!chrome.notifications){}
else{
	console.log("ssss")
	chrome.notifications.onClicked.addListener(function(id){
		localStorage.setItem("showlog","true");
		chrome.tabs.create({url:"../html/options.html"});
	})
	chrome.notifications.onButtonClicked.addListener(function(id,index){
		switch(index){
			case 0:
				chrome.tabs.create({url:"../html/options.html"});
				break;
			case 1:
				chrome.tabs.create({url:"https://chrome.google.com/webstore/detail/"+chrome.runtime.id+"?hl="+navigator.language});
				break;
		}
	})	
}

chrome.contextMenus.onClicked.addListener(function(info,tab){
	sub.CTMclick(info,tab);
})
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
	sub.setIcon("normal",tabId,changeInfo,tab);
	if(changeInfo.status=="complete"){
		chrome.tabs.sendMessage(tabId,{type:"status"},function(response){
			if(!response){
				sub.setIcon("warning",tabId,changeInfo,tab);
			}
		});
	}

})
chrome.runtime.onMessageExternal.addListener(function(message,sender,sendResponse){
	sub.funOnMessage(message,sender,sendResponse);
})
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse) {
	sub.funOnMessage(message,sender,sendResponse);
});
loadConfig();
//browsersettings
if(chrome.browserSettings&&chrome.browserSettings.contextMenuShowEvent){
	browser.browserSettings.contextMenuShowEvent.set({value:"mouseup"});
	config.general.linux.cancelmenu=false;
	sub.saveConf();
}else if(browserType=="fx"&&(localStorage.getItem("flag_mouseup")==null)&&(sub.cons.os=="linux"||sub.cons.os=="mac")){
	sub.checkPermission(["browserSettings"],null,null,sub.getI18n("perdes_browsersettings"));
	localStorage.setItem("flag_mouseup","true");
}

console.log("end")