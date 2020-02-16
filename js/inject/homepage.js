// console.log("homepage");
sue.apps.homepage={
	cons:{},
	initUI:function(){
		let appInfo={
			appName:"homepage",
			headTitle:"homepage",
			headCloseBtn:true,
			menu:[
				{src:"/image/menu.svg",title:"homepage_grouplist",className:"menu_item menu_item_homepagelist"},
				{src:"/image/options.png",title:"app_tip_opt",className:"menu_item menu_item_opt"},
				{src:"/image/edit.png",title:"homepage_editmode",className:"menu_item menu_item_homepageedit"}
			],
			options:[
				{type:"select",label:"n_optype",name:"n_optype",value:["s_new","s_back","s_current","s_incog"]},
				{type:"select",label:"n_position",name:"n_position",value:["s_default","s_left","s_right","s_head","s_last"]},
				{type:"checkbox",label:"n_pin",name:"n_pin",checked:true},
				{type:"checkbox",label:"n_closebox",name:"n_closebox",checked:true},
				{type:"checkbox",label:"n_homepage_icon",name:"n_homepage_icon",checked:true},
				{type:"checkbox",label:"n_homepage_bg",name:"n_homepage_bg",checked:true},
				{type:"checkbox",label:"n_homepage_resize",name:"n_homepage_resize",checked:true},
				{type:"checkbox",label:"n_homepage_last",name:"n_homepage_last",checked:true}
			]
		}
		sue.apps.init();
		var dom=sue.apps.initBox(appInfo);
			dom.id="su_apps_"+appInfo.appName;
		sue.apps[appInfo.appName].dom=dom;
		sue.apps.initPos(dom);

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_box"]});
		dom.querySelector(".su_main").appendChild(theAppBox);
		let _listBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_listbox"]});
		dom.appendChild(_listBox);
		let _listItemBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_listitembox"]});
		_listBox.appendChild(_listItemBox);
		sue.apps.homepage.listInit(dom);
		sue.apps.homepage.cons.curListId=0;

		sue.apps.homepage.cons.curListId=sue.apps.homepage.listId;
		if(sue.apps.homepage.cons.curListId==null){
			sue.apps.homepage.cons.curListId=0;
		}
		sue.apps.homepage.listSwitch(dom,sue.apps.homepage.cons.curListId);

		if(sue.apps.homepage.config.n_homepage_bg){
			dom.querySelector(".su_head").style.background="none";
			dom.querySelector(".su_main").style.cssText+="background:none;box-shadow:rgba(0,0,0,0.8) 0 0 5px;";
			dom.style.cssText+="background-color:#ccc;background-size:cover;border-color:rgba(252, 252, 252, 0);";
			chrome.runtime.sendMessage({type:"appsAction",app:"homepage",action:"getImageURL"});
		}

		dom.addEventListener("click",this.handleEvent,false);
	},
	listInit:function(e){
		let _dom=sue.apps.homepage.dom.querySelector(".su_homepage_listitembox");
		let _ul=sue.apps.domCreate("ul",{setName:["className"],setValue:["su_homepage_listul"]});
		_dom.textContent="";
		let _groups=sue.apps.homepage.config.sitegroup.slice(0);
		_groups.unshift(sue.apps.i18n("homepage_grouptop"));
		for(var i=0;i<_groups.length;i++){
			var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_homepage_listli"]},null,null,{setName:["id"],setValue:[i]},_groups[i]);
			_ul.appendChild(_li);
		}
		_dom.appendChild(_ul);
		// sue.apps.homepage.listSwitch(e);
		sue.apps.homepage.listInitEditmode(e);
	},
	listInitEditmode:function(e){
		let _domList=sue.apps.getAPPboxEle(e).querySelector(".su_homepage_listbox");
		if(sue.apps.homepage.cons.editMode){
			let _listAddBtn=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_listaddbtn"]},null,"background:url("+chrome.runtime.getURL("image/add.svg")+") no-repeat 2px 5px #e7e9fd;",null,sue.apps.i18n("homepage_newgroup"));
			_domList.appendChild(_listAddBtn);
		}else{
			let _listAddBtn=_domList.querySelector(".su_homepage_listaddbtn");
			_listAddBtn?_listAddBtn.remove():null;
		}

		let _listLis=sue.apps.getAPPboxEle(e).querySelectorAll(".su_homepage_listul li");
		if(sue.apps.homepage.cons.editMode){
			for(var i=1;i<_listLis.length;i++){
				var _spanDel=sue.apps.domCreate("span",{setName:["className","title"],setValue:["su_homepage_listbtndel",sue.apps.i18n("btn_del")]},null,null,{setName:["id"],setValue:i},"x");
				_listLis[i].appendChild(_spanDel);
			}
		}else{
			for(var i=1;i<_listLis.length;i++){
				var _spanDel=_listLis[i].querySelector(".su_homepage_listbtndel");
				_spanDel?_spanDel.remove():null;
			}
		}
		let curId=sue.apps.homepage.cons.curListId;
		sue.apps.homepage.itemInit(curId,e);
		for(var i=0;i<_listLis.length;i++){
			if(i==curId){
				_listLis[i].classList.add("su_homepage_listlicur");
			}else{
				_listLis[i].classList.remove("su_homepage_listlicur");
			}
		}
	},
	listSwitch:function(e,id){
		if(id!=null){
			sue.apps.homepage.cons.curListId=id;
			//if id>length, set to 0
			if(id>sue.apps.homepage.config.sitegroup.length){
				sue.apps.homepage.cons.curListId=0;
			}
		}else if(e.target&&e.target.classList&&e.target.classList.contains("su_homepage_listli")){
			sue.apps.homepage.cons.curListId=e.target.dataset.id;
		}
		if(sue.apps.homepage.config.n_homepage_last){
			chrome.runtime.sendMessage({type:"appsAction",app:"homepage",action:"setListId",value:sue.apps.homepage.cons.curListId})
		}
		sue.apps.homepage.itemInit(sue.apps.homepage.cons.curListId,e);
		let _lis=(sue.apps.getAPPboxEle(e)).querySelectorAll(".su_homepage_listul li");
		for(var i=0;i<_lis.length;i++){
			if(i==sue.apps.homepage.cons.curListId){
				_lis[i].classList.add("su_homepage_listlicur");
			}else{
				_lis[i].classList.remove("su_homepage_listlicur");
			}
		}
		sue.apps.homepage.listShow(e);
	},
	listNew:function(e){
		let dom=sue.apps.getAPPboxEle(e)/*.querySelector(".su_apps")*/,
			domBg=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_editbg"]}),
			domBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_editbox"]});

		let boxMain=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_addboxmain"]}),
			boxTitleLabel=sue.apps.domCreate("label",{setName:["className"],setValue:["su_homepage_addboxlabel"]},null,null,null,sue.apps.i18n("homepage_grouptitle")),
			boxTitle=sue.apps.domCreate("input",{setName:["className","type"],setValue:["su_homepage_boxtitle","text"]});
		boxMain.appendChild(boxTitleLabel);
		boxMain.appendChild(boxTitle);
		domBox.appendChild(boxMain);

		let boxBtn=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_addboxbtn"]}),
			boxBtnClose=sue.apps.domCreate("button",{setName:["className"],setValue:["su_homepage_boxbtncancel"]},null,null,null,sue.apps.i18n("btn_cancel")),
			boxBtnSave=sue.apps.domCreate("button",{setName:["className"],setValue:["su_homepage_listbtnadd"]},null,null,null,sue.apps.i18n("btn_done"));
		boxBtn.appendChild(boxBtnClose);
		boxBtn.appendChild(boxBtnSave);
		domBox.appendChild(boxBtn);

		dom.appendChild(domBg);
		dom.appendChild(domBox);
	},
	listNewSave:function(e){
		sue.apps.homepage.config.sitegroup.push(sue.apps.getAPPboxEle(e).querySelector(".su_homepage_boxtitle").value);
		sue.apps.homepage.config.sites.push([]);
		sue.apps.homepage.saveConf();
		sue.apps.homepage.listInit(e);
	},
	listEdit:function(e){
		let id=parseInt(e.target.dataset.id)-1;
		if(id==-1){return;}
		let dom=sue.apps.getAPPboxEle(e)/*.querySelector(".su_apps")*/,
			domBg=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_editbg"]}),
			domBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_editbox"]});

		let boxMain=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_addboxmain"]}),
			boxTitleLabel=sue.apps.domCreate("label",{setName:["className"],setValue:["su_homepage_addboxlabel"]},null,null,null,sue.apps.i18n("homepage_grouptitle")),
			boxTitle=sue.apps.domCreate("input",{setName:["className","type","value"],setValue:["su_homepage_boxtitle","text",sue.apps.homepage.config.sitegroup[id]]});
		boxMain.appendChild(boxTitleLabel);
		boxMain.appendChild(boxTitle);
		domBox.appendChild(boxMain);

		let boxBtn=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_addboxbtn"]}),
			boxBtnClose=sue.apps.domCreate("button",{setName:["className"],setValue:["su_homepage_boxbtncancel"]},null,null,null,sue.apps.i18n("btn_cancel")),
			boxBtnSave=sue.apps.domCreate("button",{setName:["className"],setValue:["su_homepage_listbtnedit"]},null,null,{setName:["id"],setValue:[id]},sue.apps.i18n("btn_done"));
		boxBtn.appendChild(boxBtnClose);
		boxBtn.appendChild(boxBtnSave);
		domBox.appendChild(boxBtn);

		dom.appendChild(domBg);
		dom.appendChild(domBox);
	},
	listEditSave:function(e){
		sue.apps.homepage.config.sitegroup[e.target.dataset.id]=sue.apps.getAPPboxEle(e).querySelector(".su_homepage_boxtitle").value;
		console.log(sue.apps.homepage.config.sitegroup[e.target.dataset.id]);
		sue.apps.homepage.saveConf();
		sue.apps.homepage.listInit(e);
	},
	listDel:function(e){
		let dom=sue.apps.getAPPboxEle(e);
		let id=parseInt(e.target.parentNode.dataset.id)-1;
		sue.apps.homepage.cons.curListId=parseInt(e.target.parentNode.dataset.id)-1;
		if(window.confirm(sue.apps.i18n("homepage_cfmlistdel"))){
			sue.apps.homepage.config.sitegroup.splice(id,1);
			sue.apps.homepage.config.sites.splice(id,1)
			sue.apps.homepage.saveConf();
			sue.apps.homepage.listInit(sue.apps.getAPPboxEle(e));			
		}
	},
	listShow:function(e){
		let _dom=(e?sue.apps.getAPPboxEle(e):false)||sue.apps.homepage.dom;
			_dom=_dom.querySelector(".su_homepage_listbox");
		_dom.style.display=window.getComputedStyle(_dom).display=="none"?"block":"none";
	},
	saveConf:function(){
		chrome.runtime.sendMessage({type:"apps_saveconf",apptype:"homepage",config:sue.apps.homepage.config});
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_homepage_item")){
					if(sue.apps.homepage.cons.editMode){
						sue.apps.homepage.itemEdit(e);
					}else{
						chrome.runtime.sendMessage({type:"appsAction",app:"homepage",action:"openItem",value:e.target.dataset.url})
						if(sue.apps.homepage.config.n_closebox){
							sue.apps.boxClose(e);
						}						
					}
				}else if(e.target.classList.contains("su_homepage_listli")){
					sue.apps.homepage.cons.editMode?sue.apps.homepage.listEdit(e):sue.apps.homepage.listSwitch(e);
				}else if(e.target.classList.contains("su_homepage_listaddbtnbox")){
					sue.apps.homepage.showAddbox(e);
				}else if(e.target.classList.contains("su_homepage_listaddbtn")){
					sue.apps.homepage.listNew(e);
				}else if(e.target.classList.contains("su_homepage_listbtnadd")){
					sue.apps.homepage.listNewSave(e);
					sue.apps.homepage.itemEditClose(e);
				}else if(e.target.classList.contains("menu_item_homepagelist")){
					sue.apps.homepage.listShow(e);
				}else if(e.target.classList.contains("menu_item_homepageedit")){
					sue.apps.homepage.editMode(e);
					sue.apps.homepage.itemInit(sue.apps.getAPPboxEle(e).querySelector(".su_homepage_listlicur")?parseInt(sue.apps.getAPPboxEle(e).querySelector(".su_homepage_listlicur").dataset.id):0,e);
					sue.apps.homepage.listInit(e);
				}else if(e.target.classList.contains("su_homepage_itemadd")){
					sue.apps.homepage.itemNew(e);
				}else if(e.target.classList.contains("su_homepage_boxbtncancel")){
					sue.apps.homepage.itemEditClose(e);
				}else if(e.target.classList.contains("su_homepage_boxbtnnew")){
					sue.apps.homepage.itemNewSave(e);
					sue.apps.homepage.itemEditClose(e);
				}else if(e.target.classList.contains("su_homepage_boxbtnedit")){
					sue.apps.homepage.itemEditSave(e);
					sue.apps.homepage.itemEditClose(e);
				}else if(e.target.classList.contains("su_homepage_itembtndel")){
					sue.apps.homepage.itemDel(e);
				}else if(e.target.classList.contains("su_homepage_listbtnedit")){
					sue.apps.homepage.listEditSave(e);
					sue.apps.homepage.itemEditClose(e);
				}else if(e.target.classList.contains("su_homepage_listbtndel")){
					sue.apps.homepage.listDel(e);
				}else if(e.target.classList.contains("su_homepage_ctmbtnsave")){
					sue.apps.homepage.itemCTMSave(e);
					sue.apps.homepage.itemEditClose(e);
				}
		}
	},
	editMode:function(e){
		if(e.target.classList.contains("su_homepage_editmode")){
			e.target.classList.remove("su_homepage_editmode");
			sue.apps.homepage.cons.editMode=false;
			sue.apps.getAPPboxEle(e).querySelector(".su_title").textContent=sue.apps.i18n("homepage");
		}else{
			e.target.classList.add("su_homepage_editmode");
			sue.apps.homepage.cons.editMode=true;
			sue.apps.getAPPboxEle(e).querySelector(".su_title").textContent=sue.apps.i18n("homepage")+" ("+sue.apps.i18n("homepage_editmode")+")";
		}
	},
	showAddbox:function(e){
		let _dom=e.target.parentNode.querySelector(".su_homepage_listaddvaluebox");
		_dom.style.display=window.getComputedStyle(_dom).display=="none"?"block":"none";
	},
	itemInit:function(id,e){
		var id=id||sue.apps.homepage.cons.curListId;
		let _dom=(e?sue.apps.getAPPboxEle(e):sue.apps.homepage.dom).querySelector(".su_homepage_box");
		let _ul=sue.apps.domCreate("ul",null,null,null,{setName:["idgp"],setValue:[id-1]});
		_dom.textContent="";
		_dom.appendChild(_ul);
		let sites=sue.apps.homepage.config.sites.slice(0);
		sites.unshift(sue.apps.homepage.topSites);
		for(var i=0;sites[id]&&i<sites[id].length;i++){
			var _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_homepage_li su_homepage_item"]},null,null,{setName:["url","id"],setValue:[sites[id][i].url,i]});
			var _div=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_item"]},null,null,{setName:["url","id"],setValue:[sites[id][i].url,i]});
			if(sue.apps.homepage.config.n_homepage_icon){
				var _img=sue.apps.domCreate("img",{setName:["className","src"],setValue:["su_homepage_item","https://www.google.com/s2/favicons?domain="+sites[id][i].url]},null,null,{setName:["url"],setValue:[sites[id][i].url]});
				_div.appendChild(_img);
			}
			var _span=sue.apps.domCreate("span",{setName:["className"],setValue:["su_homepage_item"]},null,null,{setName:["url","id"],setValue:[sites[id][i].url,i]},sites[id][i].title);
			sue.apps.homepage.config.n_homepage_icon?_span.style.cssText+="margin-left:24px;":null;
			_div.appendChild(_span);
			_li.appendChild(_div);
			_ul.appendChild(_li);
		}
		sue.apps.homepage.itemInitEditmode(_dom);
	},
	itemInitEditmode:function(e){
		if(sue.apps.homepage.cons.curListId==0){return;}
		let _dom=sue.apps.getAPPboxEle(e).querySelector(".su_homepage_box ul");
		if(sue.apps.homepage.cons.editMode){
			let _li=sue.apps.domCreate("li",{setName:["className"],setValue:["su_homepage_li su_homepage_item su_homepage_itemadd"]});
			_li.appendChild(sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_itemadd"]},null,"text-align:center",null,"+"));
			_dom.appendChild(_li);
		}else{
			let _li=_dom.querySelector(".su_homepage_itemadd");
			_li?_li.remove():null;
		}
		let _items=sue.apps.getAPPboxEle(e).querySelectorAll(".su_homepage_box li div.su_homepage_item");
		if(sue.apps.homepage.cons.editMode){
			for(var i=0;i<_items.length;i++){
				console.log(i)
				var _spanDel=sue.apps.domCreate("span",{setName:["className","title"],setValue:["su_homepage_itembtndel",sue.apps.i18n("btn_del")]},null,null,{setName:["id"],setValue:[i]},"x");
				_items[i].appendChild(_spanDel);
			}
		}else{
			for(var i=0;i<_items.length;i++){
				var _spanDel=_items[i].querySelector(".su_homepage_itembtndel");
				_spanDel?_spanDel.remove():null;
			}
		}
	},
	itemDel:function(e){
		let dom=sue.apps.getAPPboxEle(e);
		let idgp=parseInt(dom.querySelector(".su_homepage_box ul").dataset.idgp),
			id=parseInt(e.target.dataset.id);
		sue.apps.homepage.config.sites[idgp].splice(id,1);
		sue.apps.homepage.saveConf();
		sue.apps.homepage.itemInit(idgp+1,e);
	},
	itemEdit:function(e){
		let idgp=parseInt(sue.apps.getAPPboxEle(e).querySelector(".su_main ul").dataset.idgp),
			id=e.target.dataset.id;
		if(idgp==-1){return;}
		let dom=sue.apps.getAPPboxEle(e)/*.querySelector(".su_main")*/,
			domBg=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_editbg"]}),
			domBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_editbox"]});
		let boxMain=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_addboxmain"]}),
			boxTitleLabel=sue.apps.domCreate("label",{setName:["className"],setValue:["su_homepage_addboxlabel"]},null,null,null,sue.apps.i18n("homepage_sitetitle")),
			boxTitle=sue.apps.domCreate("input",{setName:["className","type","value"],setValue:["su_homepage_boxtitle","text",sue.apps.homepage.config.sites[idgp][id].title]}),
			boxUrlLabel=sue.apps.domCreate("label",{setName:["className"],setValue:["su_homepage_addboxlabel"]},null,null,null,sue.apps.i18n("homepage_siteurl")),
			boxUrl=sue.apps.domCreate("input",{setName:["className","type","value"],setValue:["su_homepage_boxurl","text",sue.apps.homepage.config.sites[idgp][id].url]});
		boxMain.appendChild(boxTitleLabel);
		boxMain.appendChild(boxTitle);
		boxMain.appendChild(boxUrlLabel);
		boxMain.appendChild(boxUrl);
		domBox.appendChild(boxMain);

		let boxBtn=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_addboxbtn"]}),
			boxBtnClose=sue.apps.domCreate("button",{setName:["className"],setValue:["su_homepage_boxbtncancel"]},null,null,null,sue.apps.i18n("btn_cancel")),
			boxBtnSave=sue.apps.domCreate("button",{setName:["className"],setValue:["su_homepage_boxbtnedit"]},null,null,{setName:["idgp","id"],setValue:[idgp,id]},sue.apps.i18n("btn_done"));
		boxBtn.appendChild(boxBtnClose);
		boxBtn.appendChild(boxBtnSave);
		domBox.appendChild(boxBtn);

		dom.appendChild(domBg);
		dom.appendChild(domBox);
	},
	itemEditSave(e){
		let dom=sue.apps.getAPPboxEle(e);
		let idgp=parseInt(e.target.dataset.idgp),
			id=parseInt(e.target.dataset.id);
		sue.apps.homepage.config.sites[idgp][id].title=dom.querySelector(".su_homepage_boxtitle").value;
		sue.apps.homepage.config.sites[idgp][id].url=dom.querySelector(".su_homepage_boxurl").value;
		sue.apps.homepage.saveConf();
		sue.apps.homepage.itemInit(idgp+1,e);
	},
	itemNew:function(e){
		let dom=sue.apps.getAPPboxEle(e)/*.querySelector(".su_main")*/,
			domBg=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_editbg"]}),
			domBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_editbox"]});

		let boxMain=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_addboxmain"]}),
			boxTitleLabel=sue.apps.domCreate("label",{setName:["className"],setValue:["su_homepage_addboxlabel"]},null,null,null,sue.apps.i18n("homepage_sitetitle")),
			boxTitle=sue.apps.domCreate("input",{setName:["className","type"],setValue:["su_homepage_boxtitle","text"]}),
			boxUrlLabel=sue.apps.domCreate("label",{setName:["className"],setValue:["su_homepage_addboxlabel"]},null,null,null,sue.apps.i18n("homepage_siteurl")),
			boxUrl=sue.apps.domCreate("input",{setName:["className","type","placeholder"],setValue:["su_homepage_boxurl","text",sue.apps.i18n("homepage_placeurl")]});
		boxMain.appendChild(boxTitleLabel);
		boxMain.appendChild(boxTitle);
		boxMain.appendChild(boxUrlLabel);
		boxMain.appendChild(boxUrl);
		domBox.appendChild(boxMain);

		let boxBtn=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_addboxbtn"]}),
			boxBtnClose=sue.apps.domCreate("button",{setName:["className"],setValue:["su_homepage_boxbtncancel"]},null,null,null,sue.apps.i18n("btn_cancel")),
			boxBtnSave=sue.apps.domCreate("button",{setName:["className"],setValue:["su_homepage_boxbtnnew"]},null,null,null,sue.apps.i18n("btn_done"));
		boxBtn.appendChild(boxBtnClose);
		boxBtn.appendChild(boxBtnSave);
		domBox.appendChild(boxBtn);

		dom.appendChild(domBg);
		dom.appendChild(domBox);
	},
	itemNewSave:function(e){
		let dom=sue.apps.getAPPboxEle(e);
		let idgp=parseInt(sue.apps.getAPPboxEle(e).querySelector(".su_homepage_box ul").dataset.idgp);
		if(idgp==-1){return}
		let obj={
			title:dom.querySelector(".su_homepage_editbox .su_homepage_boxtitle").value,
			url:sue.apps.fixURL(dom.querySelector(".su_homepage_editbox .su_homepage_boxurl").value)
		}
		sue.apps.homepage.config.sites[idgp].push(obj);
		sue.apps.homepage.saveConf();
		sue.apps.homepage.itemInit(idgp+1,e);
	},
	itemEditClose:function(e){
		let dom=sue.apps.getAPPboxEle(e);
		let domEdit=dom.querySelector(".su_homepage_editbox")||dom.querySelector(".su_homepage_itemeditbox")||dom.querySelector(".su_homepage_editbox"),
			domBg=dom.querySelector(".su_homepage_editbg")||dom.querySelector(".su_homepage_editbg");
		domEdit.remove();
		domBg.remove();
	},
	itemCTM:function(){
		console.log("ctm");
		let dom=sue.apps.getAPPboxEle(sue.apps.homepage.dom)/*.querySelector(".su_main")*/,
			domBg=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_editbg"]}),
			domBox=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_editbox"]});
		let boxMain=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_addboxmain"]}),
			boxGroupLabel=sue.apps.domCreate("label",{setName:["className"],setValue:["su_homepage_addboxlabel"]},null,null,null,sue.apps.i18n("homepage_grouptitle")),
			boxgroup=sue.apps.domCreate("select",{setName:["className","type","value"],setValue:["su_homepage_boxgroup","text",sue.apps.homepage.ctm.title]}),
			boxTitleLabel=sue.apps.domCreate("label",{setName:["className"],setValue:["su_homepage_addboxlabel"]},null,null,null,sue.apps.i18n("homepage_sitetitle")),
			boxTitle=sue.apps.domCreate("input",{setName:["className","type","value"],setValue:["su_homepage_boxtitle","text",sue.apps.homepage.ctm.title]}),
			boxUrlLabel=sue.apps.domCreate("label",{setName:["className"],setValue:["su_homepage_addboxlabel"]},null,null,null,sue.apps.i18n("homepage_siteurl")),
			boxUrl=sue.apps.domCreate("input",{setName:["className","type","value"],setValue:["su_homepage_boxurl","text",sue.apps.homepage.ctm.url]});
		for(var i=0;i<sue.apps.homepage.config.sitegroup.length;i++){
			var option=sue.apps.domCreate("option",null,null,null,null,sue.apps.homepage.config.sitegroup[i]);
			boxgroup.appendChild(option);
		}
		boxgroup.selectedIndex=(sue.apps.homepage.listId-1)<0?0:(sue.apps.homepage.listId-1);
		boxMain.appendChild(boxGroupLabel);
		boxMain.appendChild(boxgroup);
		boxMain.appendChild(boxTitleLabel);
		boxMain.appendChild(boxTitle);
		boxMain.appendChild(boxUrlLabel);
		boxMain.appendChild(boxUrl);
		domBox.appendChild(boxMain);

		let boxBtn=sue.apps.domCreate("div",{setName:["className"],setValue:["su_homepage_addboxbtn"]}),
			boxBtnClose=sue.apps.domCreate("button",{setName:["className"],setValue:["su_homepage_boxbtncancel"]},null,null,null,sue.apps.i18n("btn_cancel")),
			boxBtnSave=sue.apps.domCreate("button",{setName:["className"],setValue:["su_homepage_ctmbtnsave"]},null,null,{setName:["idgp","id"],setValue:["idgp","id"]},sue.apps.i18n("btn_done"));
		boxBtn.appendChild(boxBtnClose);
		boxBtn.appendChild(boxBtnSave);
		domBox.appendChild(boxBtn);

		dom.appendChild(domBg);
		dom.appendChild(domBox);
	},
	itemCTMSave:function(e){
		let dom=sue.apps.getAPPboxEle(e);
		let idgp=sue.apps.getAPPboxEle(e).querySelector(".su_homepage_boxgroup").selectedIndex;
		let obj={
			title:dom.querySelector(".su_homepage_editbox .su_homepage_boxtitle").value,
			url:sue.apps.fixURL(dom.querySelector(".su_homepage_editbox .su_homepage_boxurl").value)
		}
		sue.apps.homepage.config.sites[idgp].push(obj);
		sue.apps.homepage.saveConf();
		sue.apps.homepage.itemInit(idgp+1,e);
	},
	setBackground:function(data){
		let dom=sue.apps.homepage.dom;
		dom.style.cssText+="background-image:url("+data.imageURL+");background-size:cover;";
		if(sue.apps.homepage.config.n_homepage_resize){
			dom.style.padding="48px 32px";
			dom.querySelector(".su_head").style.height="168px;";
		}else{
			dom.style.cssText+="padding-bottom:10px;";
		}

		let _cp;
		if(dom.querySelector(".su_homepage_cp")){
			_cp=dom.querySelector(".su_homepage_cp");
			_cp.href=data.copyrightURL;
			_cp.innerText=data.copyrightString;
		}else{
			_cp=sue.apps.domCreate("a",{setName:["className","href","target"],setValue:["su_homepage_cp",data.copyrightURL,"_blank"]},null,null,null,data.copyrightString);
			dom.appendChild(_cp);
		}
	}
}
chrome.runtime.sendMessage({type:"apps_getvalue",apptype:"homepage"},function(response){
	console.log(response)
	sue.apps.homepage.config=response.config;
	sue.apps.homepage.topSites=response.value.sites;
	sue.apps.homepage.listId=response.value.listId;
	sue.apps.homepage.ctm=response.value.ctm;
	sue.apps.homepage.initUI();
})
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	switch(message.type){
		case"imageURL":
			sue.apps.homepage.setBackground(message.value);
			break;
	}
})