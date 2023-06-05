// dom selection
const checkBox = document.getElementById("checkBox");
const resetBtn = document.getElementById("btn-reset");

// show recommended video
checkBox.addEventListener("change", (event) => {
  const isChecked = event.target.checked;
  browser.storage.local
    .set({ isChecked })
    .then((res) => console.log("checked value set", isChecked))
    .catch((error) => console.log("fail to store"));
});

resetBtn.addEventListener("click", () => {
  browser.storage.local.clear().then(() => console.log("Reseted!"));
  console.log(checkBox);
});
