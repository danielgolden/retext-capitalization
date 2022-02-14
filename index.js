import { visit } from "unist-util-visit";
import { is, convert } from "unist-util-is";
import { pointStart, pointEnd } from "unist-util-position";
import exceptions from "./exceptions.js";

import {matchCasing} from 'match-casing'
import {search} from 'nlcst-search'
import {toString} from 'nlcst-to-string'
import {quotation} from 'quotation'
import {schema} from './schema.js'

const list = Object.keys(schema)
const source = "retext-capitalization";
const url = 'https://docs.newrelic.com/docs/style-guide/capitalization/product-capability-feature-usage/#when-to-use-title-case'

export default function retextCapitalization() {
  return (tree, file) => {
    const treeValue = (tree) => {
      return tree
    }

    search(tree, list, (match, index, parent, phrase) => {
      const actual = toString(match)
      let expected = schema[phrase]
      let checkForFalsePositive = ''

      // The search function performs a fuzzy search on the string in question
      // ignoring casing, apostrophes, etc. This is a check too make sure
      // this isn't a false positive due to casing.
      const isFalsePositive = () => {
        let output = false

        let testSubject = Array.isArray(expected) ? expected : [expected]

        return testSubject.some((expectation) => {
          return expectation === actual
        })
      }
      
      // if it's a false positive, stop everything
      if (isFalsePositive()) {
        return
      }

      // exected always needs to be an array, so ensure that it is
      if (typeof expected === 'string') {
        expected = [expected]
      }

      checkForFalsePositive = (actualToCheck, numberOfWordsBefore, matchesToCheck) => {
        const matchesIsString = typeof matchesToCheck === 'string'
        const matchesIsArray = Array.isArray(matchesToCheck)

        if (!matchesIsString && !matchesIsArray) {
          console.error(`"checkContext" expects the argument "matchesToCheck" to be an array or string'`)
          console.log(typeof matchesToCheck)
          return null
        }

        if (actualToCheck !== actual) {
          return null
        }

        let actualWithContext = parent.children.map((item, index, array) => {
          // if you've found the element
          if (item === match[0]) {
            let contextArray = []
            let dummyArray = [...Array(numberOfWordsBefore * 2)]

            // return an array of the words before it and it.
            dummyArray.forEach((_, i) => {
              contextArray.unshift(array[index -(i + 1)])
            })

            contextArray.push(item)

            return contextArray
          } else {
              return false
          }
        }).filter(item => item)[0]

        if (matchesIsString) {
          return matchesToCheck === toString(actualWithContext)
        } else if (matchesIsArray) {
          return matchesToCheck.some(match => match === toString(actualWithContext))
        }
      }

      // check for false positives 
      if (
        checkForFalsePositive('Observability', 1, 'Instant Observability') ||
        checkForFalsePositive('I/O', 1, 'Relic I/O')
      ) {
        return null
      }
      

      Object.assign(
        file.message(
          'Replace ' +
            quotation(actual, '`') +
            ' with ' +
            quotation(expected, '`'),
          {start: pointStart(match[0]), end: pointEnd(match[match.length - 1])},
          [source, phrase.replace(/\s+/g, '-').toLowerCase()].join(':')
        ),
        {actual, expected, url}
      )
    })
  };
}
