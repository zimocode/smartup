// modelMore actionModel
console.log("actions")
let i=0,ii=0,iii=0;
let actions={
	mges_group:["ag_none","ag_nav",/*"ag_scroll",*/"ag_tab","ag_window",/*"ag_copy",*/"ag_txt","ag_lnk","ag_img",/*"ag_apps",*/"ag_chrome","ag_su","ag_apps","ag_others","ag_exp","ag_dep"],
	mges:[
		[//group none
			{name:"none"}
		],
		[//group nav
			{name:"back"},
			{name:"forward"},
			{name:"scroll",selects:["n_scroll","n_effect"]},
			{name:"reload",selects:["n_tab"],checks:["n_reload_clear"]},
			{name:"stop",selects:["n_tab"]},
			/*{name:"lastlevel"},*/
			{name:"next",texts:["n_npkey_n"],selects:["n_optype","n_position"],checks:["n_pin"]},
			{name:"previous",texts:["n_npkey_p"],selects:["n_optype","n_position"],checks:["n_pin"]},
			{name:"pretab"},
			{name:"upperlevel",selects:["n_optype","n_position"],checks:["n_pin"]},
			{name:"increment",selects:["n_optype","n_position"],checks:["n_pin"]},
			{name:"decrement",selects:["n_optype","n_position"],checks:["n_pin"]}
		],
		[//group tab
			{name:"close",selects:["n_tab","n_close_sel"],checks:["n_close_keep","n_closePin","n_closeConfirm"]},
			{name:"newtab",selects:["n_optype","n_position"],checks:["n_pin"]},
			{name:"reopen"},
			{name:"open",texts:["n_url"],selects:["n_optype","n_position"],checks:["n_pin"]},
			{name:"openclip",selects:["n_optype","n_position"],checks:["n_pin"]},
			{name:"switchtab",selects:["n_tab_lrhl"]},
			{name:"move",selects:["n_position_lrhl"]},
			{name:"detach",selects:["n_tab"]},//movetowin
			{name:"pin",selects:["n_tab"]},
			{name:"duplicate",selects:["n_tab"]},
			{name:"copytabele",selects:["n_tab_single","n_copytabele_content"]}
		],
		[//group window
			{name:"newwin",selects:["n_wintype"],checks:["n_winincog"]},
			{name:"closewin",selects:["n_win"]},
			{name:"max"},
			{name:"min"},
			{name:"full"}
		],
		[//group txt
			{name:"copytxt"},
			{name:"paste"},
			{name:"txtsearch",selects:["n_txtengine","n_encoding","n_optype","n_position"],checks:["n_pin"]},
			{name:"qr"},
			{name:"tts",selects:["n_voicename","n_gender"],ranges:["n_rate","n_pitch","n_volume"]},
			{name:"speaker"},
			{name:"txtsearchclip",selects:["n_txtengine","n_encoding","n_optype","n_position"],checks:["n_pin"]}/*,
			{name:"mulisearch"}*/
		],
		[//group lnk
			{name:"openlnk",selects:["n_optype","n_position"],checks:["n_pin"]},
			{name:"bookmarklnk",checks:["n_notif"]},
			{name:"copylnkurl"},
			{name:"copylnktxt"},
			{name:"copylnkaslnk"},
			{name:"qr"},
			{name:"dllink",checks:["n_dialog"]}
			/*,
			{name:"copylnkas"}*/
		],
		[//group img
			{name:"openimg",selects:["n_optype","n_position"],checks:["n_pin"]},
			{name:"saveimg",checks:["n_notif"]},
			{name:"saveimgas",checks:["n_notif"]},
			{name:"copyimgurl"},
			{name:"imgsearch",selects:["n_imgengine","n_encoding","n_optype","n_position"],checks:["n_pin"]},
			{name:"copyimg"}
		],

		[//group chrome
			{name:"crpages",selects:["n_crpages","n_optype","n_position"],checks:["n_pin"]}
		],
		[//group smartup
			{name:"optionspage"},
			{name:"reloadext"}
		],
		[//group apps
			{name:"rss"},
			{name:"tablist"},
			{name:"random"},
			{name:"extmgm"},
			{name:"recentbk"},
			{name:"recentht"},
			{name:"recentclosed"},
			{name:"base64"},
			{name:"qr"},
			{name:"numc"},
			{name:"speaker"},
			{name:"jslist"},
			{name:"savepdf"},
			{name:"appslist"}
			/*{name:"gmail"},
			{name:"ary"},
			{name:"color"},
			{name:"autoreload"},
			{name:"password"}*/
		],
		[//group others
			{name:"dldir"},
			{name:"capture"},
			{name:"bookmark",selects:["n_tab"],checks:["n_notif","n_closetab"]},
			{name:"script",selects:["n_script"],checks:["n_jq"]},
			{name:"source",selects:["n_optype","n_position"],checks:["n_pin"]},
			{name:"zoom",selects:["n_zoom"]},
			{name:"savepage",selects:["n_tab"],checks:["n_closetab","n_dlbar","n_notif"]},
			{name:"mail",selects:["n_mail","n_tab"],texts:["n_mail_prefix","n_mail_domain"]},
			{name:"print"},
			{name:"extdisable"},
			{name:"mute",selects:["n_mute"]},
			{name:"aliqr1801"}
		],
		[//ag_exp
			{name:"recentclosed"},
			{name:"synced"},
			{name:"snap",selects:["n_snap"]},
			{name:"savepdf"},
			{name:"set_bk"},
			{name:"set_search"},
			{name:"readermode"}
		],
		[//deprecated
			{name:"zoom_dep",selects:["n_zoom"]},
			{name:"restart"},
			{name:"exit"}
		]
	],
	tdrg_group:["ag_none",/*"ag_search","ag_copy",*/"ag_others"],
	tdrg:[
		[//group none
			{name:"none"}
		],
		[
			{name:"copytxt"},
			{name:"txtsearch",selects:["n_txtengine","n_encoding","n_optype","n_position"],checks:["n_pin"]},
			{name:"qr"},
			{name:"tts",selects:["n_voicename","n_gender"],ranges:["n_rate","n_pitch","n_volume"]},
			{name:"speaker"}
		]
	],
	ldrg_group:["ag_none",/*"ag_tab","ag_copy",*/"ag_others"],
	ldrg:[
		[//group none
			{name:"none"}
		],
		[
			{name:"openlnk",selects:["n_optype","n_position"],checks:["n_pin"]},
			{name:"bookmarklnk",checks:["n_notif"]},
			{name:"copylnkurl"},
			{name:"copylnktxt"},
			{name:"copylnkaslnk"},
			{name:"qr"},
			{name:"dllink",checks:["n_dialog"]}
		]
	],
	idrg_group:["ag_none",/*"ag_tab","ag_copy","ag_search","ag_save",*/"ag_others"],
	idrg:[
		[//group none
			{name:"none"}
		],
		[
			{name:"openimg",selects:["n_optype","n_position"],checks:["n_pin"]},
			{name:"copyimgurl"},
			{name:"imgsearch",selects:["n_imgengine","n_encoding","n_optype","n_position"],checks:["n_pin"]},
			{name:"saveimg",checks:["n_dlbar","n_notif"]},
			{name:"saveimgas",checks:["n_dlbar","n_notif"]},
			{name:"copyimg"}
		]
	]
}
actions.popactions=actions.mgesactions=actions.mges;
actions.popactions_group=actions.mgesactions_group=actions.mges_group;

