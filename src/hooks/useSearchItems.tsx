export const useSearchItems = (items, searchParam) =>
  items.filter((item) => {
    const titleLowerCase = item.title.toLowerCase();
    const textLowerCase = item.text.toLowerCase();
    const searchParamLowerCase = searchParam.toLowerCase();
    return (
      titleLowerCase.includes(searchParamLowerCase) ||
      textLowerCase.includes(searchParamLowerCase)
    );
  });
