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


  // This script runs in the background and handles the video watching limit feature

// Constants
const VIDEOS_LIMIT = 2; // Maximum number of videos per hour

// Function to reset the video count after an hour
function resetVideoCount() {
  browser.storage.local.set({ videoCount: 0 });
}

// Function to handle video page replacement
function replaceVideoPage() {
  // TODO: Replace the video page with a custom page that tells the user to come back soon
}

// Event listener for alarm triggered
browser.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "resetVideoCount") {
    resetVideoCount();
  }
});

// Content script message listener
browser.runtime.onMessage.addListener((message) => {
  if (message.type === "videoWatched") {
    browser.storage.local.get("videoCount").then((response) => {
      const videoCount = response.videoCount || 0;
      if (videoCount >= VIDEOS_LIMIT) {
        replaceVideoPage();
      } else {
        browser.storage.local.set({ videoCount: videoCount + 1 });
      }
    });
  }
});
