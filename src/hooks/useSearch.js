import React from "react";

const useSearch = (string, items) =>
  React.useMemo(() => {
    return items.filter(
      (item) =>
        item.text.toLowerCase().includes(string.toLowerCase()) ||
        item.title.toLowerCase().includes(string.toLowerCase())
    );
  }, [string, items]);

export default useSearch;
