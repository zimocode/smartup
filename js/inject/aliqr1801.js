console.log("aliqr1801")
sue.apps.aliqr1801={
	cons:{
		boxmove:{}
	},
	initUI:function(){
		sue.apps.init();
		var _appname="aliqr1801";
		var dom=sue.apps.domCreate("smartup",{setName:["className","id"],setValue:["su_apps","su_apps_"+_appname]},null,"z-index:"+parseInt((new Date().getTime())/1000),{setName:["appname"],setValue:[_appname]});
		dom.innerHTML=
			'<div class="su_head" style="">'
				+'<span class="su_title">'+sue.apps.i18n("aliqr1801")+'</span>'
				+'<div class="su_btn_close">x</div>'
			+'</div>'
			+'<div class="su_main">'
				+'<div class="aliqrbox">'
					+'<img src="'+chrome.runtime.getURL("/image/ali171217.jpg")+'">'
					+'<ul><li>1、此为支付宝的活动，所有红包由支付宝提供，每天可领取一次。</li><li>2、扫码后获得随机红包，线下消费后，本人也将获得一个红包。</li><li>3、本人一直坚持更新扩展，有你的支持我将更有动力。感谢！</li></ul>'
				+'</div>'
			+'</div>';
		sue.apps.initPos(dom);
	},
	handleEvent:function(e){
		switch(e.type){
			case"click":
				if(e.target.classList.contains("su_aliqr1801_btn")){
					sue.apps.aliqr1801.randnum(e);
				}
				break;
		}
	}
}
sue.apps.aliqr1801.initUI();
