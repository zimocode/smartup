console.log("apps.js");
chrome.runtime.sendMessage({type:"apps_back",value:sue.apps.enable},function(response){})
