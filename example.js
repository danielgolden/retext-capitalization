import { retext } from "retext";
import retextPos from "retext-pos";
import retextCapitalization from "./index.js";

retext()
  .use(retextPos)
  .use(retextCapitalization)
  .process(`Go to Add More Data`)
  .then((text) => {
    console.error(text.messages);
  });
