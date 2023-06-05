// dom selection
const checkBox = document.getElementById("checkBox");
const resetBtn = document.getElementById("btn-reset");

// show recommended video
browser.storage.local.get("isChecked").then((response) => {
  const isChecked = response.isChecked;
  // Update the checkbox state
  checkBox.checked = isChecked;
});
checkBox.addEventListener("change", (event) => {
  const isChecked = event.target.checked;
  browser.storage.local.set({ isChecked });
});

// reset button
resetBtn.addEventListener("click", () => {
  browser.storage.local.clear().then(() => {
    console.log("local storage cleared;");
    checkBox.checked = false;
  });
});
