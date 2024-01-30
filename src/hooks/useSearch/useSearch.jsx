const useSearch = (text, items) => {
  return items.filter((item) => {
    return (
      item.title.toLowerCase().includes(text.toLowerCase().trim()) ||
      item.text.toLowerCase().includes(text.toLowerCase().trim())
    );
  });
};

export default useSearch;
