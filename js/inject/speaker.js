console.log("speaker")
sue.apps.speaker={
	cons:{},
	initUI:function(){
		sue.apps.init();
		var _appname="speaker",
			_time=parseInt((new Date().getTime())/1000);
		var dom=sue.apps.domCreate("smartup",{setName:["className","id"],setValue:["su_apps","su_apps_"+_appname]},null,"z-index:"+_time,{setName:["appname"],setValue:[_appname]});
		dom.innerHTML=
			'<div class="su_head" style="">'
				+'<span class="su_title">'+sue.apps.i18n("speaker")+'</span>'
				+'<div class="su_btn_close">x</div>'
			+'</div>'
			+'<div class="su_main">'
				+'<div class="su_speakerbox">'
					+'<div class="speaker_inputbox">'
						+'<textarea class="speaker_inputarea">'+sue.apps.speaker.seltxt+'</textarea><br />'
						+'<button class="speaker_btn_play">'+sue.apps.i18n("btn_play")+'</button>'
						+'<button class="speaker_btn_pause" style="display:none;">'+sue.apps.i18n("btn_pause")+'</button>'
						+'<button class="speaker_btn_stop">'+sue.apps.i18n("btn_stop")+'</button>'
					+'</div>'
				+'</div>'
			+'</div>'
			+'<div class="su_options">'
				+'<label class="options_labelname">'+sue.apps.i18n("n_voicename")+'</label><select name="n_voicename"><option value="s_unpin">'+sue.apps.i18n("s_unpin")+'</option><option value="s_pinned">'+sue.apps.i18n("s_pinned")+'</option></select><br />'
				+'<label class="options_labelname">'+sue.apps.i18n("n_gender")+'</label><select name="n_gender"><option value="s_female">'+sue.apps.i18n("s_female")+'</option><option value="s_male">'+sue.apps.i18n("s_male")+'</option></select><br />'
				+'<label class="options_labelname">'+sue.apps.i18n("n_rate")+'</label><input name="n_rate" min=".1" max="10" step=".1" type="range"><span class="options_rangebox"></span><br />'
				+'<label class="options_labelname">'+sue.apps.i18n("n_pitch")+'</label><input name="n_pitch" min=".1" max="2" step=".1" type="range"><span class="options_rangebox"></span><br />'
				+'<label class="options_labelname">'+sue.apps.i18n("n_volume")+'</label><input name="n_volume" min=".1" max="1" step=".1" type="range"><span class="options_rangebox"></span><br />'
				+'<div class="options_btnbox">'
					+'<input class="options_btn_cancel" type="button" value="'+sue.apps.i18n("btn_cancel")+'">'
					+'<input class="options_btn_save" type="button" value="'+sue.apps.i18n("btn_save")+'">'
				+'</div>'
			+'</div>'
			+'<div class="su_menu">'
				+'<img class="menu_item menu_item_opt" src="'+chrome.runtime.getURL("/image/options.png")+'" title="'+sue.apps.i18n("app_tip_opt")+'" /><br />'
			+'</div>';
		var voicedom=dom.querySelector("select[name=n_voicename]");
		var _options;
		for(var i=0;i<sue.apps.speaker.voicename.length;i++){
			_options+='<option value="'+sue.apps.speaker.voicename[i]+'">'+sue.apps.speaker.voicename[i]+'</option>';
		}
		voicedom.innerHTML=_options;

        dom.querySelector(".speaker_btn_pause").addEventListener("click",this,false);
        dom.querySelector(".speaker_btn_play").addEventListener("click",this,false);
        dom.querySelector(".speaker_btn_stop").addEventListener("click",this,false);
        //sue.apps.initOpt(dom);
		//sue.apps.initZoom(dom);
		sue.apps.initPos(dom);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.className.indexOf("speaker_btn")==0){
					if(!sue.apps.getAPPboxEle(e).querySelector("textarea").value){return;}
					sue.apps.speaker.speaker(e);
					pausebtn=sue.apps.getAPPboxEle(e).querySelectorAll("button")[1];
					if(e.target.className=="speaker_btn_pause"){
						e.target.className="speaker_btn_resume";
						e.target.innerText=sue.apps.i18n("btn_resume");
					}else if(e.target.className=="speaker_btn_resume"){
						e.target.className="speaker_btn_pause";
						e.target.innerText=sue.apps.i18n("btn_pause");
					}else if(e.target.className=="speaker_btn_play"){
						pausebtn.style.cssText+="display:inline-block;";
					}else if(e.target.className=="speaker_btn_stop"){
						pausebtn.style.cssText+="display:none";
					}
				}
				break;
		}
	},
	speaker:function(e){
		chrome.runtime.sendMessage({type:"apps_action",apptype:"speaker",value:{type:e.target.className.substr(12),txt:sue.apps.getAPPboxEle(e).querySelector("textarea").value}},function(response){})
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"speaker"},function(response){
	console.log(response)
	sue.apps.speaker.config=response.config;
	//sue.apps.speaker.zoom=response.value.zoom;
	sue.apps.speaker.voicename=response.value.voicename;
	sue.apps.speaker.seltxt=response.value.seltxt;
	sue.apps.speaker.initUI();
})
