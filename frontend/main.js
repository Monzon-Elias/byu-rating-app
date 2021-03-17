import { getItem } from "../backend/backend.js";

addEventListener("keyup",  (e) => {
  getItem();
});

addEventListener("touchend", (e) => {
  getItem();
});
