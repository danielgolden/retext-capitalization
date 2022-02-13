import { retext } from "retext";
import retextCapitalization from "./index.js";

retext()
  .use(retextCapitalization)
  .process("The best NR1 feature is probably Dashboards or instant observability. I really love new relic.")
  .then((text) => {
    console.error(text.messages);
  });
