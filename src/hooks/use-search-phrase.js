export const useSearchPhrase = (arr, phrase) => {
  const preparedPhrase = phrase.trim().toUpperCase();
 
  if (preparedPhrase === "") {
    return arr;
  }

  const sortArr = [];
  arr.forEach((item) => {    
    const isPhraseInTitle = item.title.toUpperCase().includes(preparedPhrase);
    const isPhraseInText = item.text.toUpperCase().includes(preparedPhrase);

    if (isPhraseInTitle || isPhraseInText) {
      sortArr.push(item);
    }
  }); 

  return sortArr;
};
