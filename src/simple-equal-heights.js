// http://codepen.io/Lewitje/pen/YybQEP original copy from Lewi Hussay updated to work with multiple divs
// Equal height - by Burfield www.burfield.co.uk
// 2016-30-03 - Changed - Refactored from jQuery to vanilla JS (@jacobwarduk http://www.jacobward.co.uk)
// Example usage use data-match-height="groupName" on anything!!!

/**
 * @typedef MatchOptions
 * @property {bool} autoInit Indicates if the matching elements should match heights when document is ready.
 */

/**
 * @param {MatchOptions} options
 */
export default {
  init: function(options = { autoInit: true }) {
    // Initialising on DOM load
    if (options.autoInit) {
      var self = this;
      (document.readyState === 'complete' && this.match()) ||
        document.addEventListener('DOMContentLoaded', function() {
          console.log('DOMContentLoaded');
          self.match();
        });
    }
  },
  /**
   * @param {string} onlyForSelector A selector to match the height only for this given container
   */
  match: function(onlyForSelector = '') {
    var groupName = Array.prototype.slice.call(
        document.querySelectorAll(onlyForSelector + ' [data-match-height]')
      ),
      groupHeights = {};

    for (var item of groupName) {
      var data = item.getAttribute('data-match-height');
      item.style.minHeight = 'auto';

      if (groupHeights.hasOwnProperty(data)) {
        Object.defineProperty(groupHeights, data, {
          value: Math.max(groupHeights[data], item.offsetHeight),
          configurable: true,
          writable: true,
          enumerable: true
        });
      } else {
        groupHeights[data] = item.offsetHeight;
      }
    }

    var groupHeightsMax = groupHeights;

    Object.getOwnPropertyNames(groupHeightsMax).forEach(function(value) {
      var elementsToChange = document.querySelectorAll(
          "[data-match-height='" + value + "']"
        ),
        elementsLength = elementsToChange.length;

      for (var i = 0; i < elementsLength; i++) {
        elementsToChange[i].style.height =
          Object.getOwnPropertyDescriptor(groupHeightsMax, value).value + 'px';
      }
    });
  }
};
