(() => {
  let ytRightControls, ytPlayer;
  let currentVideo = new String();
  let currentVideoBookmarks = [];
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;

    if (type === "NEW") {
      currentVideo = videoId;
      newVideoLoaded();
    }
  });

  const fetchBookmarks = () => {
    return new Promise((resolve) => {
      chrome.storage.sync.get([currentVideo], (obj) => {
        resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
      });
    });
  };
  const newVideoLoaded = async () => {
    const bookmarkBtnExists =
      document.getElementsByClassName("bookmark-btn")[0];
    currentVideoBookmarks = await fetchBookmarks();

    if (!bookmarkBtnExists) {
      const bookmarkBtn = document.createElement("img");

      bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
      bookmarkBtn.className = "ytp-button " + "bookmark-btn";
      bookmarkBtn.style = "scale: 0.5;";
      bookmarkBtn.title = "Click to bookmark current timestamp";

      ytRightControls =
        document.getElementsByClassName("ytp-right-controls")[0];
      ytPlayer = document.getElementsByClassName("video-stream")[0];

      ytRightControls.prepend(bookmarkBtn);
      bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
    }
  };
  const addNewBookmarkEventHandler = async () => {
    const currentTime = ytPlayer.currentTime;

    const newBookmark = {
      time: currentTime,
      desc: "Bookmark at " + convert(currentTime),
    };

    currentVideoBookmarks = await fetchBookmarks();
    chrome.storage.sync.set({
      [currentVideo]: JSON.stringify(
        [...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time)
      ),
    });
  };
  newVideoLoaded();
})();

const convert = (t) => {
  var date = new Date(0);
  date.setSeconds(t);
  return date.toISOString().substring(11, 19);
};
