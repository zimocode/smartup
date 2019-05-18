console.log("random")
sue.apps.random={
	cons:{
		boxmove:{}
	},
	initUI:function(){
		let appInfo={
			appName:"random",
			headTitle:"random",
			headCloseBtn:true
		}
		sue.apps.init();
		var dom=sue.apps.initBox(appInfo);
			dom.id="su_apps_"+appInfo.appName;
		sue.apps[appInfo.appName].dom=dom;
		sue.apps.initPos(dom);

		let theAppBox=sue.apps.domCreate("div",{setName:["className"],setValue:["randombox"]});
		dom.querySelector(".su_main").appendChild(theAppBox);

		let _node={
			printText:sue.apps.domCreate("input",{setName:["id"],setValue:["su_random_print"]}),
			brPrint:sue.apps.domCreate("br"),
			boundSpan:sue.apps.domCreate("span",{setName:["className"],setValue:["su_random_span"]},null,null,null,sue.apps.i18n("app_random_bound")),
			minText:sue.apps.domCreate("input",{setName:["id","className"],setValue:["min","su_random_text"]}),
			dashSpan:sue.apps.domCreate("span",null,null,null,null,"~"),
			maxText:sue.apps.domCreate("input",{setName:["id","className"],setValue:["max","su_random_text"]}),
			brBound:sue.apps.domCreate("br"),
			numSpan:sue.apps.domCreate("span",{setName:["className"],setValue:["su_random_span"]},null,null,null,sue.apps.i18n("app_random_num")),
			numText:sue.apps.domCreate("input",{setName:["id","className"],setValue:["num","su_random_text"]}),
			brNum:sue.apps.domCreate("br"),
			norepeatCheck:sue.apps.domCreate("input",{setName:["id","className"],setValue:["su_random_norepeat","su_random_chkbox"]}),
			norepeatLabel:sue.apps.domCreate("label",null,null,null,null,sue.apps.i18n("app_random_norepeat")),
			brNorepeat:sue.apps.domCreate("br"),
			fillCheck:sue.apps.domCreate("input",{setName:["id","className"],setValue:["su_random_add","su_random_chkbox"]}),
			fillLabel:sue.apps.domCreate("label",null,null,null,null,sue.apps.i18n("app_random_fill")),
			brFill:sue.apps.domCreate("br"),
			btn:sue.apps.domCreate("button",{setName:["className"],setValue:["su_random_btn"]},null,null,null,sue.apps.i18n("btn_done"))
		}
		_node.printText.type=_node.minText.type=_node.maxText.type=_node.numText.type="text";
		_node.norepeatCheck.type="checkbox";
		_node.fillCheck.type="checkbox";
		_node.norepeatLabel.htmlFor="su_random_norepeat";
		_node.fillLabel.htmlFor="su_random_add";
		for(var i in _node){
			theAppBox.appendChild(_node[i]);
		}

		chrome.storage.local.get(function(items){
			let randData;
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
			
			_node.minText.value=randData.min;
			_node.maxText.value=randData.max;
			_node.numText.value=randData.num;
			_node.norepeatCheck.checked=randData.norepeat;
			_node.fillCheck.checked=randData.add;
			_node.btn.addEventListener("click",sue.apps.random.handleEvent,false);
		})
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
