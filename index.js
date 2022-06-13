import { visit } from "unist-util-visit";
import { is, convert } from "unist-util-is";
import { pointStart, pointEnd } from "unist-util-position";

import { matchCasing } from "match-casing";
import { search } from "nlcst-search";
import { toString } from "nlcst-to-string";
import { quotation } from "quotation";
import { schema } from "./schema.js";
import exceptions from "./exceptions.js";

const list = Object.keys(schema);
const source = "retext-capitalization";
const url =
  "https://docs.newrelic.com/docs/style-guide/capitalization/product-capability-feature-usage/#when-to-use-title-case";

export default function retextCapitalization() {
  return (tree, file) => {
    const sourceString = file.value;

    /*!
     * Checks if the provided capitalized word is already a part of a suggestion
     * @param {Object} word - the current word object
     * @return {Boolean} Whether it already exists as a suggestion
     */
    const isAlreadySuggested = (word) => {
      return file.messages.some((message) => {
        const isAfterStartOfExistingSuggestion =
          word.position.start.offset >= message.position.start.offset;
        const isBeforeEndOfExistingSuggestion =
          word.position.end.offset <= message.position.end.offset;

        return (
          isAfterStartOfExistingSuggestion && isBeforeEndOfExistingSuggestion
        );
      });
    };

    /*!
     *  Checks if the provided capitalized word is a proper noun
     *  @param {Object} word - the current word object
     *  @return {Boolean} Whether it a proper noun
     */
    const isProperNoun = (word) => {
      return (
        word.data.partOfSpeech === "NNP" || word.data.partOfSpeech === "NNPS"
      );
    };

    // Check the string against the contents of schema.js
    search(tree, list, (match, index, parent, phrase) => {
      const actual = toString(match);
      let expected = schema[phrase];
      let checkForFalsePositive = "";

      // The search function performs a fuzzy search on the string in question
      // ignoring casing, apostrophes, etc. This is a check too make sure
      // this isn't a false positive due to casing.
      const isFalsePositive = () => {
        let output = false;

        let testSubject = Array.isArray(expected) ? expected : [expected];

        return testSubject.some((expectation) => {
          return expectation === actual;
        });
      };

      // if it's a false positive, stop everything
      if (isFalsePositive()) {
        return;
      }

      // expected always needs to be an array, so ensure that it is
      if (typeof expected === "string") {
        expected = [expected];
      }

      checkForFalsePositive = (
        actualToCheck,
        numberOfWordsBefore,
        matchesToCheck
      ) => {
        const matchesIsString = typeof matchesToCheck === "string";
        const matchesIsArray = Array.isArray(matchesToCheck);

        if (!matchesIsString && !matchesIsArray) {
          console.error(
            `"checkContext" expects the argument "matchesToCheck" to be an array or string'`
          );
          console.log(typeof matchesToCheck);
          return null;
        }

        if (actualToCheck !== actual) {
          return null;
        }

        let actualWithContext = parent.children
          .map((item, index, array) => {
            // if you've found the element
            if (item === match[0]) {
              let contextArray = [];
              let dummyArray = [...Array(numberOfWordsBefore * 2)];

              // return an array of the words before it and it.
              dummyArray.forEach((_, i) => {
                contextArray.unshift(array[index - (i + 1)]);
              });

              contextArray.push(item);

              return contextArray;
            } else {
              return false;
            }
          })
          .filter((item) => item)[0];

        if (matchesIsString) {
          return matchesToCheck === toString(actualWithContext);
        } else if (matchesIsArray) {
          return matchesToCheck.some(
            (match) => match === toString(actualWithContext)
          );
        }
      };

      // check for false positives
      if (
        checkForFalsePositive("Observability", 1, "Instant Observability") ||
        checkForFalsePositive("I/O", 1, "Relic I/O")
      ) {
        return null;
      }

      Object.assign(
        file.message(
          "Replace " +
            quotation(actual, "`") +
            " with " +
            quotation(expected, "`"),
          {
            start: pointStart(match[0]),
            end: pointEnd(match[match.length - 1]),
          },
          [source, phrase.replace(/\s+/g, "-").toLowerCase()].join(":")
        ),
        { actual, expected, url }
      );
    });

    // Create a suggestion if all of the following are true for the word:
    // 1. Is not a proper noun
    // 2. Is not in the included in schema.js,
    // 3. Is not the first word of a sentance
    // 4. Is not in the list of exceptions
    // 5. Is not a number
    visit(tree, "SentenceNode", (sentence) => {
      const wordAsString = (word) => {
        return sourceString.substring(
          word.position.start.offset,
          word.position.end.offset
        );
      };

      const improperlyCapitalizedWords = (() => {
        const words = sentence.children.filter((child) => {
          // Because we also don't want to return a suggestion/report
          // for numbers.
          return child.type === "WordNode" && isNaN(wordAsString(child));
        });

        // Because we don't want to check words that have already been
        // suggested/flagged by the previous search function
        const wordsNotYetSuggested = words.filter(
          (word) => !isAlreadySuggested(word)
        );

        const wordsMinusExceptions = wordsNotYetSuggested.filter((word) => {
          const existsInExceptions = exceptions.some((exception) => {
            return exception.toLowerCase() === wordAsString(word).toLowerCase();
          });

          return !existsInExceptions;
        });

        let capitalizedWords = wordsMinusExceptions.filter((word) => {
          return wordAsString(word)[0] === wordAsString(word)[0].toUpperCase();
        });

        const isFirstWordOfSentence = (word) => {
          const firstWordPosition = words[0].position.start.offset;
          const currentWordPosition = word.position.start.offset;
          return firstWordPosition == currentWordPosition;
        };

        // Because sometimes the retext-pos plugin gets it wrong
        // See all part of speech tags: https://github.com/dariusk/pos-js
        const properNounCorrections = {
          Data: "NN",
        };

        capitalizedWords = capitalizedWords.map((word) => {
          if (properNounCorrections[wordAsString(word)]) {
            word.data.partOfSpeech = properNounCorrections[wordAsString(word)];
          }
          return word;
        });

        return capitalizedWords.filter((word) => {
          console.log(
            `${word.children[0].value} is proper noun ===`,
            isProperNoun(word)
          );
          return !isFirstWordOfSentence(word) && !isProperNoun(word);
        });
      })();

      improperlyCapitalizedWords.forEach((word) => {
        const actual = wordAsString(word);
        const expected = [wordAsString(word).toLowerCase()];

        Object.assign(
          file.message(
            "Replace " +
              quotation(actual, "`") +
              " with " +
              quotation(expected, "`"),
            {
              start: pointStart(word),
              end: pointEnd(word),
            },
            [source, `${actual.toLowerCase()}-${word.data.partOfSpeech}`].join(
              ":"
            )
          ),
          { actual, expected, url }
        );
      });
    });
  };
}
