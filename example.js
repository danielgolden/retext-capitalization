import { retext } from "retext";
import retextPos from "retext-pos";
import retextCapitalization from "./index.js";

retext()
  .use(retextPos)
  .use(retextCapitalization)
  .process(
    `Hi, I’m Daniel Golden. 200,100 A user interface designer & front-end engineer Im currently a Lead UX Engineer at New Relic working on the design system (One Core) team. I help build the experiences my teammates and I have designed. I also design and build tools that help our product designers work more efficiently, and build prototypes which enable testing and research. Check out my resume.`
  )
  .then((text) => {
    console.error(text.messages);
  });
