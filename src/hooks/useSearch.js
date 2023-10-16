/** 
 * @function useSearch
 * @param {Array} array array of objects in which the search is performed
 * @param {string} value  what you need to find
 * @return {Array} array with search result
 */

export const useSearch = (array, value) => {
  if (!value) return array;
  return array.filter(item => {
    const toSearchLowerCase = value.toLowerCase();
    return (
      item.title.toLowerCase().includes(toSearchLowerCase) ||
      item.text.toLowerCase().includes(toSearchLowerCase)
    );
  });
};
