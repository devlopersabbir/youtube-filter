// dom selection
const recommendedCheckBox = document.getElementById("recommendedCheckBox");
const hideComments = document.getElementById("hideComments");
const hideShort = document.getElementById("hideShort");
const hideRatingAndView = document.getElementById("hideRatingAndView");
const blurThumb = document.getElementById("blurThumb");
const resetBtn = document.getElementById("btn-reset");
const saveButton = document.getElementById("saveButton");

/**
 *  show recommended video
 * Start from here
 */
browser.storage.local.get("isChecked").then((response) => {
  const isChecked = response.isChecked;
  // Update the checkbox state
  recommendedCheckBox.checked = isChecked;
});
recommendedCheckBox.addEventListener("change", (event) => {
  const isChecked = event.target.checked;
  browser.tabs.reload();
  browser.storage.local.set({ isChecked });
});
/**
 *  show recommended video
 * End
 */

/**
 * hide Comments section
 * Start from here
 */
browser.storage.local.get("isComment").then((response) => {
  const isComment = response.isComment;
  // Update the checkbox state
  hideComments.checked = isComment;
});
hideComments.addEventListener("change", (event) => {
  const isComment = event.target.checked;
  browser.tabs.reload();
  browser.storage.local.set({ isComment });
});
/**
 * hide Comments section
 * End
 */

/**
 * Hide short video pannel
 * Start from here
 */
browser.storage.local.get("isShort").then((response) => {
  const isShort = response.isShort;
  // update the checkbox state
  hideShort.checked = isShort;
});
hideShort.addEventListener("change", (event) => {
  const isShort = event.target.checked;
  browser.tabs.reload();
  browser.storage.local.set({ isShort });
});
/**
 * Hide short video pannel
 * End
 */

/**
 * hide video rating and views
 * Start from here
 */
browser.storage.local.get("isRatingAndViews").then((response) => {
  const isRatingAndViews = response.isRatingAndViews;

  // update the checkbox state
  hideRatingAndView.checked = isRatingAndViews;
});
hideRatingAndView.addEventListener("change", (event) => {
  const isRatingAndViews = event.target.checked;
  browser.tabs.reload();
  browser.storage.local.set({ isRatingAndViews });
});

/**
 * blur youtube video Thumb
 * Start from here
 */
browser.storage.local.get("isBlur").then((res) => {
  const isBlur = res.isBlur;
  // update the checkbox state
  blurThumb.checked = isBlur;
});
blurThumb.addEventListener("change", (e) => {
  const isBlur = e.target.checked;
  browser.tabs.reload();
  browser.storage.local.set({ isBlur });
});
/**
 * Blur youtube video Thumb
 * End
 */


// Add this code at the top of popup.js
const hourLimitInput = document.getElementById("hourLimit");

// Event listener for the "Save" button click
saveButton.addEventListener("click", () => {
  const hourLimit = parseInt(hourLimitInput.value);
  if (isNaN(hourLimit) || hourLimit <= 0) {
    // Invalid input, display an error message or handle accordingly
    return;
  }

  // Save the hour limit to the storage
  browser.storage.local.set({ hourLimit });

  // Clear the input field
  hourLimitInput.value = "";

  // Schedule an alarm to reset the video count after the specified time
  const alarmDelayInMinutes = hourLimit * 60; // Convert to minutes
  browser.alarms.create("resetVideoCount", { delayInMinutes: alarmDelayInMinutes });
});



// reset button
resetBtn.addEventListener("click", () => {
  browser.tabs.reload();
  browser.storage.local.clear().then(() => {
    recommendedCheckBox.checked = false;
    hideComments.checked = false;
    hideShort.checked = false;
    hideRatingAndView.checked = false;
    blurThumb.checked = false;
  });
});
