chrome.tabs.onUpdated.addListener((tabID,tab) =>{
    if (tab.url && tab.url.includes("youtube.com/watch")){
        const queryParameters = tab.url.split("?")[1];
        const urlParameters = new URLSearchParams(queryParameters);

        console.log(urlParameters);
        chrome.tabs.sendMessage(tabID, {
            type: "NEW",
            videoID : urlParameters.get("v"),
        });

    }
})
  