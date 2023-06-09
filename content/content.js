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
  browser.runtime.sendMessage({ type: "videoWatched" });
};

// Listen for message from background script to reset the video count
browser.runtime.onMessage.addListener((message) => {
  if (message.type === "resetVideoCount") {
    browser.storage.local.set({ videoCount: 0 });
  }
});

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
