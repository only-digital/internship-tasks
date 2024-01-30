const useSearch = (text, items) => {
  const filteredData = items.filter((item) => {
    if (
      (item.title + item.text).toLowerCase().includes(text.toLowerCase().trim())
    )
      return true;
  });
  return filteredData;
};

export default useSearch;
