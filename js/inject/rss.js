console.log("rss")
sue.apps.rss={
	cons:{},
	initUI:function(){
		sue.apps.init();
		var _appname="rss",
			_time=parseInt((new Date().getTime())/1000);
		var dom=sue.apps.domCreate("smartup",{setName:["className","id"],setValue:["su_apps","su_apps_"+_appname]},null,"z-index:"+_time,{setName:["appname"],setValue:[_appname]});

		dom.innerHTML=
			'<div class="su_head" style=""><span class="su_title">'+sue.apps.i18n(_appname)+'</span><div class="su_btn_close">x</div>'
			+'</div>'
			+'<div class="su_main">'
				+'<div class="rss_head">'
					+'<span class="su_rss_rsshead"></span>'
				+'</div>'
				+'<div class="rss_box">'
					+'<span style="color: #3698F9;">Loading </span><img style="display: inline-block;margin-bottom: -10px;" src="'+chrome.runtime.getURL("/image/loading.gif")+'" />'
				+'</div>'
			+'</div>'
			+'<div class="su_menu">'
				+'<img class="menu_item menu_item_rss" src="'+chrome.runtime.getURL("/image/menu.svg")+'" title="'+sue.apps.i18n("app_rss_menu")+'" /><br />'
				+'<img class="menu_item menu_item_opt" src="'+chrome.runtime.getURL("/image/options.png")+'" title="'+sue.apps.i18n("app_tip_opt")+'" /><br />'
			+'</div>'
			+'<div class="su_options">'
				+'<label class="options_labelname">'+sue.apps.i18n("n_optype")+'</label><select name="n_optype"><option value="s_new">'+sue.apps.i18n("s_new")+'</option><option value="s_back">'+sue.apps.i18n("s_back")+'</option><option value="s_current">'+sue.apps.i18n("s_current")+'</option><option value="s_incog">'+sue.apps.i18n("s_incog")+'</option></select><br />'
				+'<label class="options_labelname">'+sue.apps.i18n("n_position")+'</label><select name="n_position"><option value="s_default">'+sue.apps.i18n("s_default")+'</option><option value="s_left">'+sue.apps.i18n("s_left")+'</option><option value="s_right">'+sue.apps.i18n("s_right")+'</option><option value="s_head">'+sue.apps.i18n("s_head")+'</option><option value="s_last">'+sue.apps.i18n("s_last")+'</option></select><br />'
				+'<input id="n_pin_'+_time+'" name="n_pin" type="checkbox"><label for="n_pin_'+_time+'" class="options_labeldes">'+sue.apps.i18n("n_pin")+'</label><br />'
				+'<input id="n_closebox_'+_time+'" name="n_closebox" type="checkbox"><label for="n_closebox_'+_time+'" class="options_labeldes">'+sue.apps.i18n("n_closebox")+'</label>'
				+'<div class="options_btnbox">'
					+'<input class="options_btn_cancel" type="button" value="'+sue.apps.i18n("btn_cancel")+'">'
					+'<input class="options_btn_save" type="button" value="'+sue.apps.i18n("btn_save")+'">'
				+'</div>'
			+'</div>'
			+'<div class="rss_sub">'
				+'<div class="sub_box">'
					+'<input class="sub_text" type="text" placeholder="'+sue.apps.i18n("app_rss_subplace")+'">'
					+'<input class="sub_add" type="button" value="'+sue.apps.i18n("app_rss_new")+'">'
				+'</div>'
				+'<ul class="sub_items"></ul>'
			+'</div>'
		dom.style.cssText+="border-color:rgb(255, 102, 0);";
		dom.querySelector(".su_head").style.cssText+="background-color:rgb(255, 102, 0);";

		dom.addEventListener("click",sue.apps.rss.handleEvent,false);
		sue.apps.initPos(dom);

		if(sue.apps.rss.config.feed&&sue.apps.rss.config.feed.length>0){
			sue.apps.rss.rss(dom,sue.apps.rss.config.feed[0]);
			sue.apps.rss.menu(dom);
		}else{
			dom.querySelector(".rssbox").innerHTML="there is no sub.";
			sue.apps.rss.showSub(dom)
		}
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("rss_item")){
					sue.apps.rss.openlink(e);
					if(sue.apps.rss.config.n_closebox){
						sue.apps.boxClose(e);
					}
				}
				if(e.target.classList.contains("menu_item_rss")){
					sue.apps.rss.showSub(e);
				}
				if(e.target.classList.contains("sub_item")){
					sue.apps.rss.rssSwitch(e,e.target.dataset.url);
				}
				if(e.target.classList.contains("sub_itemdel")){
					sue.apps.rss.rssDel(e);
				}
				if(e.target.classList.contains("sub_add")){
					sue.apps.rss.rssAdd(e);
				}
				break;
		}
	},
	saveConf:function(){
		console.log("sdf")
		chrome.runtime.sendMessage({type:"apps_saveconf",apptype:"rss",config:sue.apps.rss.config},function(response){})
	},
	fixURL:function(url){
		var fixstrs=["http://","https://"];
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
	},
	rssDel:function(e){
		chrome.storage.local.get(function(items){
			var theid=e.target.parentNode.dataset.id;
			if(!items.localConfig.apps.rss.feedtitle[theid]){
			}else{
				items.localConfig.apps.rss.feedtitle.splice(theid,1);
				chrome.storage.local.set(items);
			}
			sue.apps.rss.config.feed.splice(theid,1);
			sue.apps.rss.saveConf();
			e.target.parentNode.remove();
		})
	},
	rssAdd:function(e){
		var dom=sue.apps.getAPPboxEle(e);
		var domadd=dom.querySelector(".sub_text");
		var domlist=dom.querySelector(".sub_items");
		if(!domadd.value){return;}
		var theurl=sue.apps.rss.fixURL(domadd.value);
		var domli=sue.apps.domCreate("li",{setName:["className","title"],setValue:["sub_item",theurl]},theurl,null,{setName:["url","id"],setValue:[theurl,sue.apps.rss.config.feed.length]});
		var domdel=sue.apps.domCreate("span",{setName:["className"],setValue:["sub_itemdel"]},"x");
		domli.appendChild(domdel);
		domlist.appendChild(domli);		
		sue.apps.rss.config.feed.push(theurl);
		sue.apps.rss.saveConf();
		domadd.value="";
	},
	rssSwitch:function(e,url){
		var rssheaddom=sue.apps.getAPPboxEle(e).querySelector(".rss_head");
		rssheaddom.innerHTML=""
		sue.apps.getAPPboxEle(e).querySelector(".rss_box").innerHTML='<span style="color: #3698F9;">Loading </span><img style="display: inline-block;margin-bottom: -10px;" src="'+chrome.runtime.getURL("/image/loading.gif")+'" />';
		sue.apps.rss.showSub(e);
		sue.apps.rss.rss(e.target,url);
	},
	showSub:function(e){
		var dommenu=sue.apps.getAPPboxEle(e).querySelector(".rss_sub");
		console.log(dommenu)
		var _conf=window.getComputedStyle(dommenu).opacity==0?true:false
		if(_conf){
			dommenu.style.cssText+="display:block;opacity:1;"
		}else{
			dommenu.style.cssText+="display:none;opacity:0;"
		}
	},
	menu:function(dom){
		var domlist=sue.apps.getAPPboxEle(dom).querySelector(".sub_items");
		domlist.innerHTML="";
		chrome.storage.local.get(function(items){
			var feed=sue.apps.rss.config.feed;
			var feedtitle=items.localConfig.apps.rss.feedtitle;
			for(var i=0;i<feed.length;i++){
				var domli=sue.apps.domCreate("li",{setName:["className","title"],setValue:["sub_item",feed[i]]},feedtitle[i]?feedtitle[i]:feed[i],null,{setName:["url","id"],setValue:[feed[i],i]});
				var domdel=sue.apps.domCreate("span",{setName:["className"],setValue:["sub_itemdel"]},"x");
				domli.appendChild(domdel);
				domlist.appendChild(domli);
			}
		})
	},
	rss:function(dom,url){
        xhr=new XMLHttpRequest();
        xhr.open("GET",url,"false");
        xhr.onreadystatechange=function(){
			var rssdom=sue.apps.getAPPboxEle(dom).querySelector(".rss_box");
	        if(xhr.readyState ==4) {
	            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
	            	function replace_cdata(str){
	            		var newstr;
	            			newstr=str.indexOf("<![CDATA[")==0?str.replace("<![CDATA[",""):str;
	            			newstr=newstr.indexOf("]]>")==newstr.length-3?newstr.replace("]]>",""):newstr;
	            		return newstr;
	            	}
	                var OBJ=[];
			            OBJ.length=0;

			        console.log(xhr);
			        if(xhr.responseXML){
			        	var theResponse=xhr.responseXML
			        }else{
			        	var theResponse=sue.apps.domCreate("div",null,theResponse,"display:none;");
			        	theResponse.innerHTML=xhr.response;
			        }
			        console.log(theResponse)
			        console.log(theResponse.querySelector("channel>link"))
			        var rss_title=replace_cdata(theResponse.querySelector("channel>title")?theResponse.querySelector("channel>title").innerHTML:"noname");
			        var rss_link=replace_cdata(theResponse.querySelector("channel>image>link")?theResponse.querySelector("channel>image>link").innerHTML:"");
			        var rss_img=replace_cdata(theResponse.querySelector("channel>image>url")?theResponse.querySelector("channel>image>url").innerHTML:chrome.runtime.getURL("/image/rss.png"));

			        var items=theResponse.querySelectorAll("item");
			        for(var i=0;i<items.length;i++){
			            var itemele=items[i].childNodes;
			            var theOBJ={};
			            for(var ii=0;ii<itemele.length;ii++){
			                if(itemele[ii].tagName){
			                	var thetext=replace_cdata(itemele[ii].innerHTML);
			                    theOBJ[itemele[ii].tagName.toLowerCase()]=thetext;
			                }
			            }
			            OBJ.push(theOBJ);
			        }
			        console.log(OBJ)
			        //update rsstitle;
					chrome.storage.local.get(function(items){
						var feed=sue.apps.rss.config.feed;
						for(var i=0;i<feed.length;i++){
							if(feed[i]==url){
								items.localConfig.apps.rss.feedtitle[i]=rss_title;
								break;
							}
						}
						chrome.storage.local.set(items);
						sue.apps.rss.menu(dom)
					})

			        //rss head
			        rssheaddom=sue.apps.getAPPboxEle(dom).querySelector(".su_main .rss_head");
			        rssheaddom.innerHTML='<img src="'+rss_img+'" /><a href="'+rss_link+'" target="_blank">'+rss_title+'</a>'

			        rssdom.innerHTML="";
			        for(var i=0;i<OBJ.length;i++){
			        	var liobj=sue.apps.domCreate("li",{setName:["className"],setValue:["rss_item"]},null,null,{setName:["link"],setValue:[OBJ[i].link]},OBJ[i].title)
			        	rssdom.appendChild(liobj);
			        }

	            } else {
	                rssdom.innerHTML="Request was unsuccessful, you may try again later. " + xhr.responseText;
	            }
	            sue.apps.initPos(dom);
	        }
	    };
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(null);
	},
	openlink:function(e){
		chrome.runtime.sendMessage({type:"apps_action",apptype:"rss",link:e.target.dataset.link},function(response){})
		if(sue.apps.rss.config.n_closebox){
			sue.apps.boxClose(e)
		}
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"rss"},function(response){
	console.log(sue.apps.rss);
	sue.apps.rss.config=response.config;
	chrome.storage.local.get(function(items){
		!items.localConfig?(items.localConfig={},items.localConfig.apps={}):null;
		!items.localConfig.apps?items.localConfig.apps={}:null;
		console.log(items)
		if(!items.localConfig.apps.rss||!items.localConfig.apps.rss.feedtitle){
			items.localConfig.apps.rss={
				feedtitle:sue.apps.rss.config.feed
			}
		}else{
			for(var i=0;i<sue.apps.rss.config.feed.length;i++){
				if(!items.localConfig.apps.rss.feedtitle[i]){
					items.localConfig.apps.rss.feedtitle[i]=sue.apps.rss.config.feed[i];
				}
			}	
		}
		chrome.storage.local.set(items);
		sue.apps.rss.initUI();
	})
})

