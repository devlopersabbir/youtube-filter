browser.storage.local
  .get("isChecked")
  .then((res) => console.log("res show recommanded vide: ", res))
  .catch((error) => console.log("errro:", error));

browser.storage.local
  .get("isComment")
  .then((res) => console.log("res isCommnet", res))
  .catch((error) => console.log("errro:", error));

browser.storage.local
  .get("isRatingAndViews")
  .then((res) => console.log("res Rating and View", res))
  .catch((error) => console.log("errro:", error));

browser.storage.local
  .get("isShort")
  .then((res) => console.log("res Rating and View", res))
  .catch((error) => console.log("errro:", error));

browser.storage.local
  .get("timerDuration")
  .then((res) => console.log("timeduration: ", res));

//
//
//
// Check if the user has used YouTube before
browser.storage.local.get("firstTimeUsage").then((result) => {
  console.log("if a user first time use youtube", result);
  if (!result.firstTimeUsage) {
    // Set the first time usage flag and current timestamp
    browser.storage.local.set({ firstTimeUsage: true, startTime: Date.now() });
  }
});

// Listen for video play events from the content script
browser.runtime.onMessage.addListener((message) => {
  if (message === "videoPlay") {
    console.log("=========hello===========");
    // Get the current video play count
    browser.storage.local.get("playCount").then((result) => {
      const playCount = result.playCount || 0;
      // const newPlayCount = playCount + 1;

      // Update the play count
      // browser.storage.local.set({ playCount: newPlayCount });

      // Check if the play count exceeds the limit within one hour
      browser.storage.local.get("maxVideos").then(({ maxVideos }) => {
        console.log("max video: ", maxVideos);
        if (playCount >= maxVideos) {
          browser.storage.local.set({ playCount: 0 });
          browser.runtime.openOptionsPage();
        }
      });
    });
  }
});
