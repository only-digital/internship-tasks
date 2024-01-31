const useSearch = (searchQuery, data) => {
  const searchResult = data.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      item.text.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
  });

  return searchResult;
};

export default useSearch;
