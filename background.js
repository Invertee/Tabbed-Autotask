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
var preURL = []
// Pushes url to array to make sure it works off the bat ;)
for (var i = 0; i < 3; i++) {
	preURL.push('https://ww4.autotask.net')
}
chrome.tabs.onActivated.addListener(function(w){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
	{
		preURL.push( tabs[0].url )
		if (preURL.length > 3) { preURL.shift() }
		console.log(preURL)
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
					if (preURL[1].startsWith('https://ww4.autotask.net')){
						chrome.tabs.move(w.tabs[0].id,{windowId:mainwindow,index:-1},function(){
						chrome.tabs.update(w.tabs[0].id,{active:true});
						});
					}
				});
			});
		}
	});
});

