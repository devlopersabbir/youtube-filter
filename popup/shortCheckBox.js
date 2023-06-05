// dom seletion
const shortCheckBox = document.getElementById("shortCheckBox");

const resetBtn = document.getElementById("btn-reset");

// show recommended video
browser.storage.local.get("isChecked").then((response) => {
  const isChecked = response.isChecked;
  // Update the checkbox state
  recommendedCheckBox.checked = isChecked;
});
recommendedCheckBox.addEventListener("change", (event) => {
  const isChecked = event.target.checked;
  // browser.tabs.reload();
  browser.storage.local.set({ isChecked });
});

// reset button
resetBtn.addEventListener("click", () => {
  // browser.tabs.reload();
  browser.storage.local.clear().then(() => {
    console.log("local storage cleared;");
    recommendedCheckBox.checked = false;
  });
});
