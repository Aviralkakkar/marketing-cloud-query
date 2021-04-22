let active_tab_id =0;
chrome.tabs.onActivated.addListener ( tab => {
   
    chrome.tabs.get(tab.tabId, current_tab_info => {
        active_tab_id =  tab.tabId ;
        chrome.tabs.executeScript(null, { file : './app.js'}, () => console.log("Hey app page "))
    });
});