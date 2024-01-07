
export function useSearch(dataArr, searchValue) {
    let serchEl=[];
    dataArr.forEach(el => {
        let { text, title } = el;
        if (text.indexOf(searchValue.trim()) != -1 || title.indexOf(searchValue.trim()) != -1) {
            serchEl.push(el);
        }
    })
    return serchEl;
}