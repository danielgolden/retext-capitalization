import { visit } from "unist-util-visit";
import { is, convert } from "unist-util-is";
import { pointStart, pointEnd } from "unist-util-position";
import exceptions from "./exceptions";

export default function retextCapitalization() {
  return (tree, file) => {
    // Recursively walk the syntaxt tree of the text
    visit(tree, "ParagraphNode", (node) => {
      const sentences = node.children;
      const source = "retext-capitalization";
      let ruleId = "";

      // for each sentence
      sentences.forEach((sentence, index) => {
        // for each sentence child
        console.log(sentence);
        if (is(sentence, "SentenceNode")) {
          // store all WordNodes in an array
          const wordNodes = sentence.children.filter((sentenceChild) => {
            return is(sentenceChild, "WordNode");
          });

          // ==============================
          // Expects captialized first word
          // ==============================

          const firstWordNode = wordNodes[0];
          const firstWord = firstWordNode.children[0].value;
          console.log(firstWord);
          const firstWordFirstChar = firstWord.charAt(0);
          const firstWordIsCaptilized =
            firstWordFirstChar === firstWordFirstChar.toUpperCase();
          const firstWordCapitalized =
            firstWord.charAt(0).toUpperCase() + firstWord.slice(1);

          let actual = firstWord;
          let expected = firstWordCapitalized;

          if (!firstWordIsCaptilized) {
            Object.assign(
              file.message(
                `Expected "${firstWordCapitalized}", not "${actual}"`,
                {
                  start: pointStart(firstWordNode),
                  end: pointEnd(firstWordNode),
                },
                [source, firstWord].join(":")
              ),
              {
                actual,
                expected,
                note: "",
                url: "https://one-core.datanerd.us/foundation/design/writing/capitalization/",
              }
            );
          }

          // ===========================================
          // Expects only proper nouns to be capitalized
          // ===========================================

          wordNodes.forEach((wordNode, index) => {
            // Skip the first word
            if (index > 0) {
              const word = wordNode.children[0].value;
              const wordFirstChar = word.charAt(0);
              const wordIsCaptialized =
                wordFirstChar === wordFirstChar.toUpperCase();
              const wordLowerCased =
                word.charAt(0).toLowerCase() + word.slice(1);

              actual = word;
              expected = wordLowerCased;

              if (wordIsCaptialized) {
                // because for some reason the array doesn't have
                // the normal array methods by default 🤔
                const myExceptions = [...exceptions];

                // is the word in the list of exceptions
                const wordIsException = myExceptions.some(
                  (exception) => word === exception
                );

                // if the word isn't included in the exceptions list
                if (!wordIsException) {
                  Object.assign(
                    file.message(
                      `Expected "${wordLowerCased}", not "${actual}"`,
                      {
                        start: pointStart(wordNode),
                        end: pointEnd(wordNode),
                      },
                      [source, actual].join(":")
                    ),
                    {
                      actual,
                      expected,
                      note: "",
                      url: "https://one-core.datanerd.us/foundation/design/writing/capitalization/",
                    }
                  );
                  // return file;
                }
              }
            }
          });
        }
      });
    });
  };
}
