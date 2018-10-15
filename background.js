function addPopup() {
	var url = 'https://*.autotask.net/*';
	var setting = 'popups';
	
	chrome.contentSettings[setting].set({
			'primaryPattern': url,
			'setting': 'allow'
		  });
  }

function removePopup() {
	var setting = 'popups';
	console.log(' Clearing setting for '+setting);
	
	chrome.contentSettings[setting].clear({});
}
// Add Autotask url to popup whitelist
addPopup()

// Gets last tab
var preURL = ""
chrome.webNavigation.onCommitted.addListener(function(object)
	{ 
		chrome.tabs.get(object.tabId, function(tab)
		{
			preURL = tab.url
		});
	});
// Moves popup to end of window. 
chrome.windows.getCurrent({},function(w){
	var mainwindow = w.id;
	chrome.windows.onCreated.addListener(function(w){
		if(w.type == "popup" ){
			chrome.windows.get(w.id,{populate:true},function(w){
				chrome.tabs.query({
					active: true,
					windowId: w.id
				}, function (tabs) {
					console.log(preURL)
					if (preURL.startsWith('https://ww4.autotask.net')){
						chrome.tabs.move(w.tabs[0].id,{windowId:mainwindow,index:-1},function(){
							chrome.tabs.update(w.tabs[0].id,{active:true});
						});
					}
				});
			});
		}
	});
});

