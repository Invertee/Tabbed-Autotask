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
if (localStorage.popup == 'true') { addPopup() } else { removePopup() }

// Gets last tab
var preURL = []
var preInd = []
var prewID = []
// Pushes url to array to make sure it works off the bat ;)
for (var i = 0; i < 6; i++) {
	preURL.push('https://ww4.autotask.net')
	preInd.push(1)
	prewID.push(1)
};

chrome.tabs.onActivated.addListener(function(t){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
	{
		preURL.push( tabs[0].url )
		if (preURL.length > 6) { preURL.shift() }
		//console.log(preURL)
		preInd.push( tabs[0].index )
		if (preInd.length > 6) { preInd.shift() }
		//console.log(preInd)
		prewID.push( tabs[0].windowId )
		if (prewID.length > 6) { prewID.shift() }
		//console.log(prewID)
	});	
});

var urlString = 'https://ww4.autotask.net'
// Moves popup to end of window. 
	chrome.windows.onCreated.addListener(function(w){
		if(w.type == "popup" ){
			chrome.windows.get(w.id,{populate:true},function(w){
				chrome.tabs.query({
					active: true,
					windowId: w.id
				}, function (tabs) {
					if (preURL[0].startsWith(urlString) || preURL[1].startsWith(urlString) || preURL[2].startsWith(urlString) || preURL[3].startsWith(urlString) || preURL[4].startsWith(urlString) || preURL[5].startsWith(urlString)) {
						if (localStorage.nextTab == 'true') {
						chrome.tabs.move(w.tabs[0].id,{windowId:prewID[4],index:(preInd[4] + 1)},function(){
							chrome.tabs.update(w.tabs[0].id,{active:true});
						});
					} else {
						chrome.tabs.move(w.tabs[0].id,{windowId:prewID[4],index:-1},function(){
							chrome.tabs.update(w.tabs[0].id,{active:true});
						});
					};
					}
				});
			});
		}

		if (localStorage.rename == 'true') {
			chrome.tabs.executeScript(null, {
				file: 'title.js'
			});
		}
	});

chrome.tabs.onUpdated.addListener( function(w) {
	if (localStorage.rename == 'true') {
		chrome.tabs.executeScript(null, {
			file: 'title.js'
		});
	}
})