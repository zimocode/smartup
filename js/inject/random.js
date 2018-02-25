console.log("random")
sue.apps.random={
	cons:{
		boxmove:{}
	},
	initUI:function(){
		sue.apps.init();
		var _appname="random";
		var dom=sue.apps.domCreate("smartup",{setName:["className","id"],setValue:["su_apps","su_apps_"+_appname]},null,"z-index:"+parseInt((new Date().getTime())/1000),{setName:["appname"],setValue:[_appname]});
		dom.innerHTML=
			'<div class="su_head" style="">'
				+'<span class="su_title">'+sue.apps.i18n("random")+'</span>'
				+'<div class="su_btn_close">x</div>'
			+'</div>'
			+'<div class="su_main">'
			+'</div>';
		var domUL=sue.apps.domCreate("ul");
		chrome.storage.local.get(function(items){
			var randData;
			!items.localConfig?(items.localConfig={},items.localConfig.apps={}):null;
			!items.localConfig.apps?items.localConfig.apps={}:null;
			if(!items.localConfig.apps.random){
				items.localConfig.apps.random={
					min:1,
					max:9,
					num:4,
					norepeat:false,
					add:true
				}
				randData=items.localConfig.apps.random;
				chrome.storage.local.set(items);
			}else{
				randData=items.localConfig.apps.random;
			}
			
			var min=randData.min,
				max=randData.max,
				num=randData.num,
				norepeat=randData.norepeat,
				add=randData.add;
				console.log(norepeat)
			dom.querySelector(".su_main").innerHTML=
				'<div class="randombox">'
					+'<input id="su_random_print" type="text"><br />'
					+'<span class="su_random_span">'+sue.apps.i18n("app_random_bound")+'</span>'
					+'<input id="min" class="su_random_text" type="text" value="'+min+'"><span>~</span><input id="max" class="su_random_text" type="text" value="'+max+'"><br />'
					+'<span class="su_random_span">'+sue.apps.i18n("app_random_num")+'</span><input id="num" class="su_random_text" type="text" value="'+num+'"><br />'
					+'<input class="su_random_chkbox" id="su_random_norepeat" type="checkbox" '+(norepeat?'checked="true"':'')+'><label for="su_random_norepeat">'+sue.apps.i18n("app_random_norepeat")+'</label><br />'
					+'<input class="su_random_chkbox" id="su_random_add" type="checkbox" '+(add?'checked="true"':'')+'><label for="su_random_add">'+sue.apps.i18n("app_random_fill")+'</label><br />'
					+'<button class="su_random_btn">'+sue.apps.i18n("btn_done")+'</button>'
				+'</div>'
			dom.querySelector(".su_random_btn").addEventListener("click",sue.apps.random.handleEvent,false);
			//sue.apps.initZoom(dom);
			sue.apps.initPos(dom);
		})
		//sue.apps.initOpt(dom);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_random_btn")){
					sue.apps.random.randnum(e);
				}
				break;
		}
	},
	randnum:function(e){
		var domRandom=sue.apps.getAPPboxEle(e);
		var printBox=domRandom.querySelector("#su_random_print");
		var randLength=parseInt(domRandom.querySelector("#num").value),
			min=parseInt(domRandom.querySelector("#min").value),
			max=parseInt(domRandom.querySelector("#max").value),
			norepeat=domRandom.querySelector("#su_random_norepeat").checked;
			add=domRandom.querySelector("#su_random_add").checked;
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
			var num=parseInt(Math.random()*(max-min+1)+min-(min<0?1:0));
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
			items.localConfig.apps.random={
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
sue.apps.random.initUI();
// chrome.runtime.sendMessage({type:"apps_getvalue",typevalue:"extmgm"},function(response){
// 	sue.apps.random.cons.zoom=response.value.zoom;
// 	sue.apps.random.initUI();
// })
