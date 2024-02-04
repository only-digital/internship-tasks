const useSearch = (searchQuery, data) => {
  let search = searchQuery.toLowerCase().trim();
  const searchResult = data.filter((item) => {
    return (
      item.title.toLowerCase().includes(search) ||
      item.text.toLowerCase().includes(search)
    );
  });

  return searchResult;
};

export default useSearch;
