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

      #primary {
        width: 100% !important;
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
  //   if (isRatingAndViews) {
  //     const style = document.createElement("style");
  //     style.textContent = `
  //     #info span:first-child, #metadata-line {
  //       display: none !important;
  //     }
  // `;

  //     document.head.appendChild(style);
  //   }
  if (isRatingAndViews) {
    const style = document.createElement("style");
    style.textContent = `
      #info, #metadata-line, #segmented-like-button .yt-spec-button-shape-next--button-text-content, #owner #owner-sub-count {
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
  // Notify the background script that a video has been watched
};

// Listen for message from background script to reset the video count
browser.runtime.onMessage.addListener((message) => {
  if (message.type === "resetVideoCount") {
    browser.storage.local.set({ videoCount: 0 });
  }
});

/**
 * Set timer duration
 * Start from here
 */
let currentVideoId = null;

// Function to extract video ID from the URL
const extractVideoId = (url) => {
  const regex = /[?&]v=([^&#]*)/;
  const match = regex.exec(url);
  return match ? match[1] : null;
};

// Function to increment the video play count
const incrementVideoPlayCount = async () => {
  browser.storage.local.get("playCount").then((result) => {
    const playCount = result.playCount || 0;
    const videoId = extractVideoId(window.location.href);

    if (videoId && videoId !== currentVideoId) {
      currentVideoId = videoId;
      const newPlayCount = playCount + 1;
      browser.storage.local.set({ playCount: newPlayCount });

      // send play message from the content file to background file
      browser.runtime.sendMessage("videoPlay");
      console.log("New video play");
      console.log("Play count:", newPlayCount);

      browser.storage.local.get("maxVideos").then(({ maxVideos }) => {
        console.log(" from content script file", maxVideos);
        if (newPlayCount >= maxVideos) {
          alert(
            `Breack your limit. MaxVideos: ${maxVideos} and total play: ${newPlayCount}`
          );

          console.log(
            `Breack your limit. MaxVideos: ${maxVideos} and total play: ${newPlayCount}`
          );
          browser.storage.local.set({ playCount: 0 });
        }
      });
    }
  });
};

// Add event listeners to detect video play events
document.addEventListener("yt-navigate-start", incrementVideoPlayCount); // For regular page navigation
window.addEventListener("spfdone", incrementVideoPlayCount); // For AJAX-based page navigation (e.g., when clicking on related videos)

// Check if the current page is a video and increment the play count if it is
if (window.location.pathname === "/watch") {
  incrementVideoPlayCount();
}

// dom content loading / just loading
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
