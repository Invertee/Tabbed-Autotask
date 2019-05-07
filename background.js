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

//Gets last tab
var preInd = []
var prewID = []

// Pushes url to array to make sure it works off the bat ;)
for (var i = 0; i < 6; i++) {
	preInd.push(1)
	prewID.push(1)
};

chrome.tabs.onActivated.addListener( t => {
	chrome.tabs.query({active: true, currentWindow: true}, tabs =>
	{
		preInd.push( tabs[0].index )
		if (preInd.length > 6) { preInd.shift() }
		//console.log(preInd)
		prewID.push( tabs[0].windowId )
		if (prewID.length > 6) { prewID.shift() }
		//console.log(prewID)
	});	
});

var AT = true
chrome.tabs.onActivated.addListener( t => {
	chrome.tabs.executeScript(null, {
		file: 'url.js'
	});
})

chrome.tabs.onUpdated.addListener( t => {
	chrome.tabs.executeScript(null, {
		file: 'url.js'
	});
})

chrome.runtime.onMessage.addListener(m => {
	if ( m.url.startsWith('https://ww4.autotask.net')) {AT = true} else {AT = false } 
	//console.log(m)
})


// Moves popup to end of window. 
	chrome.windows.onCreated.addListener( w => {
		if(w.type == "popup" ){
			chrome.windows.get(w.id,{populate:true}, w => {
				chrome.tabs.query({
					active: true,
					windowId: w.id
				}, tabs => {
					if (AT) {
						if (localStorage.nextTab == 'true') {
						chrome.tabs.move(w.tabs[0].id,{windowId:prewID[4],index:(preInd[4] + 1)}, () => {
							chrome.tabs.update(w.tabs[0].id,{active:true});
						});
					} else {
						chrome.tabs.move(w.tabs[0].id,{windowId:prewID[4],index:-1},() => {
							chrome.tabs.update(w.tabs[0].id,{active:true});
						});
					};
				};
				});
			});
		}

		if (localStorage.rename == 'true') {
			chrome.tabs.executeScript(null, {
				file: 'title.js'
			});
		}
	});