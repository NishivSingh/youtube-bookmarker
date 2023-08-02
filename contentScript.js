(()=>{
    let ytLeftControls,ytPlayer;
    let currentVideo = new String();
    chrome.runtime.onMessage.addListener((obj,sender,response) =>{
        const {type,value,videoId} = obj;

        if (type === "NEW"){
            currentVideo = videoId;
            newVideoLoaded();
        }
    });

    const newVideoLoaded = () =>{
        const bookmarkBtnExists = doxument.getElementsByClassName("bookmark-btn")[0];

        console.log(bookmarkBtnExists);
    }
})();