# retext-capitalization

A [retext](https://github.com/retextjs/retext) plugin to encourage the use of [sentence case](https://writer.com/blog/sentence-case/).

## Install

```sh
npm install retext-capitalization
```

## Use

```js
import { retext } from "retext";
import retextCapitalization from "./index.js";

retext()
  .use(retextCapitalization)
  .process("i want to watch a movie about Mars.")
  .then((text) => {
    console.error(text.messages);
  });
```

<!--
Yields:

```
  3:14-3:16  warning  Expected `1` space between sentences, not `2`  space  retext-sentence-spacing

⚠ 1 warning
``` -->