actions.touch_group=actions.mges_group;


actions.mgesactions=actions.mges;
actions.touch=actions.mges;
//actions.touchactions_group=actions.mgesactions_group=actions.mges_group;

let actionOptions={
	special:{
		upperlevel:{
			n_optype:["s_current","s_new","s_back","s_win","s_winback","s_incog"]
		},
		increment:{
			n_optype:["s_current","s_new","s_back","s_win","s_winback","s_incog"]
		},
		decrement:{
			n_optype:["s_current","s_new","s_back","s_win","s_winback","s_incog"]
		},
	},
	selects:{
		n_tab:["s_current","s_others","s_all","s_head","s_last","s_left","s_right","s_lefts","s_rights"],
		n_tab_single:["s_current","s_left","s_right","s_head","s_last"],
		n_tab_lrhl:["s_left","s_right","s_head","s_last"],
		n_mute:["s_audible","s_current","s_others","s_all","s_head","s_last","s_left","s_right","s_lefts","s_rights"],

		n_optype:["s_new","s_back","s_current","s_win","s_winback","s_incog"],

		n_position:["s_default","s_left","s_right","s_head","s_last"],
		n_position_lrhl:["s_left","s_right","s_head","s_last"],

		n_win:["s_current","s_all","s_others"],
		n_wintype:["s_normal","s_popup","s_panel","s_detached_panel"],
		n_winincog:["s_no","s_yes"],

		n_reload_clear:["s_no","s_yes"],
		n_close_sel:["s_default","s_left","s_right","s_head","s_last"],
		n_pin:["s_unpin","s_pinned"],
		n_effect:["s_on","s_off"],
		n_jq:["s_yes","s_no"],
		n_copytabele_content:["s_tabele_title","s_tabele_url","s_tabele_aslnk"],
		n_crpages:["s_cr_set","s_cr_ext","s_cr_history","s_cr_app","s_cr_bookmark","s_cr_dl","s_cr_flag"],
		n_dlbar:["s_yes","s_no"],
		n_encoding:["s_none","s_unicode","s_uri","s_uric"],
		n_zoom:["s_in","s_out","s_reset"],
		n_scroll:["s_up","s_down","s_left","s_right","s_top","s_bottom","s_leftmost","s_rightmost"],
		n_mail:["s_gmail","s_defaultmail","s_gmailapps"],
		n_gender:["s_female","s_male"],
		n_voicename:["native"],
		effect:["on","off"],
		n_notif:["s_yes","s_no"],
		script:[],
		n_engine:[],
		n_snap:["s_left","s_right"]
	},
	texts:{
		n_npkey_n:"next,pnnext,next ›,›,>",
		n_npkey_p:"previous,pnprev,‹ prev,‹,<",
		n_num:"5",
		n_mail_prefix:"Interesting Page:"
	},
	ranges:{
		n_pitch:1,
		n_volume:1,
		n_rate:1
	},
	checks:{
		n_dlbar:true,
		n_notif:true,
		n_closetab:false,

		n_winincog:false,
		n_reload_clear:false,
		n_jq:true,

		n_pin:false,
		n_effect:true,

		n_closePin:false,
		n_closeConfirm:true,
		n_dialog:false
	}
}

let actionRemove=function(actionName){
	for(i=0;i<Object.keys(actions).length;i++){
		for(ii=0;ii<actions[Object.keys(actions)[i]].length;ii++){
			for(iii=0;actions[Object.keys(actions)[i]][ii].length&&iii<actions[Object.keys(actions)[i]][ii].length;iii++){
				if(actionName.contains(actions[Object.keys(actions)[i]][ii][iii].name)){
					actions[Object.keys(actions)[i]][ii].splice(iii,1);
				}				
			}
		}
	}
}
chrome.tts?chrome.tts.getVoices(function(voice){
	for(i=0;i<voice.length;i++){
		if(voice[i].voiceName=="native"){
			actionOptions.selects.n_voicename.splice(0,0,voice[i].voiceName);
		}else{
			actionOptions.selects.n_voicename.push(voice[i].voiceName)
		}
	}
}):null;

//copy image
(chrome.clipboard&&chrome.clipboard.setImageData)?null:actionRemove(["copyimg"]);

//save pdf
(!chrome.tabs.saveAsPDF)?actionRemove(["savepdf"]):null;

(browserType!="fx")?actionRemove(["new_bk","new_search","readermode"]):null;