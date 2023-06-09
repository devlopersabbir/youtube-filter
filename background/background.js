browser.storage.local
  .get("isChecked")
  .then((res) => console.log("res show recommanded vide: ", res))
  .catch((error) => console.log("errro:", error));

browser.storage.local
  .get("isComment")
  .then((res) => console.log("res isCommnet", res))
  .catch((error) => console.log("errro:", error));

browser.storage.local
  .get("isRatingAndViews")
  .then((res) => console.log("res Rating and View", res))
  .catch((error) => console.log("errro:", error));

browser.storage.local
  .get("isShort")
  .then((res) => console.log("res Rating and View", res))
  .catch((error) => console.log("errro:", error));

browser.storage.local
  .get("timerDuration")
  .then((res) => console.log("timeduration: ", res));
