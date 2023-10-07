export default function useSearch (request, array, setArray) {

  function searchData() {
    setArray(array.filter((e) =>
      String(e.text).toLowerCase().replaceAll(' ','').includes(String(request).toLowerCase().replaceAll(' ',''))
      || String(e.title).toLowerCase().replaceAll(' ','').includes(String(request).toLowerCase().replaceAll(' ',''))))

  }

 const searchProps = {
    array: array,
    onClick: searchData
  };

  return searchProps;
}