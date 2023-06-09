console.clear();

/**
 * Remove recommended video pannel
 */
const removeRecommendedVidePannel = async () => {
  const { isChecked } = await browser.storage.local.get("isChecked");
  if (isChecked) {
    const style = document.createElement("style");
    style.textContent = `
      #secondary {
        display: none !important;
      }
     `;
    document.head.appendChild(style);
  }
};

/**
 * Hide Comment and primary
 */
const removeCommentAndPrimary = async () => {
  const { isComment } = await browser.storage.local.get("isComment");
  if (isComment) {
    const style = document.createElement("style");
    style.textContent = `
    #comments {
      display: none !important;
    }
    #primary {
      margin-left: auto !important;
      margin-right: auto !important;
    }
  `;
    document.head.appendChild(style);
  }
};

/**
 * Hide short video pannel
 */
const hideShortVideoPannel = async () => {
  const { isShort } = await browser.storage.local.get("isShort");
  if (isShort) {
    const style = document.createElement("style");
    style.textContent = `
    ytd-rich-section-renderer .ytd-rich-section-renderer {
    display: none !important;
  }
`;
    document.head.appendChild(style);
  }
};

/**
 * Hide View Rating and Views
 */
const hideRatingAndView = async () => {
  const { isRatingAndViews } = await browser.storage.local.get(
    "isRatingAndViews"
  );
  if (isRatingAndViews) {
    const style = document.createElement("style");
    style.textContent = `
    #info span:first-child {
      display: none !important;
    }
`;
    document.head.appendChild(style);
  }
};

/**
 * Blur video thumb
 */
const blurYouTubeVideoThumb = async () => {
  const { isBlur } = await browser.storage.local.get("isBlur");
  if (isBlur) {
    const style = document.createElement("style");
    //     style.textContent = `
    //   .yt-simple-endpoint.style-scope.ytd-thumbnail {
    //     filter: blur(8px) !important;
    //   }
    // `;
    style.textContent = `#thumbnail, .yt-simple-endpoint.style-scope.ytd-thumbnail  {
  filter: blur(8px) !important;
}`;
    document.head.appendChild(style);
  }
};

if (document.readyState !== "loading") {
  removeRecommendedVidePannel();
  removeCommentAndPrimary();
  hideShortVideoPannel();
  hideRatingAndView();
  blurYouTubeVideoThumb();
} else {
  document.addEventListener("DOMContentLoaded", () => {
    removeCommentAndPrimary();
    removeRecommendedVidePannel();
    hideShortVideoPannel();
    hideRatingAndView();
    blurYouTubeVideoThumb();
  });
}

/**
 * Set timer duration
 * Start from here
 */

const startTimer = (duration) => {
  const timerElemnt = document.createElement("div");
  timerElemnt.style.position = "fixed";
  timerElemnt.style.top = "10px";
  timerElemnt.style.right = "10px";
  timerElemnt.style.padding = "10px";
  timerElemnt.style.background = "rgba(0, 0, 0, 0.8)";
  timerElemnt.style.color = "#fff";
  timerElemnt.style.fontSize = "18px";
  timerElemnt.style.zIndex = "999999";

  document.body.appendChild(timerElemnt);

  let secondsRemaining = duration;

  const interValId = setInterval(() => {
    if (secondsRemaining <= 0) {
      clearInterval(interValId);

      // You can add additional actions once the timer ends
      // For example, redirect to another page or show a notification
    } else {
      const minutes = Math.floor(secondsRemaining / 60);
      const seconds = secondsRemaining % 60;
      timerElement.textContent = `Timer: ${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
      secondsRemaining--;
    }
  }, 1000);
};
// get video duration from the youtube
const getVideoDuration = () => {
  const durationElement = document.querySelector(".ytp-time-duration");
  if (durationElement) {
    const durationText = durationElement.textContent;
    const durationMatch = durationText.match(/(\d+):(\d+)/);
    if (durationMatch) {
      const minutes = parseInt(durationMatch[1]);
      const seconds = parseInt(durationMatch[2]);
      return minutes * 60 + seconds;
    }
  }
  return null;
};

// check if video is short
const isShortVideo = () => {
  const videoElement = document.querySelector("video");
  if (videoElement) {
    const duration = getVideoDuration();
    if (duration && duration <= 60) {
      return true;
    }
  }
  return false;
};
// Get the timer duration from the storage or use the default value
const getTimerDuration = () => {
  return new Promise((resolve) => {
    browser.storage.local.get("timerDuration").then((result) => {
      const timerDuration = result.timerDuration || 20;
      resolve(timerDuration);
    });
  });
};
// handle youtube page load
const handleYouTubeVideoLoaded = async () => {
  const isShort = isShortVideo();
  const timerDuration = await getTimerDuration();
  const duration = isShort ? 60 : timerDuration;
  startTimer(duration);
};

handleYouTubePageLoad();
