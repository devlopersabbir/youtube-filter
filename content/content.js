console.clear();

/**
 * Remove recommended video pannel
 */
const removeRecommendedVidePannel = () => {
  const recommendedPanel = document.getElementById("secondary");
  if (recommendedPanel) {
    recommendedPanel.remove();
    browser.runtime.sendMessage({
      action: "logMessage",
      message: "Removed the recommended video panel",
    });
  } else {
    browser.runtime.sendMessage({
      action: "logMessage",
      message: "Fail to remove",
    });
  }
};

if (document.readyState !== "loading") {
  console.log("document is already ready, just execute code here");
  removeRecommendedVidePannel();
} else {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("document was not ready, place code here");
    removeRecommendedVidePannel();
  });
}
