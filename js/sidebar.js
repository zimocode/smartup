window.close();
document.write("s")
chrome.sidebarAction.getPanel({tabId:8},function(panelURL){
	document.write(panelURL);
})
chrome.sidebarAction.getPanel({tabId:8}).then(function(s){console.log(s);document.write(s)})