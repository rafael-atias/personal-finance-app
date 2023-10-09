/**
 * This file contains polyfills necessary due to
 * the actual node version. That will make the
 * Typescript compiler happy
 *
 */

export function polyfills() {
  // always feature test the environment
  // first to avoid prototype pollution !!!
  // @ts-ignore
  if (Array.prototype.toSorted == undefined) {
    /**
     * An array method that copies an array
     * and then sorts it
     *
     * Optionally, toSorted consumes a comparator function that
     * will be called to sort the elements contained in
     * the array. If undefined, the elements in the array
     * will be sorted in ascending order
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted
     */
    // @ts-ignore
    Array.prototype.toSorted = function (
      comparator: ((a: any, b: any) => number) | undefined
    ) {
      if (comparator == undefined) {
        return this.map((x) => x).sort();
      }

      return this.map((x) => x).sort(comparator);
    };
  }
}
