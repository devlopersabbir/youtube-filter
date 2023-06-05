console.clear();

/**
 * Remove recommended video pannel
 */
const removeRecommendedVidePannel = async () => {
  const recommendedPanel = document.getElementById("secondary");
  if (recommendedPanel) {
    const { isChecked } = await browser.storage.local.get("isChecked");
    if (isChecked) {
      recommendedPanel.remove();
    }
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
