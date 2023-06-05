browser.storage.local
  .get("isChecked")
  .then((res) => console.log("res", res))
  .catch((error) => console.log("errro:", error));
