export const useSearch = (searchValue, data) => {
	if (!searchValue) {
		return data;
	} else {
		return data.filter(({ title, text }) => title.toLowerCase().includes(searchValue.toLowerCase()) || text.toLowerCase().includes(searchValue.toLowerCase()));
	}
};