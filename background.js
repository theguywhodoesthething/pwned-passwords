chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(tab.ib, {
        file: 'jquery-3.3.1.min.js'
    });
    chrome.tabs.executeScript(tab.ib, {
        file: 'pwned.js'
    });
});