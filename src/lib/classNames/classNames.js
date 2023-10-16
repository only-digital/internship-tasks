/**
 * @function classNames
 * @param {string} cls  main className
 * @param {object} mods   object in the form{ className: boolean }
 * @param {array} additional  array of additional classes
 */

export function classNames(cls, mods = {}, additional = []) {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([className, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(" ");
}
